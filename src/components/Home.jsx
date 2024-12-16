import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css"; // Import as 'styles'
import { FaCloudDownloadAlt, FaWindowMaximize } from "react-icons/fa"; // Importing icons

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMyDashboardRedirect = () => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      navigate("/admin"); // Admin dashboard
    } else {
      navigate("/dashboard"); // User dashboard
    }
  };

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <main className={styles.homeContainer}>
      <section>
        <h1 className={styles.h1}>
          Securely store and access your files in the cloud.
          <br /> Fast, private, and always available.
        </h1>
        <Link to="/signup" className={styles.homeSignUpLink}>
          Sign Up
        </Link>
        <div>
          <img
            src="/assets/hero.png"
            alt="BTVaults visual representation"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featureBlock}>
          <FaCloudDownloadAlt size={50} className={styles.icon} />
          <h2>Your files, your way — anytime, anywhere!</h2>
          <p>
            Enjoy the flexibility of accessing your files on any device, whether
            it’s a computer, smartphone, or tablet!
          </p>
        </div>
        <div className={styles.featureBlock}>
          <FaWindowMaximize size={50} className={styles.icon} />
          <h2>Access without limits — just browse!</h2>
          <p>
            With BTVaults, you can seamlessly access your files without the need
            for additional software.
          </p>
        </div>
      </section>

      <section>
        <div className={styles.cloudPath}>
          <h1>My Cloud</h1>
          <div className={styles.cloudPathDsc}>
            <h2>Manage Your Files</h2>
            <p>
              Conveniently view and manage all your downloaded files in one
              place.
            </p>
            <button className={styles.dashboard}
              onClick={() => {
                handleLinkClick();
                handleMyDashboardRedirect();
              }}
            >
              My Dashboard
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
