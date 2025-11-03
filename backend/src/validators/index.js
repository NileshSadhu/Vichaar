import { body } from "express-validator";
const registerValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail().withMessage("Email is Invalid"),

        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required.")
            .toLowerCase()
            .withMessage("Username must be in lowercase.")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 character long."),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8, max: 16 })
            .withMessage("Password length must greater than or equal 8"),
    ];
};

const loginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail().withMessage("Email is Invalid"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8, max: 16 })
            .withMessage("Password length must greater than or equal 8"),
    ];
};
const changePasswordValidator = () => {
    return [
        body("oldPassword")
            .trim()
            .notEmpty()
            .withMessage("Old Password is required")
            .isLength({ min: 8, max: 16 })
            .withMessage("Password length must greater than or equal 8"),

        body("newPassword")
            .trim()
            .notEmpty()
            .withMessage("New password is required.")
            .isLength({ min: 8, max: 16 })
            .withMessage("Password length must greater than or equal 8"),
    ];
};

const forgotPasswordValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail().withMessage("Email is invalid")]
};

const resetForgotPasswordValidator = () => {
    return [
        body("newPassword")
            .notEmpty()
            .withMessage("Password is required")]
};
export { registerValidator, loginValidator, changePasswordValidator, forgotPasswordValidator, resetForgotPasswordValidator };