import { useEffect, useState } from "react";
import {
  createComment,
  getComments,
  deleteComment,
} from "../../features/comments/Comments";
import { Trash2 } from "lucide-react";

const CommentSection = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(postId);
      setComments(data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment({ postId, content });
      setContent("");
      fetchComments();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Post Comment
        </button>
      </form>

      {/* Comment List */}
      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="p-4 border border-gray-200 rounded-2xl bg-white shadow-sm relative"
            >
              {(currentUser?.id === c.userId?._id ||
                currentUser?.role === "admin") && (
                <button
                  onClick={() => handleDelete(c._id)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                  title="Delete comment"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <div className="flex items-center gap-3 mb-2">
                <img
                  src={c.userId?.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {c.userId?.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-700">{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
