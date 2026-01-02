import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import styles from "./Landing.module.scss";

const Landing = () => {
  const features = [
    {
      icon: "🎲",
      title: "Random Team Generator",
      desc: "Create fair teams instantly with random shuffling",
    },
    {
      icon: "⚖️",
      title: "Balanced Teams",
      desc: "Mix skill levels perfectly - 1 strong + 1 average per team",
    },
    {
      icon: "🏆",
      title: "Tournament Mode",
      desc: "Run knockout tournaments with live bracket tracking",
    },
    {
      icon: "📊",
      title: "Score Tracking",
      desc: "Track match scores and declare winners in real-time",
    },
  ];

  return (
    <div className={styles.landing}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            ✨ The smarter way to run badminton nights
          </div>
          <h1 className={styles.heroTitle}>
            Fair Teams.
            <br />
            Better Games.
            <br />
            <span>Instant Fun.</span>
          </h1>
          <p className={styles.heroDesc}>
            Generate balanced badminton teams, run tournaments, and track scores
            all in one place. No signup required to get started.
          </p>

          <div className={styles.heroCTA}>
            <Link to="/guest/team-generator">
              <Button
                label="Start Generating Teams"
                icon="pi pi-arrow-right"
                size="large"
                className={styles.ctaPrimary}
              />
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1000+</span>
              <span className={styles.statLabel}>Teams Generated</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Tournaments Hosted</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5★</span>
              <span className={styles.statLabel}>User Rating</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className={styles.heroVisual}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardHeader}>
              <span className={styles.heroCardLabel}>Live preview</span>
              <span className={styles.heroCardTitle}>Tonight's Teams</span>
            </div>

            <div className={styles.teamDemo}>
              <div className={styles.teamRow}>
                <div className={styles.teamMeta}>
                  <span className={styles.teamName}>Team 1</span>
                  <span className={styles.teamTag}>Court 1</span>
                </div>
                <div className={styles.playerChips}>
                  <span className={styles.playerChip}>Alice</span>
                  <span className={styles.playerChip}>Bob</span>
                </div>
              </div>

              <div className={styles.teamRow}>
                <div className={styles.teamMeta}>
                  <span className={styles.teamName}>Team 2</span>
                  <span className={styles.teamTag}>Court 1</span>
                </div>
                <div className={styles.playerChips}>
                  <span className={styles.playerChip}>Charlie</span>
                  <span className={styles.playerChip}>Diana</span>
                </div>
              </div>
            </div>

            <button className={styles.shuffleBtn}>
              <i className="pi pi-refresh" />
              Shuffle teams
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureHeader}>
          <h2>Powerful features for great games</h2>
          <p>Everything you need to organize and run badminton sessions</p>
        </div>

        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <Card key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>Ready to get started?</h2>
        <p>No signup required. Generate your first teams in seconds.</p>
        <Link to="/guest/team-generator">
          <Button
            label="Try Now - It's Free"
            icon="pi pi-bolt"
            size="large"
            className={styles.ctaBig}
          />
        </Link>
      </section>
    </div>
  );
};

export default Landing;
