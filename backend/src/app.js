import express from "express";
import cors from "cors";

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

// ✅ Routes
import healthCheck from "./routes/healthcheck.route.js";
import auth from "./routes/auth.route.js";
import post from "./models/post.model.js";

app.use("/api/health", healthCheck);
app.use("/api/auth", auth);
app.use("/api/post", post);

app.get("/", (req, res) => {
    res.send("Blog Website in production");
});

export default app;
