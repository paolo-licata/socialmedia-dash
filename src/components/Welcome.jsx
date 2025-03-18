import { Link } from "react-router-dom";
import "../styles/Welcome.css"

const Welcome = () => {
    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome to TechGram!</h1>
            <p className="welcome-description">
            A community-driven platform where tech enthusiasts share the latest 
            news, gaming updates, PC builds, and development insights. Join us to 
            stay updated and engage with like-minded people!
            </p>

            <div className="button-container">
                <Link to="/login" id="login-button">Login</Link>
                <Link to="/signup" id="signup-button">Signup</Link>
            </div>
        </div>
    )
}

export default Welcome;