const router = require("express").Router();
const {
  createPost,
  updatePost,
  getAllPosts,
  getUserPosts,
  getPost,
  getFollowedPosts,
  deletePost,
} = require("../controllers/postController");

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
  limits: {
    fileSize: 10 * 1024 * 1024, // Set a 10MB file size limit
  },
});

router.get("/", getAllPosts);
router.patch("/update", updatePost);
router.get("/getfollwedposts", getFollowedPosts);

router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.get("/user/:id", getUserPosts);

router.post("/create", upload.single("image"), createPost);

module.exports = router;
