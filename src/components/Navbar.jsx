import React from "react";
import { useNavigate, Link, useLocation } from  "react-router-dom";
import "../styles/Navbar.css"

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const location = useLocation();

    // Conditional rendering
    if (location.pathname !== "/dashboard") {
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="app-name">
                <h2>Night Owls</h2>
            </div>

            <div className="navbar-elements">
                {token ? (
                    <>
                        <Link to="/profile" className="material-icons" id="profile">
                            <span class="material-symbols-outlined">account_circle</span>
                        </Link>
                        <button onClick={handleLogout} className="material-icons" id="logout">
                            <span class="material-symbols-outlined">power_settings_new</span>
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar;