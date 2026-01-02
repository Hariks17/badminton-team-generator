import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <p>Built with 🏸 by Hariharan Sankar</p>
      <p>© 2026 Badminton Team Generator. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
