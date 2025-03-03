import axios from 'axios';

const API_URL = 'https://social-media-dash-b3cd6b0945ef.herokuapp.com/api/posts';

// Get all posts
export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data; // Returns a list of posts
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch posts");
    }
}

// Create a post
export const createPost = async (postData, token) => {
    try {
        const response = await axios.post(`${API_URL}`, postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Returns the newly created post
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create post");
    }
}