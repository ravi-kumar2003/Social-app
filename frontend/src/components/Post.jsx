import { TiDelete } from "react-icons/ti";
import { PostList } from "../store/post-list-store";
import { useContext, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  const [likes, setLikes] = useState(post.reactions);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = async () => {
    const res = await API.put(`/posts/like/${post._id}`);
    setLikes(res.data.likes.length);
  };

  const handleComment = async () => {
    if (!comment) return;

    const res = await API.post(`/posts/comment/${post._id}`, {
      text: comment,
    });

    setComments(res.data.comments);
    setComment("");
    toast.success("Comment added");
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body position-relative">
        <div className="d-flex align-items-center mb-2">
          <FaUser size={18} className="text-primary" />

          <span
            className="fw-semibold text-muted ms-2"
            style={{ lineHeight: "1" }}
          >
            {post.username || "Unknown user"}
          </span>
        </div>

        <h5>{post.title}</h5>

        <p>{post.body}</p>

        {post.tags
          ?.flatMap((tag) => tag.split(","))
          .map((tag) => (
            <span key={tag} className="badge bg-info me-1">
              {tag.trim()}
            </span>
          ))}

        {post.image && (
          <img src={post.image} alt="post" className="img-fluid mt-2 rounded" />
        )}

        <div className="mt-3">
          <button
            className="btn btn-outline-primary btn-sm cursor-pointer"
            onClick={handleLike}
          >
            <AiTwotoneLike />
          </button>
        </div>

        <div className="alert alert-warning mt-2">
          This post is reacted by {likes} people.
        </div>

        <div className="mt-2">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button className="btn btn-success btn-sm" onClick={handleComment}>
            Comment
          </button>

          <p className="mt-2">
            <FaRegComment /> {comments.length} Comments
          </p>

          {comments.map((c) => (
            <div key={c._id} className="border rounded p-2 mb-1">
              <strong>{c.username}</strong>: {c.text}
            </div>
          ))}
        </div>

        <button
          className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
          onClick={() => deletePost(post._id)}
        >
          <RiDeleteBin2Fill />
        </button>
      </div>
    </div>
  );
};

export default Post;
