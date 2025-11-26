import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { getAllPost } from "../features/blog/blogServices";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 5;

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await getAllPost({ page, limit, search, tag });
      const fetchedPosts = res?.data?.posts || [];

      setPosts(fetchedPosts);

      setHasMore(fetchedPosts.length === limit);
    } catch (err) {
      console.log("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, search, tag]);

  return (
    <div className="bg-white min-h-screen">
      <NavBar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {loading && (
          <p className="text-center text-gray-500 py-20 text-lg">
            Loading posts...
          </p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-500 py-20 text-lg">
            No posts found.
          </p>
        )}

        <div className="flex flex-col items-center gap-10">
          {!loading &&
            posts.length > 0 &&
            posts.map((post) => (
              <BlogCard
                key={post._id}
                title={post.title}
                content={post.content}
                coverImage={post.coverImage}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
        </div>

        <div className="flex justify-center items-center gap-6 mt-16">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="
              px-5 py-2.5 rounded-xl border border-zinc-300 bg-white
              text-gray-800 shadow-sm hover:shadow-md hover:bg-zinc-50 transition disabled:opacity-40 disabled:cursor-not-allowed "
          >
            Prev
          </button>

          <span className="text-gray-700 font-medium text-sm tracking-wide">
            Page {page}
          </span>

          <button
            disabled={!hasMore}
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2.5 rounded-xl border border-zinc-300 bg-white text-gray-800 shadow-sm hover:shadow-mdhover:bg-zinc-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
