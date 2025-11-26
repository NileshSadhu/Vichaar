import { Bookmark, MessageCircle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogCard({ slug, title, content, coverImage, tags }) {
  return (
    <Link to={`/posts/${slug}`} className="Block w-full max-w-3xl group">
      <div
        className="
        w-full max-w-3xl 
        flex items-start justify-between 
        p-6 bg-white 
        rounded-3xl 
        border border-zinc-200
        shadow-[0_4px_10px_rgba(0,0,0,0.05)] 
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]
        hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
      "
      >
        <div className="flex-1 pr-6">
          {/* TITLE */}
          <h2 className="text-[22px] font-semibold leading-snug text-zinc-900">
            {title}
          </h2>

          {/* DESCRIPTION PREVIEW */}
          <p className="text-[15px] text-zinc-600 mt-3 leading-relaxed">
            {content?.slice(0, 150)}...
          </p>

          {/* TAGS */}
          {tags && tags.length > 0 && (
            <div className="flex gap-2 mb-3 mt-3 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="
                  text-xs 
                  px-3 py-1 
                  rounded-full 
                  bg-zinc-100 
                  text-zinc-700 
                  border border-zinc-200
                "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* ICONS */}
          <div className="flex items-center gap-5 mt-4 text-zinc-500">
            <ThumbsUp
              size={20}
              className="cursor-pointer hover:text-zinc-800 transition"
            />
            <MessageCircle
              size={20}
              className="cursor-pointer hover:text-zinc-800 transition"
            />
            <Bookmark
              size={20}
              className="cursor-pointer hover:text-zinc-800 transition"
            />
          </div>
        </div>

        {/* THUMBNAIL */}
        <img
          src={coverImage}
          alt="thumbnail"
          className="w-44 h-32 object-cover rounded-2xl  border border-zinc-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          loading="lazy"
        />
      </div>
    </Link>
  );
}
