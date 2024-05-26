import { PageTitle } from "@/Components2/helpers/PageTitle"
import React from "react"
import styles from "./Contact.module.css"

export const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <PageTitle title="Contact Us" />
      <h1 className={styles.contactTitle}>Contact Us</h1>
      <form className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input type="text" id="name" className={styles.input} placeholder="Enter your name" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input type="email" id="email" className={styles.input} placeholder="Enter your email" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message:
          </label>
          <textarea
            id="message"
            className={styles.textarea}
            placeholder="Enter your message"
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>
    </div>
  )
}
