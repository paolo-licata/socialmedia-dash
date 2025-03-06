import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";
import "../styles/LoginForm.css"

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const data = await loginUser({ email, password }); // Call API Service
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message || "Login failed. Please try again.");
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account yet? <a href="/signup">Sign up!</a></p>
        </div>        
      );

}

export default LoginForm;