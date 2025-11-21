import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost, updatePost } from "../features/blog/blogServices";

const EditPostPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getSinglePost(id);
        setTitle(data.title || "");
        setContent(data.content || "");
        setTags((data.tags || []).join(", "));
      } catch (err) {
        // handle err
      }
    };
    fetchPost();
  }, [id]);

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
      await updatePost(payload, id);
      // navigate back to single post
    } catch (err) {
      // error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
