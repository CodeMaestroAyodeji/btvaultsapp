import React from 'react';
import styles from './About.module.css';

const AboutUs = () => {
  return (
    <main className={styles.aboutusContainer}>
      <h1>About Us</h1>
      <section className={styles.aboutContent}>
        <p>BTVaults is dedicated to providing secure and reliable cloud storage solutions for individuals and businesses alike.</p>
        <p>With our platform, you can store, manage, and access your files with ease and peace of mind.</p>
      </section>
    </main>
  );
};

export default AboutUs;
