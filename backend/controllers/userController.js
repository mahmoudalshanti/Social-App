const User = require("../model/User");

const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,23}$/gm;
const USER_REGEX = /^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const NAME_REGEX = /^[A-Za-z]+$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .select("-password -refreshToken -friends -Nof -email")
    .lean();
  try {
    if (!users?.length)
      return res.status(404).json({ message: "No users found" });

    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
      .select("-password -refreshToken -friends  -email ")
      .lean();
    if (!user) return res.status(404).json({ message: "No user found" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const {
    id,
    email,
    username,
    password,
    fName,
    lName,
    profileImage,
    city,
    state,
  } = req.body;
  try {
    if (!id) return res.status(400).json({ message: "No id for user" });

    const getUser = await User.findById(id).exec();

    if (username) {
      if (getUser.username === username) return res.sendStatus(304);

      const testUsername = USER_REGEX.test(username);
      USER_REGEX.lastIndex = 0;
      if (!testUsername)
        return res
          .status(406)
          .json({ message: "Username not followed the roles" });

      const findConflict = await User.findOne({ username }).lean();
      if (findConflict)
        return res.status(409).json({ message: "Username has taken" });

      getUser.username = username;
      await getUser.save();
      return res.sendStatus(200);
      //
    }

    if (email) {
      if (getUser.email === email) return res.sendStatus(304);
      const testEmail = EMAIL_REGEX.test(email);

      EMAIL_REGEX.lastIndex = 0;
      if (!testEmail)
        return res
          .status(406)
          .json({ message: "email not followed the roles" });

      getUser.email = email;
      await getUser.save();
      return res.sendStatus(200);
    }
    if (password) {
      const pwdCompare = await bcrypt.compare(password, getUser.password);
      if (pwdCompare) return res.sendStatus(304);

      const testPwd = PWD_REGEX.test(password);
      PWD_REGEX.lastIndex = 0;
      if (!testPwd)
        return res
          .status(406)
          .json({ message: "Password not followed the roles" });

      const hashPwd = await bcrypt.hash(password, 10);
      getUser.password = hashPwd;
      await getUser.save();

      return res.sendStatus(200);
      //
    }

    if (fName || lName) {
      if (fName) {
        if (getUser.fName === fName) return res.sendStatus(304);
        const testFName = NAME_REGEX.test(fName);
        NAME_REGEX.lastIndex = 0;
        if (!testFName)
          return res
            .status(406)
            .json({ message: "First name not followed the roles" });
        getUser.fName = fName;
        await getUser.save();
      }
      if (lName) {
        if (getUser.lName === lName) return res.sendStatus(304);
        const testLName = NAME_REGEX.test(lName);
        NAME_REGEX.lastIndex = 0;
        if (!testLName)
          return res
            .status(406)
            .json({ message: "Last name not followed the roles" });

        getUser.lName = lName;
        await getUser.save();
      }
      return res.sendStatus(200);
      //
    }

    if (city || state) {
      if (city) {
        if (getUser.address.city === city) return res.sendStatus(304);
        getUser.city = city;
        await getUser.save();
      }
      if (state) {
        if (getUser.address.state === state) return res.sendStatus(304);
        getUser.state = state;
        await getUser.save();
      }
      return res.sendStatus(200);
      //
    }

    return res.sendStatus(400);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addFollowed = async (req, res) => {
  const { idUser, idFriend } = req.body;

  if (!idUser || !idFriend)
    return res.status(400).json({ message: "please make sure of added" });

  try {
    const foundUser = await User.findById(idUser).exec();
    if (!foundUser) return res.status(404).json({ message: "No User Found" });

    const foundFriend = await User.findById(idFriend).exec();
    if (!foundFriend)
      return res.status(404).json({ message: "No Friend Found" });

    const idExist = foundUser.friends.find((id) => id.toString() === idFriend);
    if (idExist) return res.status(304).json({ message: "Already Follow it" });

    foundUser.friends.push(idFriend);
    await foundUser.save();

    return res.status(200).json({
      message: "User add successfully",
      usersFriends: foundUser.friends,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const verifyFriend = async (req, res) => {
  const { idUser, idFriend } = req.body;

  if (!idUser || !idFriend)
    return res.status(400).json({ message: "please make sure of added" });

  try {
    const foundUser = await User.findById(idUser).exec();
    if (!foundUser) return res.status(404).json({ message: "No User Found" });

    const foundFriend = await User.findById(idFriend).exec();
    if (!foundFriend)
      return res.status(404).json({ message: "No Friend Found" });

    const idExist = foundUser.friends.find((id) => id.toString() === idFriend);
    if (idExist) return res.status(200).json({ message: "Exist" });

    return res.status(404).json({ message: "No Exist" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const removeFollowed = async (req, res) => {
  const { idUser, idFriend } = req.body;

  if (!idUser || !idFriend)
    return res.status(400).json({ message: "please make sure of added" });

  try {
    const foundUser = await User.findById(idUser).exec();
    if (!foundUser) return res.status(404).json({ message: "No User Found" });

    const foundFriend = await User.findById(idFriend).exec();
    if (!foundFriend)
      return res.status(404).json({ message: "No Friend Found" });

    const idExist = foundUser.friends.find((id) => id.toString() === idFriend);

    if (idExist) {
      const reFriends = foundUser.friends.filter(
        (id) => id.toString() !== idFriend
      );
      foundUser.friends = reFriends;
      await foundUser.save();

      return res.status(200).json({
        message: "User remove successfully",
        usersFriends: foundUser.friends,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserFollowed = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "id user required" });

  try {
    const findUser = await User.findById(id).exec();

    if (!findUser) return res.status(404), json("No User Found");

    const getFriendsId = findUser.friends;

    const friends = await User.find({ _id: { $in: getFriendsId } }).select(
      "-password -refreshToken -friends -Nof -email"
    );

    return res.status(200).json({ friends });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserFollowers = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "id user required" });

  try {
    const findUser = await User.findById(id).exec();

    if (!findUser) return res.status(404), json("No User Found");

    const followers = await User.find({ friends: { $in: id } }).select(
      "-password -refreshToken -friends -Nof -email"
    );

    return res.status(200).json({ followers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const newNof = async (req, res) => {
  const { idFriend, nof } = req.body;
  if (!idFriend) return res.status(400).json({ message: "No id set" });
  if (!nof) return res.status(400).json({ message: "No Nof set" });

  try {
    const userFound = await User.findById(idFriend).exec();
    userFound.Nof.push(nof);
    await userFound.save();
    return res.status(200).json({ message: "new nof", nof: userFound.Nof });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getFollowersFollowEachOther = async (req, res) => {
  const id = req.id;
  if (!id) return res.status(401).send();

  const foundUser = await User.findById(id).exec();

  if (!foundUser) return res.status(403).send();

  try {
    const followed = foundUser.friends;
    const getWhoFollowUser = (await User.find({ friends: { $in: id } })).map(
      (user) => user.id
    );

    const getCross = followed.filter((id) =>
      getWhoFollowUser.includes(id.toString())
    );

    const getUsers = await User.find({ _id: { $in: getCross } }).select(
      "-refreshToken -friends -Nof -roles -email"
    );

    return res.status(200).json({ users: getUsers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
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
};
