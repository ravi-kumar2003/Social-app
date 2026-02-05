import { createContext, useReducer, useEffect } from "react";
import API from "../api/axios";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const PostListReducer = (currPostList, action) => {
  if (action.type === "SET_POSTS") {
    return action.payload;
  }

  if (action.type === "DELETE_POST") {
    return currPostList.filter(
      (post) => post._id !== action.payload.postId
    );
  }

  if (action.type === "ADD_POST") {
    return [action.payload, ...currPostList];
  }

  return currPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    PostListReducer,
    []
  );

  const loadPosts = async () => {
    const res = await API.get("/posts");

    const formattedPosts = res.data.map((p) => ({
      _id: p._id,
      title: p.title,
      body: p.text,
      image: p.image,
      tags: p.tags || [],
      reactions: p.likes?.length || 0,
      comments: p.comments || [],
      username: p.username,
    }));

    dispatchPostList({
      type: "SET_POSTS",
      payload: formattedPosts,
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const addPost = async (title, body, tags, imageFile) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("text", body);
    formData.append("tags", tags);

    if (imageFile) formData.append("image", imageFile);

    const res = await API.post("/posts", formData);

    dispatchPostList({
      type: "ADD_POST",
      payload: {
        _id: res.data._id,
        title: res.data.title,
        body: res.data.text,
        image: res.data.image,
        tags: res.data.tags || [],
        reactions: res.data.likes.length,
        comments: res.data.comments || [],
        username: res.data.username,
      },
    });
  };

  const deletePost = async (postId) => {
    await API.delete(`/posts/${postId}`);

    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
