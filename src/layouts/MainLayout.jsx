import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import styles from "./MainLayout.module.scss";

const MainLayout = () => (
  <div className={styles.appContainer}>
    <Header />
    <main className={styles.mainContent}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
