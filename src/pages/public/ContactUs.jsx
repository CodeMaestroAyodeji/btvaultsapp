import React from 'react';
import { FaUser, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Toastify success notification
    toast.success('Thank you for reaching out. We’ll get back to you shortly.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  return (
    <main className={styles.contactusContainer}>
      <h1 className={styles.contactTitle}>Contact Us</h1>
      <p className={styles.contactDsc}>
        We’d love to hear from you! Please fill out the form below, and our team will get back to you shortly.
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            <FaUser style={{ marginRight: '8px' }} /> Name
          </label>
          <input
            id="name"
            className={styles.input}
            type="text"
            placeholder="Enter your name"
            required
            aria-label="Enter your name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            <FaEnvelope style={{ marginRight: '8px' }} /> Email
          </label>
          <input
            id="email"
            className={styles.input}
            type="email"
            placeholder="Enter your email"
            required
            aria-label="Enter your email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>
            <FaPaperPlane style={{ marginRight: '8px' }} /> Message
          </label>
          <textarea
            id="message"
            className={styles.textArea}
            placeholder="Write your message here..."
            required
            aria-label="Write your message"
          ></textarea>
        </div>

        <button className={styles.submitBtn} type="submit">
          <FaPaperPlane style={{ marginRight: '8px' }} /> Send Message
        </button>
      </form>

      {/* Toastify container */}
      <ToastContainer />
    </main>
  );
};

export default ContactUs;
