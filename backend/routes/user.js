const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  addFollowed,
  verifyFriend,
  removeFollowed,
  getUserFollowed,
  getUserFollowers,
  getFollowersFollowEachOther,
  newNof,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/update", updateUser);

router.get("/followed/:id", getUserFollowed);
router.get("/followers/:id", getUserFollowers);
router.get("/cross/:id", getFollowersFollowEachOther);
router.post("/addfriend", addFollowed);
router.post("/verifyfriend", verifyFriend);
router.patch("/removefriend", removeFollowed);
router.post("/newnof", newNof);

module.exports = router;
