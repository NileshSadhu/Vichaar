import slugify from "slugify";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import Post from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const { coverImage, title, content, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json(new ApiError(400, "Title and content are required"));
        }

        const slug = slugify(title, { lower: true, strict: true });

        const newPost = await Post.create({
            coverImage,
            title,
            content,
            tags,
            author: req.user._id,
            slug,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, "Post created successfully", newPost));

    } catch (error) {
        console.error("Failed to create post:", error.message);
        return res
            .status(500)
            .json(new ApiError(500, "Failed to create post", error.message));
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) {
            throw new ApiError(404, "Post not found.");
        }

        if (post.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            throw new ApiError(403, "Not authorized to delete this post.");
        }

        await Post.findByIdAndDelete(id);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Post delete successfully"
                )
            )

    } catch (error) {
        console.error("Failed to delete post. ", error.message);
        return res
            .status(500)
            .json(
                new ApiError(
                    500,
                    "Failed to delete Post."
                )
            )
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, coverImage } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        if (post.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            throw new ApiError(403, "Not authorized to update this post.")
        }

        if (title) {
            post.title = title;
            post.slug = slugify(title, { lower: true, strict: true });
        }

        if (content) post.content = content;
        if (tags) post.tags = tags;
        if (coverImage) post.coverImage = coverImage;

        const updatedPost = await post.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Post update successfully.",
                    { post: updatedPost }
                )
            )

    } catch (error) {
        console.error("Failed to update post. ", error.message);
        return res
            .status(500)
            .json(
                new ApiError(
                    500,
                    "Failed to update post."
                )
            )
    }
};

const getSinglePost = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await Post.findOne({ slug })
            .populate("author", "username email avatar");

        if (!post) {
            throw new ApiError(404, "Post not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Post fetched successfully",
                    post
                )
            );
    } catch (error) {
        console.error("Failed to get post:", error.message);
        return res
            .status(500)
            .json(new ApiError(500, "Failed to fetch post"));
    }
};

const getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, tag, search } = req.query;

        const filter = {};
        if (tag) filter.tags = { $in: [tag] };

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [posts, totalCount] = await Promise.all([
            Post.find(filter)
                .populate("author", "username email avatar")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Post.countDocuments(filter)

        ]);

        return res.status(200).json(
            new ApiResponse(200, "Posts fetched successfully", {
                total: totalCount,
                page: parseInt(page),
                limit: parseInt(limit),
                posts
            })
        );
    } catch (error) {
        console.error("Failed to get posts:", error.message);
        return res
            .status(500)
            .json(new ApiError(500, "Failed to fetch posts", error.message));
    }

};

export {
    createPost,
    deletePost,
    updatePost,
    getSinglePost,
    getAllPosts
};