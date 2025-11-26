import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../features/blog/blogServices.js";
import CommentSection from "../../components/Comments/CommentSection.jsx";
import { useAuth } from "../../features/auth/useAuth.js";

export default function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { slug } = useParams();
  const { user } = useAuth();

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await getSinglePost(slug);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching single post:", err);
      setError(err.response?.data?.message || "Failed to load post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center text-gray-400 p-10 text-lg">Loading post...</p>
    );

  if (error)
    return <p className="text-center text-red-500 p-10 text-lg">{error}</p>;

  if (!post)
    return (
      <p className="text-center text-gray-400 p-10 text-lg">Post not found.</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 border border-gray-200">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* COVER IMAGE */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-xl border border-gray-200 mb-6 shadow-sm"
          />
        )}

        {/* META */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-8">
          <p>By {post.author?.username || "Unknown"}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>

        {/* CONTENT */}
        <div className="prose max-w-none text-gray-800 leading-7 mb-8">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>

        {/* TAGS */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 border border-gray-300 text-gray-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* {post && post._id && <CommentSection postId={post._id} />} */}
      <CommentSection postId={post._id} currentUser={user} />
    </div>
  );
}
