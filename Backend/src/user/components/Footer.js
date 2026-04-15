import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-section">
          <h3>Embel</h3>
          <p>Technology Solutions for modern learning.</p>
        </div>

        {/* MIDDLE */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>My Courses</li>
            <li>Cart</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@embel.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Embel. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;