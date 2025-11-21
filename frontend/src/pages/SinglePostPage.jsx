import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../features/blog/blogServices";

export default function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { slug } = useParams();

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
      <p className="text-center text-zinc-400 p-10 text-lg">Loading post...</p>
    );

  if (error)
    return <p className="text-center text-red-400 p-10 text-lg">{error}</p>;

  if (!post)
    return (
      <p className="text-center text-zinc-400 p-10 text-lg">Post not found.</p>
    );

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>

        {/* COVER IMAGE */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-xl border border-zinc-700 mb-6"
          />
        )}

        {/* META INFO */}
        <div className="flex items-center justify-between text-zinc-400 text-sm mb-8">
          <p>By {post.author?.username || "Unknown"}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>

        {/* CONTENT */}
        <div className="prose prose-invert prose-zinc max-w-none mb-8">
          <p className="leading-7 whitespace-pre-line">{post.content}</p>
        </div>

        {/* TAGS */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-zinc-800 border border-zinc-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
