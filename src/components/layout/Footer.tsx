import React from "react"

export const Footer = () => {
  return (
    <footer className="flex-space-around">
      <div className="flex-space-around">
        <label htmlFor="subscribe">Subscribe to Newsletter</label>
        <input
          type="email"
          name="subscribe"
          id="subscribe"
          className="footer__input"
          placeholder="Enter Your Email Address"
        />
        <button className="btn btn-subscribe">Subscribe</button>
      </div>
      <div>
        <p>Copyright 2024 Ali Express. All right reserved</p>
      </div>
    </footer>
  )
}
