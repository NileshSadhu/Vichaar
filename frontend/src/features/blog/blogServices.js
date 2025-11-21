import axiosClient from "../../services/api";

export const getAllPost = async ({ page = 1, limit = 10, tags, search }) => {
    try {
        const params = {};

        if (page) params.page = page;
        if (limit) params.limit = limit;
        if (tags) params.tags = tags;
        if (search) params.search = search;

        const response = axiosClient.get("/", { params });
        return response.data;

    } catch (error) {
        console.error("Failed to fetch posts.", error);
        throw error.response?.data || error;
    }
};

export const getSinglePost = async (slug) => {
    try {
        const response = await axiosClient.get(`/slug/${slug}`);
        return response.data;

    } catch (error) {
        console.error("Failed to fetch post.", error);
        throw error.response?.data || error;
    }
};

export const createPost = async ({ coverImage, title, content, tags }) => {
    try {
        const response = await axiosClient.post("/", {
            coverImage,
            title,
            content,
            tags
        });

        return response.data;

    } catch (error) {
        console.error("Failed to create post.", error);
        throw error.response?.data || error;
    }
};

export const updatePost = async (id, { coverImage, title, content, tags }) => {
    try {
        const payload = {};

        if (title) payload.title = title;
        if (content) payload.content = content;
        if (tags) payload.tags = tags;
        if (coverImage) payload.coverImage = coverImage;

        const response = await axiosClient.put(`/id/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error("Failed to update post.", error);
        throw error.response?.data || error;
    }
};

export const deletePost = async (id) => {
    try {
        const response = await axiosClient.delete(`/id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete posts.", error);
        throw error.response?.data || error;
    }
};