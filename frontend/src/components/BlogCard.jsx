import { Bookmark, MessageCircle, ThumbsUp } from "lucide-react";

export default function BlogCard({
  title,
  description,
  date,
  readTime,
  author,
  image,
}) {
  return (
    <div className="w-full max-w-3xl flex items-start justify-between p-6 bg-white shadow-lg rounded-2xl border hover:shadow-xl transition-shadow duration-300">
      <div className="flex-1 pr-6">
        <h2 className="text-2xl font-semibold leading-snug text-gray-900">
          {title}
        </h2>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          {description}
        </p>

        <div className="text-xs text-gray-500 mt-4">
          By {author} • {date} • {readTime}
        </div>

        <div className="flex items-center gap-5 mt-4 text-gray-600">
          <ThumbsUp
            size={20}
            className="cursor-pointer hover:text-black transition"
          />
          <MessageCircle
            size={20}
            className="cursor-pointer hover:text-black transition"
          />
          <Bookmark
            size={20}
            className="cursor-pointer hover:text-black transition"
          />
        </div>
      </div>

      <img
        src={image}
        alt="thumbnail"
        className="w-44 h-32 object-cover rounded-xl shadow-sm"
      />
    </div>
  );
}
