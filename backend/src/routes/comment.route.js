import { Router } from "express";
import { createComment, deleteComment, getComment } from "../controllers/comment.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

// public
router.route("/:postId").get(getComment);

// protected
router.route("/").post(verifyJwt, createComment);
router.route("/:id").delete(verifyJwt, deleteComment);

export default router;