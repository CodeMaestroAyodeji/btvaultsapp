import React from 'react';
import styles from './TermsOfUse.module.css';

const TermsOfUse = () => {
  return (
    <main className={styles.termsofuseContainer}>
      <h1>Terms of Use</h1>
      <section className={styles.termsSection}>
        <h2>General Terms</h2>
        <p>By using our platform, you agree to the following terms and conditions.</p>
      </section>
      <section className={styles.termsSection}>
        <h2>Usage Rights</h2>
        <p>We grant you a limited, non-exclusive license to use the service for personal and non-commercial purposes.</p>
      </section>
    </main>
  );
};

export default TermsOfUse;
