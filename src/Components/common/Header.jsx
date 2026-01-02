import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import styles from "./Header.module.scss";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: "pi pi-home" },
    {
      label: "Team Generator",
      path: "/guest/team-generator",
      icon: "pi pi-sitemap",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🏸</span>
          <span className={styles.logoText}>Badminton</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${
                isActive(item.path) ? styles.active : ""
              }`}
            >
              <i className={item.icon}></i>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Auth buttons */}
        <div className={styles.authButtons}>
          <Button
            label="Login"
            severity="secondary"
            text
            size="small"
            className={styles.loginBtn}
          />
          <Button label="Sign Up" size="small" className={styles.signupBtn} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="pi pi-bars"></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.mobileNavLink} ${
                isActive(item.path) ? styles.active : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className={item.icon}></i>
              {item.label}
            </Link>
          ))}
          <div className={styles.mobileAuthButtons}>
            <Button label="Login" severity="secondary" text block />
            <Button label="Sign Up" block />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
