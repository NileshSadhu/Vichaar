import axiosClient from "./api.js";

export const registerUser = async ({ username, email, password }) => {
    try {
        const response = await axiosClient.post("/api/auth/register",
            { username, email, password }
        );

        if (response.status === 201) {
            alert("Verification link send to your email");
            console.log("User register successfully.");
            return true;
        }

        return false;
    }
    catch (error) {
        if (error.response?.status === 400) {
            console.log("User exists.");
            return false;
        }
        console.error("Registration failed:", error);
        throw error;
    }
};

export const login = async ({ email, password }) => {
    try {
        const response = await axiosClient.post("/api/auth/login", {
            email,
            password
        });

        if (response.status === 200) {
            alert("User login successfully.");
            console.log("User logged in successfully");
            return true;
        }

        return false;

    } catch (error) {
        if (error.response?.status === 401) {
            console.log("Invalid email or password");
            return false;
        }
        console.error("Login failed:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axiosClient.post("/api/auth/logout");

        if (response.status === 200) {
            console.log("User logged out successfully");
            return true;
        }

        return false;
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("Unauthorized: Token expired or invalid");
            return false;
        }

        console.error("Logout failed:", error);
        throw error;
    }
};

export const fetchCurrentUser = async () => {
    const res = await axiosClient.get("/api/auth/me");
    return res.data.data;
};