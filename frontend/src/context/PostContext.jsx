import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = async (data) => {
    await API.post("/posts", data);
    loadPosts();
  };

  const likePost = async (id) => {
    await API.put(`/posts/like/${id}`);
    loadPosts();
  };

  const commentPost = async (id, text) => {
    await API.post(`/posts/comment/${id}`, { text });
    loadPosts();
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loadPosts,
        createPost,
        likePost,
        commentPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
