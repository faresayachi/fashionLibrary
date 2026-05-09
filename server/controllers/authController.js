const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateAccessToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
  );

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
  });

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  purchasedReports: user.purchasedReports,
  createdAt: user.createdAt
});

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(201).json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: sanitizeUser(user)
      },
      message: "User registered successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during registration"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).populate("purchasedReports");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: sanitizeUser(user)
      },
      message: "Login successful"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required"
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token"
      });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not recognized"
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      success: true,
      data: { accessToken },
      message: "Access token refreshed"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during token refresh"
    });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.refreshToken = null;
    await user.save();

    return res.status(200).json({
      success: true,
      data: null,
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during logout"
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -refreshToken")
      .populate("purchasedReports");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "Current user fetched"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching current user"
    });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  getMe
};
