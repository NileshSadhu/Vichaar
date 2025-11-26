import axiosClient from "../../services/api.js"

export const getComments = async (postId) => {
    if (!postId) throw new Error("postId missing for getComments");

    try {
        const response = await axiosClient.get(`/api/comments/${postId}`);
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch comments", error);
        throw error;
    }
};

export const createComment = async ({ postId, content }) => {
    try {
        const response = await axiosClient.post("/api/comments", {
            postId,
            content
        });
        return response.data.data;
    } catch (error) {
        console.error("Failed to create comment", error);
        throw error;
    }
};

export const deleteComment = async (id) => {
    try {
        const response = await axiosClient.delete(`/api/comments/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete comment", error);
        throw error;
    }
};
