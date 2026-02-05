import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import toast from "react-hot-toast";
import { SiStarship } from "react-icons/si";

const CreatePost = () => {
  const { addPost } = useContext(PostList);

  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const tagsElement = useRef();
  const imageElement = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const tags = tagsElement.current.value.split(" ");
    const imageFile = imageElement.current.files[0];

    if (!postBody && !imageFile) {
      toast.error("Post needs text or image");
      return;
    }

    await addPost(postTitle, postBody, tags, imageFile);

    toast.success("Post created successfully!");

    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    tagsElement.current.value = "";
    imageElement.current.value = "";
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "100vh",
        width: "100%",
        height:"100%",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="col-md-10 col-lg-7">
        <form
          className="card border-0 shadow-lg p-4"
          style={{
            borderRadius: "18px",
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.95)",
          }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-center mb-4 fw-bold text-primary">
            Share Something Amazing
          </h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">Post Title</label>
            <input
              type="text"
              className="form-control"
              ref={postTitleElement}
              placeholder="Give your post a catchy title..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              What's on your mind?
            </label>
            <textarea
              rows="4"
              className="form-control"
              ref={postBodyElement}
              placeholder="Share your thoughts..."
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Add an Image</label>
            <input type="file" className="form-control" ref={imageElement} />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Hashtags</label>
            <input
              type="text"
              className="form-control"
              ref={tagsElement}
              placeholder="#coding #life #fun"
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          >
            <SiStarship size={24} /> Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
