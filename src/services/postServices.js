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

//Delete a post
export const deletePost = async (postId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete post");
    }
}

// Adding a comment to a post
export const addComment = async (postId, commentData, token) => {
    try {
        const response = await axios.post(`${API_URL}/${postId}/comments`, commentData, {
            headers: {
               Authorization: `Bearer ${token}`, 
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add comment");
    }
}

// Deleting a comment from a post
export const deleteComment = async (postId, commentId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${postId}/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete comment");
    }
}

//Like or unlike a post
export const likePost = async (postId, token) => {
    try {
        const response = await axios.post(`${API_URL}/${postId}/likes`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to like/unlike post")
    }
}