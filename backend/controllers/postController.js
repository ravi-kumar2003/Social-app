import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, text, tags } = req.body;

  const imageUrl = req.file ? req.file.path : null;

  if (!text && !imageUrl)
    return res.status(400).json({ message: "Post cannot be empty" });

  const post = await Post.create({
    user: req.user.id,
    username: req.user.username,
    title,
    text,
    image: imageUrl,
    tags,
    likes: [],
  });

  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.user.id))
    post.likes.push(req.user.id);
  else
    post.likes = post.likes.filter(
      id => id.toString() !== req.user.id
    );

  await post.save();
  res.json(post);
};

export const commentPost = async (req, res) => {
  const { text } = req.body;

  const post = await Post.findById(req.params.id);

  post.comments.push({
    user: req.user.id,
    username: req.user.username,
    text,
  });

  await post.save();
  res.json(post);
};

export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};
