const router = require("express").Router();
const verifyRegister = require("../middleware/verifyResister");
const User = require("../model/User");
const rateLimiter = require("../middleware/rateLimiter");
const fileExtLimiter = require("../middleware/fileExtLimiter");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post(
  "/profile",
  rateLimiter,
  verifyRegister,
  upload.single("image"),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File is too large. Maximum allowed size is 10MB.",
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  },
  async (req, res) => {
    if (!req.file)
      return res.status(400).json({ message: "No file to upload" });

    try {
      const user = await User.findById(req.id);
      user.profileImage.url = `http://localhost:7000/images/${req.file.originalname}`;
      await user.save();
      return res
        .status(200)
        .json({ message: "uploaded", img: user.profileImage.url });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
