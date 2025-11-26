import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            trim: true,
            required: true,
            maxlength: 500,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },]
    },
    { timestamps: true }
);

export default mongoose.model("comment", commentSchema);