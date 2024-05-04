const router = require("express").Router();
const {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
} = require("../controllers/authController");

const rateLimiter = require("../middleware/rateLimiter");

router.post("/register", rateLimiter, registerController);
router.post("/login", rateLimiter, loginController);
router.get("/refresh", refreshTokenController);
router.get("/logout", logoutController);

module.exports = router;
