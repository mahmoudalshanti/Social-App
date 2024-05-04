const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,23}$/gm;
const USER_REGEX = /^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const NAME_REGEX = /^[A-Za-z]+$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const registerController = async (req, res) => {
  const { email, username, password, fName, lName, address, profileImage } =
    req.body;

  if (!email || !username || !password || !fName || !lName)
    return res
      .status(400)
      .json({ message: "Must fill All the required inputs" });

  // TEST BY REGEX
  const testEmail = EMAIL_REGEX.test(email);
  EMAIL_REGEX.lastIndex = 0;
  if (!testEmail)
    return res.status(406).json({ message: "email not followed the roles" });

  const testUsername = USER_REGEX.test(username);
  USER_REGEX.lastIndex = 0;
  if (!testUsername)
    return res.status(406).json({ message: "Username not followed the roles" });

  console.log(testUsername);

  const testPwd = PWD_REGEX.test(password);
  PWD_REGEX.lastIndex = 0;
  if (!testPwd)
    return res.status(406).json({ message: "Password not followed the roles" });

  const testFName = NAME_REGEX.test(fName);
  const testLName = NAME_REGEX.test(lName);
  NAME_REGEX.lastIndex = 0;
  if (!testFName)
    return res
      .status(406)
      .json({ message: "First Name not followed the roles" });

  if (!testLName)
    return res
      .status(406)
      .json({ message: "Last Name not followed the roles" });

  ///

  const conflict = await User.findOne({ username }).lean().exec();

  if (conflict) return res.status(409).json({ message: "Username is taken" });

  try {
    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      username,
      password: hashPwd,
      fName,
      lName,
      profileImage: { url: "" },
    };

    if (address) newUser.address = address;
    if (profileImage?.url) newUser.profileImage.url = profileImage.url;

    const user = await User.create(newUser);
    // if roles.Admin ...

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,

      { expiresIn: "30m" }
    );

    return res
      .status(201)
      .json({ message: `New user created`, accessToken: accessToken });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Fields are required" });

  const userFound = await User.findOne({ username }).exec();
  if (!userFound)
    return res.status(401).json({ message: `Not found username  ${username}` });

  const passwordCorrect = await bcrypt.compare(password, userFound.password);

  if (!passwordCorrect)
    return res.status(401).json({ message: `Password not correct` });

  try {
    const roles = Object.values(userFound.roles).filter(Boolean);

    const accessToken = access_Token({
      UserInfo: {
        id: userFound.id,
        email: userFound.email,
        username: userFound.username,
        profileImage: userFound.profileImage,
        friends: userFound.friends,
        nof: userFound.Nof,
        fName: userFound.fName,
        lName: userFound.lName,
        roles: roles,
      },
    });

    const refreshToken = jwt.sign(
      {
        id: userFound.id,
      },

      process.env.REFRESH_TOKEN_SECRET,

      { expiresIn: "1d" }
    );

    userFound.refreshToken = refreshToken;
    await userFound.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

const refreshTokenController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);

  const refreshToken = cookie.jwt;

  const userFound = await User.findOne({ refreshToken }).exec();
  if (!userFound) return res.sendStatus(403);
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || userFound.id !== decoded.id) return res.sendStatus(403);
        const roles = Object.values(userFound.roles).filter(Boolean);

        const accessToken = access_Token({
          UserInfo: {
            id: userFound.id,
            email: userFound.email,
            username: userFound.username,
            profileImage: userFound.profileImage,
            friends: userFound.friends,
            nof: userFound.Nof,
            fName: userFound.fName,
            lName: userFound.lName,
            roles: roles,
          },
        });
        return res.json({ accessToken });
      }
    );
  } catch (err) {
    return res.status(403).json({ message: err });
  }
};

const logoutController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);

  const refreshToken = cookie.jwt;

  const userFound = await User.findOne({ refreshToken }).exec();

  if (!userFound) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(403);
  }

  userFound.refreshToken = "";
  await userFound.save();
  res.clearCookie("jwt", { httpOnly: true });
  return res.sendStatus(204);
};

module.exports = {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
};

function access_Token(user) {
  return jwt.sign(
    user,

    process.env.ACCESS_TOKEN_SECRET,

    { expiresIn: "30m" }
  );
}
