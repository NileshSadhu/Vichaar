import ApiError from "../utils/api-error.js";
import Comment from "../models/comment.model.js";
import ApiResponse from "../utils/api-response.js";

const getComment = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            throw new ApiError(400, "Post ID is missing");
        }

        const comments = await Comment.find({ postId })
            .populate("userId", "username email avatar")
            .sort({ createdAt: -1 });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Comments fetched successfully",
                    comments
                )
            );
    } catch (error) {
        console.error("Failed to fetch comments:", error.message);
        return res
            .status(500)
            .json(new ApiError(500, "Failed to fetch comments", error.message));
    }
};

const createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;

        if (!postId || !content) {
            throw new ApiError(400, "Post ID and content are required");
        }

        const newComment = await Comment.create({
            postId,
            content,
            userId: req.user._id,
        });

        return res
            .status(201)
            .json(
                new ApiResponse(201, "Comment created successfully", newComment)
            );
    } catch (error) {
        console.error("Failed to create comment:", error.message);
        return res
            .status(500)
            .json(new ApiError(500, "Failed to create comment", error.message));
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        if (!comment) {
            throw new ApiError(404, "Comment not found");
        }

        if (
            comment.userId.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            throw new ApiError(403, "Not authorized to delete this comment");
        }

        await Comment.findByIdAndDelete(id);

        return res
            .status(200)
            .json(new ApiResponse(200, "Comment deleted successfully"));
    } catch (error) {
        console.error("Failed to delete comment:", error.message);
        return res
            .status(500)
            .json(new ApiError(500, "Failed to delete comment", error.message));
    }
};

export { getComment, createComment, deleteComment };
