// src/App.jsx
import React from "react";
import TeamGenerator from "./Components/TeamGenerator";
import { PrimeReactProvider } from "primereact/api";

import "./index.css";

const App = () => {
  return (
    <PrimeReactProvider>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1 className="header-title">
              <span className="title-icon">🏸</span>
              Badminton Team Generator
            </h1>
            <p className="header-subtitle">Fair teams, instant fun</p>
          </div>
        </header>

        <main className="main">
          <TeamGenerator />
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>
              Built by <span className="highlight">Hariharan Sankar</span>
            </p>
            <p className="contact">hariwebstudy@gmail.com</p>
          </div>
        </footer>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
