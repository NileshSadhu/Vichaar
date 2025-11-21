import ApiError from "../utils/api-error.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/api-response.js";
import { emailVerificationMailgenContent, forgetPasswordMailgenContent, sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const getAccessAndRefreshToken = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error while generating tokens");
    }
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "All the field are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(400, "User already exists in the database.");
    }

    const user = await User.create({
        username,
        email,
        password,
        isEmailVerified: false
    });

    const { unhashToken, hashedToken, tokenExpiry } = user.generateToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });
    await sendEmail({
        email: user?.email,
        subject: "Please Verify your email",
        mailgenContent: emailVerificationMailgenContent(
            username,
            `${req.protocol}://${req.get("host")}/api/auth/user/verify-email/${unhashToken}`
        )
    });

    return res.status(201).json(
        new ApiResponse(
            201,

            "User register successfully."
        )
    );

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !user.isEmailVerified) {
        throw new ApiError(401, "Invalid email or password");
    }

    const passwordValid = await user.isPasswordCorrect(password);
    if (!passwordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await getAccessAndRefreshToken(user);

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                "User logged in successfully"
            )
        );
};

const readToken = async (req, res) => {
    const { verifyEmailtoken } = req.params;

    if (!verifyEmailtoken) {
        throw new ApiError(400, "Email verification token is missing.");
    }

    let hashToken = crypto
        .createHash("sha256")
        .update(verifyEmailtoken)
        .digest("hex")

    const user = await User.findOne({
        emailVerificationToken: hashToken,
        emailVerificationExpiry: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Token is invalid or expired");
    }

    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined

    user.isEmailVerified = true
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    isEmailVerified: true
                },
                "Email is verified"
            )
        )
};

const newRefreshAccessToken = async (req, res) => {
    const newRefreshTokenReq = req.cookies.refreshToken || req.body.refreshToken;

    if (!newRefreshTokenReq) {
        throw new ApiError(400, "Unauthorized access.");
    }

    try {
        const decodedToken = jwt.verify(newRefreshTokenReq, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (newRefreshTokenReq !== user?.refreshToken) {
            user.refreshToken = "";
            await user.save({ validateBeforeSave: false });
            throw new ApiError(401, "Invalid refresh token.");
        }

        const { accessToken, refreshToken: newRefreshToken } = await getAccessAndRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: false, // for local test
            sameSite: "strict",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken
                    },
                    "Access Token Refreshed."
                )
            )
    } catch (error) {
        console.error("Refresh token error:", error.message);
        throw new ApiError(401, error.name === "TokenExpiredError" ? "Refresh token expired" : "Invalid refresh token");
    }
};

const logoutUser = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(401, "Unauthorized - User not found in request.");
        }

        await User.findByIdAndUpdate(
            userId,
            { $set: { refreshToken: "" } },
            { new: true }
        );

        const options = {
            httpOnly: true,
            secure: false, // for local test
            sameSite: "strict",
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "User logged out successfully."
                )
            );
    } catch (error) {
        console.error("Logout error: ", error.message);
        throw new ApiError(500, "Logout failed. Try again later.");
    }

};

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required.");
    }

    const user = await User.findOne({ email });
    if (!user || !user.isEmailVerified) {
        throw new ApiError(400, "User doesn't exist.");
    }

    const { unhashToken, hashToken, shortToken } = user.generateToken();
    user.forgetPasswordToken = hashToken
    user.forgetPasswordTokenExpiry = new Date(Date.now() + 20 * 60 * 1000) // 20min

    await user.save({ validateBeforeSave: false });
    await sendEmail({
        email: user?.email,
        subject: "Request for password reset.",
        mailgenContent: forgetPasswordMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/auth/user/reset-password/${unhashToken}`
        )
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { resetPasswordToken: unhashToken },
                "Reset Passwor link sent to your email."
            )
        )

};

const resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    if (!resetToken) {
        throw new ApiError(400, "Reset Password Token is missing.");
    }

    const hashToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    const user = await User.findOne({
        forgetPasswordToken: hashToken,
        forgetPasswordTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Token is expired or invalid");
    }

    user.password = newPassword
    user.forgetPasswordToken = undefined
    user.forgetPasswordTokenExpiry = undefined

    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Password reset successful."
            )
        )

};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            throw new ApiError(400, "Both old and new passwords are required");
        }

        if (oldPassword === newPassword) {
            throw new ApiError(400, "New password must be different from old password");
        }

        const user = await User.findById(req.user?._id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const isPasswordValid = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordValid) {
            throw new ApiError(400, "Old password is incorrect");
        }

        user.password = newPassword;
        user.refreshToken = "";
        await user.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Password changed successfully. Please log in again."
                )
            );
    } catch (error) {
        console.error("Change password error:", error.message);
        throw new ApiError(500, "Unable to change password. Try again later.");
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(401, "Unauthorized - Invalid token");
        }

        const user = await User.findById(userId).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry -forgetPasswordToken -forgetPasswordTokenExpiry");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user,
                    "Current user fetched successfully."
                )
            );
    } catch (error) {
        console.error("Get current user error:", error.message);
        throw new ApiError(500, "Unable to fetch current user.");
    }
};

export {
    registerUser,
    loginUser, readToken,
    newRefreshAccessToken,
    logoutUser,
    forgetPassword,
    resetPassword,
    getCurrentUser,
    changePassword
};