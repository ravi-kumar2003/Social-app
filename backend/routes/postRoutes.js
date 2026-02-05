import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPost,
  getPosts,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/", getPosts);
router.put("/like/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, commentPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
