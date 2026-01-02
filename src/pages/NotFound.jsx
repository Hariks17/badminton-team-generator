import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import styles from "./NotFound.module.scss";

const NotFound = () => (
  <div className={styles.notFound}>
    <h1>404</h1>
    <p>Oops! Page not found</p>
    <Link to="/">
      <Button label="Back to Home" icon="pi pi-arrow-left" />
    </Link>
  </div>
);

export default NotFound;
