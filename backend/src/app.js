import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ✅ Routes
import healthCheckRoutes from "./routes/healthcheck.route.js";
import authRoutes from "./routes/auth.route.js";
import postsRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";

app.use("/api/health", healthCheckRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
    res.send("Blog Website in production");
});

export default app;
