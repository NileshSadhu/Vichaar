import { validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMsg = errors
            .array()
            .map((e) => e.msg)
            .filter((v, i, a) => a.indexOf(v) === i) // remove duplicates
            .join(", ");
        throw new ApiError(400, errorMsg);
    }
    next();
};
