const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
  myLibrary
} = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  }
});

router.get("/", getAllReports);
router.get("/my-library", protect, myLibrary);
router.get("/:id", getReportById);

router.post("/", protect, adminOnly, upload.single("coverImage"), createReport);
router.put("/:id", protect, adminOnly, upload.single("coverImage"), updateReport);
router.delete("/:id", protect, adminOnly, deleteReport);

module.exports = router;
