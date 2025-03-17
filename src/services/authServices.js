import axios from 'axios';

const API_URL = 'https://social-media-dash-b3cd6b0945ef.herokuapp.com/api/auth';

// User registration
export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; //if successful return the data of the user
    } catch (error) {
        throw new Error(error.response?.data?.message || "Registration failed"); //handles errors like wrong credentials
    }
}

// User login
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed");
    }
}

//Get user by ID
export const getUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Could not fetch user data");
    }
}

// Update user profile
export const updateUser = async (userData, token) => {
    try {
        const response = await axios.put(`${API_URL}/update`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update user");
    }
}

//Delete user profile
export const deleteUser = async (token) => {
    try {
        const response = await axios.delete(`${API_URL}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete user");
    }
}