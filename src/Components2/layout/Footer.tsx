import React from "react"
import styles from "./Footer.module.css"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.subscribeSection}>
        <label htmlFor="subscribe" className={styles.label}>
          Subscribe to Newsletter
        </label>
        <input
          type="email"
          name="subscribe"
          id="subscribe"
          className={styles.input}
          placeholder="Enter Your Email Address"
        />
        <button className={styles.subscribeButton}>Subscribe</button>
      </div>
      <div className={styles.socialMediaSection}>
        <a href="https://www.facebook.com" className={styles.socialMediaLink} aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.twitter.com" className={styles.socialMediaLink} aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://www.instagram.com"
          className={styles.socialMediaLink}
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2024 Enas Express. All rights reserved.</p>
        <p>
          Made with <i className="fas fa-heart"></i> from Enas to all women in the world.
        </p>
      </div>
    </footer>
  )
}
