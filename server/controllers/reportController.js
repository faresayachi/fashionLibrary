const Report = require("../models/Report");
const User = require("../models/User");

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const getAllReports = async (req, res) => {
  try {
    const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.search) {
      const safe = escapeRegex(req.query.search);
      query.$or = [
        { title: { $regex: safe, $options: "i" } },
        { author: { $regex: safe, $options: "i" } }
      ];
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    const [reports, total] = await Promise.all([
      Report.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Report.countDocuments(query)
    ]);

    return res.status(200).json({
      success: true,
      data: {
        reports,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      },
      message: "Reports fetched successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching reports"
    });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
      message: "Report fetched successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid report id"
    });
  }
};

const createReport = async (req, res) => {
  try {
    const { title, author, description, category, season, fileUrl, price, pages, publishedAt } = req.body;

    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title, author and price are required"
      });
    }

    const coverImage = req.file ? `/uploads/${req.file.filename}` : "";

    const report = await Report.create({
      title,
      author,
      description,
      category,
      season,
      coverImage,
      fileUrl,
      price: Number(price),
      pages: pages !== undefined ? Number(pages) : 0,
      publishedAt: publishedAt || null
    });

    return res.status(201).json({
      success: true,
      data: report,
      message: "Report created successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating report"
    });
  }
};

const updateReport = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.coverImage = `/uploads/${req.file.filename}`;
    }

    if (updates.price !== undefined) {
      updates.price = Number(updates.price);
    }

    if (updates.pages !== undefined) {
      updates.pages = Number(updates.pages);
    }

    const report = await Report.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
      message: "Report updated successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid data or report id"
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: null,
      message: "Report deleted successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid report id"
    });
  }
};

const myLibrary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("purchasedReports");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: user.purchasedReports || [],
      message: "Library fetched successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching library"
    });
  }
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  myLibrary
};
