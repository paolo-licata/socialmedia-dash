import { useState, useEffect } from "react";
import { getUser, updateUser, deleteUser } from "../services/authServices";
import "../styles/ProfilePage.css"

const ProfilePage = ({ token, onLogout}) => {
    const [ userData, setUserData ] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [ error, setError ] = useState("")
    const [ successMessage, setSuccessMessage ] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                 const data = await getUser(token);
                 setUserData({
                    username: data.username,
                    email: data.email,
                    password: ""
                });
            } catch (error) {
                setError(error.message);
            }
        }
        fetchUserData();
    }, [token]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleUpdate = async () => {
        try {
            const updatedData = {
                username: userData.username,
                email: userData.email
            };

            if (userData.password) {
                updatedData.password = userData.password; // Only send if the password is changed
            }

            await updateUser(updatedData, token);
            setSuccessMessage("Profile updated successfully");
            setUserData({ ...userData, password: "" }); //Clears the password field after the update
        } catch (error) {
            setError(error.message)
        }
    }

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete this account? This action is irreversible.")) return;

        try {
            await deleteUser(token);
            alert("Account delete successfully!")
            onLogout();
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="profile-container">
            <h2>Edit Profile</h2>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="form-group">
                <label>Username</label>
                <input 
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input 
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Username</label>
                <input 
                    type="password" 
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Enter a new password"
                />
            </div>

            <button onClick={handleUpdate}>Update Profile</button>
            <button onClick={handleDeleteAccount} className="delete-btn">Delete account</button>

        </div>
    )
}

export default ProfilePage;