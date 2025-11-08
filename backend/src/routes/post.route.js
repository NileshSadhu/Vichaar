import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    createPost,
    deletePost,
    getAllPosts,
    getSinglePost,
    updatePost
} from "../controllers/post.controller.js";

const router = Router();

// Public route
router.route("/").get(getAllPosts);
router.route('/slug/:slug').get(getSinglePost);

// Protected route
router.route("/").post(verifyJwt, createPost);
router.route("/id/:id")
    .put(verifyJwt, updatePost)
    .delete(verifyJwt, deletePost);

export default router;