import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="error-container">
            <h1 className="error-title">404</h1>
            <h2 className="error-message">Oops! Page Not Found</h2>
            <p className="error-description">
                The page you are looking for might have been removed, or not available!
            </p>
            <Link to="/" className="error-home-button">Back To Home</Link>
        </div>
    );
};

export default ErrorPage;
