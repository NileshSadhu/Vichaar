import { Router } from "express";
import {
    registerUser,
    loginUser,
    readToken,
    newRefreshAccessToken,
    logoutUser, forgetPassword,
    resetPassword,
    changePassword,
    getCurrentUser
} from "../controllers/auth.controller.js";

import {
    registerValidator,
    loginValidator,
    changePasswordValidator,
    forgotPasswordValidator,
    resetForgotPasswordValidator
} from "../validators/index.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

// unsecured route
router.route("/register").post(registerValidator(), validate, registerUser);
router.route("/login").post(loginValidator(), validate, loginUser);
router.route("/user/verify-email/:verifyEmailtoken").get(readToken);

router.route("/refresh-token").post(newRefreshAccessToken);
router.route("/forget-password").post(forgotPasswordValidator(), validate, forgetPassword);
router.route("/reset-password/:resetToken").post(resetForgotPasswordValidator(), validate, resetPassword);

// secured Token
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/change-password").post(verifyJwt, changePasswordValidator(), validate, changePassword);
router.route("/me").get(verifyJwt, getCurrentUser);

export default router;