import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";

const PostList = () => {
  const { postList } = useContext(PostListData);

  return (
    <div>
      {postList.map((post) => (
        <Post key={post._id || post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
