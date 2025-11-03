import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware";
import {
    createPost,
    deletePost,
    getAllPosts,
    getSinglePost,
    updatePost
} from "../controllers/post.controller";

const router = Router();

// Public route
router.route("/").get(getAllPosts);
router.route('/:slug').get(getSinglePost);

// Protected route
router.route("/").post(verifyJwt, createPost);
router.route("/:id").put(verifyJwt, updatePost);
router.route("/:id").delete(verifyJwt, deletePost);

export default router;