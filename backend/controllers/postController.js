const Post = require("../model/Post");
const User = require("../model/User");
const path = require("path");

const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).lean();
  if (!posts?.length)
    return res.status(404).json({ message: "No posts found" });

  return res.status(200).json({ posts });
};

const createPost = async (req, res) => {
  const { text } = req.body;
  if (!req.id) return res.status(403).json({ message: "forbidden" });

  if (!text && !req.file)
    return res.status(400).json({ message: "No text or image to set post" });

  const findUser = await User.findById(req.id).exec();

  try {
    const newPost = {
      user: req.id,
      text,
      author: {
        image: findUser.profileImage.url,
        username: findUser.username,
      },
    };
    const post = await Post.create(newPost);
    if (req?.file)
      post.media = `http://localhost:7000/images/${req.file.originalname}`;
    await post.save();

    return res.status(201).json({ message: "Create new Post", post });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  const { id, user, text, media } = req.body;

  if (!id) return res.status(400).json({ message: "No id for post" });

  if (!user) return res.status(400).json({ message: "No user id" });

  if (!text) return res.status(400).json({ message: "text are Required" });

  try {
    const getUser = await User.findById(user).exec();
    if (!getUser) return res.status(401).json({ message: "Unauthorized" });

    const getPost = await Post.findById(id).exec();
    if (!getPost) return res.status(404).json({ message: "No post found" });

    const match = getPost.user.toString() === getUser.id;
    if (!match)
      return res.status(403).json({ message: "No Match by user and post" });

    getPost.text = text;
    if (media) getPost.media = media;

    await getPost.save();

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  const id = req.params.id;
  try {
    const getAllUserPosts = await Post.find({ user: id }).lean();
    if (!getAllUserPosts)
      return res.status(404).json({ message: "No posts yet" });

    return res.json(getAllUserPosts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getFollowedPosts = async (req, res) => {
  const id = req.id;
  if (!id) return res.status(403).json({ message: "Forbidden" });
  try {
    const userFound = await User.findById(id).exec();
    const getFriendsId = userFound.friends;
    const getPosts = await Post.find({ user: { $in: getFriendsId } });
    const getUserPosts = await Post.find({ user: req.id });

    const reUserPost = getUserPosts.map((post) => {
      post.author.username = "You";
      return post;
    });

    const getFullPosts = [].concat([...reUserPost, ...getPosts]);

    return res.status(200).json({ getPosts: getFullPosts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  const id = req.params?.id;

  try {
    const getPostFound = await Post.findById(id).lean();
    if (!getPostFound)
      return res.status(404).json({ message: "No posts found" });

    return res.json(getPostFound);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const id = req.params?.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  getAllPosts,
  getUserPosts,
  getPost,
  getFollowedPosts,
  deletePost,
};
