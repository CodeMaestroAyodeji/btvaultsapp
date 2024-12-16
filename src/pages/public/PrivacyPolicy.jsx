import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <main className={styles.privacypolicyContainer}>
      <h1>Privacy Policy</h1>
      <section className={styles.policySection}>
        <h2>Introduction</h2>
        <p>Your privacy is important to us. This Privacy Policy explains how we handle your data.</p>
      </section>
      <section className={styles.policySection}>
        <h2>Data Collection</h2>
        <p>We collect your data to provide a personalized experience and improve our services.</p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
