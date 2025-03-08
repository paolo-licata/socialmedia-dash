import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authServices";
import "../styles/SignupForm.css"

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await signupUser({ username, email, password }); // Call API Service
            navigate("/login");
        } catch (error) {
            setError(error.message || "Registration failed. Please try again.");
        }
    }

    return (
        <div className="container">
            <div className="signup-container">
                <h2>Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter you email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Log In!</a></p>
            </div>
        </div>
    )
}

export default SignupForm;