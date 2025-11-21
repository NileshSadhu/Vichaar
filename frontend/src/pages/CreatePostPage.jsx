import { useState } from "react";
import { createPost } from "../features/blog/blogServices";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
        coverImage,
      };
      await createPost(payload);
      // navigate to homepage
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
