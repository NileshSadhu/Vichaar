import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    avatar: {
        url: { type: String, default: "https://placehold.co/200x200" },
        localPath: { type: String, default: "" },
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    bio: {
        type: String,
        default: "This user hasn't added a bio yet."
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


    // Auth table
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpiry: {
        type: Date
    },
    refreshToken: {
        type: String
    },
    forgetPasswordToken: {
        type: String
    },
    forgetPasswordTokenExpiry: {
        type: Date
    }
},
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateToken = function () {
    const unhashToken = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto
        .createHash("sha256")
        .update(unhashToken)
        .digest('hex');

    const tokenExpiry = Date.now() + (20 * 60 * 60 * 1000); // 20 hrs
    return { unhashToken, hashedToken, tokenExpiry }
};

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export const User = mongoose.model("User", userSchema);