import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose(
    {
        slug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        coverImage: {
            type: String
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        tags: [String],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
    },
    {
        timestamps: true
    }
);

postSchema.pre("save", function (next) {
    if (!this.isModified("title")) return next();
    this.slug = slugify(this.title, { lower: true, strict: true });
    next();
})

export default mongoose.model("Post", postSchema);