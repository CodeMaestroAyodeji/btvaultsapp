import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaDollarSign } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { BiSolidDashboard } from "react-icons/bi";
import useMediaQuery from "../hooks/useMediaQuery";
import styles from "./Header.module.css";

const Header = () => {
  const isTabletOrMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMyDashboardRedirect = () => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    navigate(isAdmin ? "/admin" : "/dashboard");
  };

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.brand}>
        <Link to="/">
          <img
            src={`${import.meta.env.BASE_URL}logo192.png`}
            alt="BTVaults Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      {isTabletOrMobile && (
        <button
          className={styles.hamburger}
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></span>
        </button>
      )}

      <nav
        className={`${styles.navLinks} ${
          isTabletOrMobile && isMenuOpen ? styles.active : ""
        }`}
      >
        {isTabletOrMobile && (
          <button className={styles.closeMenu} onClick={handleLinkClick}>
            &times;
          </button>
        )}
        <Link to="/plan-list" onClick={handleLinkClick}>
          <FaDollarSign /> Pricing
        </Link>

        <button
          className={styles.navButton}
          onClick={() => {
            handleLinkClick();
            handleMyDashboardRedirect();
          }}
        >
          <BiSolidDashboard className={styles.dashBtn} />
          Dashboard
        </button>

        <Link to="/contact-us" onClick={handleLinkClick}>
          <FaEnvelope /> Contact
        </Link>
        <Link
          to="/login"
          className={styles.loginBtn}
          onClick={handleLinkClick}
        >
          <LuLogIn />
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
