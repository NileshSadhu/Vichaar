import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJwt = async (req, res, next) => {
    try {
        let token;

        if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        } else if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
        }

        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded || !decoded._id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found for token" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
