import React from "react";
import "./error.css";

const ErrorPage = () => {
  return (
    <div className="not-found">
      <h1 className="title">404</h1>
      <h3 className="subtitle">Page Not Found</h3>
      <p className="description">
        Oops! The page you're looking for does not exist.
      </p>
    </div>
  );
};

export default ErrorPage;
