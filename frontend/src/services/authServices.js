import axiosClient from "./api.js";

export const registerUser = async ({ username, email, password }) => {
    const res = await axiosClient.post("/api/auth/register", {
        username,
        email,
        password,
    });
    return res.data;
};

export const login = async ({ email, password }) => {
    const res = await axiosClient.post("/api/auth/login", {
        email,
        password,
    });
    return res.data;
};

export const logout = async () => {
    const res = await axiosClient.post("/api/auth/logout");
    return res.data;
};

export const fetchCurrentUser = async () => {
    try {
        const res = await axiosClient.get("/api/auth/me");
        return res.data.data;
    } catch (err) {
        if (err.response?.status === 401) return null;
        throw err;
    }
};

export const forgetPassword = async (email) => {
    const res = await axiosClient.post("/api/auth/forget-password", { email });
    return res.data;
};

export const resetPassword = async (token, newPassword) => {
    const res = await axiosClient.post(`/api/auth/reset-password/${token}`, {
        newPassword,
    });
    return res.data;
};

export const changePassword = async (oldPassword, newPassword) => {
    const res = await axiosClient.post("/api/auth/change-password", {
        oldPassword,
        newPassword,
    });
    return res.data;
};

export const refreshAccessToken = async () => {
    const res = await axiosClient.post("/api/auth/refresh-token");
    return res.data;
};
