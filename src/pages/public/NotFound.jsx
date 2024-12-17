import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go Back Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  header: {
    fontSize: "72px",
    marginBottom: "20px",
  },
  message: {
    fontSize: "24px",
    marginBottom: "30px",
  },
  link: {
    fontSize: "18px",
    color: "#007BFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default NotFound;
