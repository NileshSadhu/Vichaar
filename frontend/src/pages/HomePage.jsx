import { useEffect, useState } from "react";
import { getAllPost } from "../features/blog/blogServices.js";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getAllPost({ page, limit, search, tag });
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search, tag]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6">
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full p-3 rounded border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:border-white"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      {loading && <p className="text-center text-zinc-400">Loading posts...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-center text-zinc-500">No posts found.</p>
      )}

      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-5 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-white transition"
            >
              <h2 className="text-xl font-bold mb-2 text-white">
                {post.title}
              </h2>
              <p className="text-zinc-400 mb-4">
                {post.content.slice(0, 150)}...
              </p>
              <a
                href={`/post/${post.slug}`}
                className="underline text-white hover:text-zinc-300"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded bg-white text-black disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <span className="text-zinc-300">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded bg-white text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
}
