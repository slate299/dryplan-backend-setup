import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      {/* 🪄 Hero Section */}
      <section className="hero">
        <h1>💧 DryPlan</h1>
        <p>
          Smart water planning for a thirsty planet.  
          Built to empower sustainable water management with data, insight, and teamwork.
        </p>
      </section>

      {/* 🧠 Story Section */}
      <section className="story">
        <h2>Our Story</h2>
        <p>
          It all started with one question — <em>how can we prevent water shortages before they happen?</em>  
          As students passionate about sustainability and technology, we designed DryPlan to make
          water management simple, visual, and predictive.
        </p>
      </section>

      {/* ⚙️ What It Does */}
      <section className="features">
        <h2>What DryPlan Does</h2>
        <ul>
          <li>💧 Tracks rainfall, reservoir, and usage data.</li>
          <li>🌍 Predicts shortages using simple analytics.</li>
          <li>📊 Gives planners interactive dashboards.</li>
          <li>🔔 Alerts communities before crises occur.</li>
        </ul>
      </section>

      {/* 🧑‍💻 Team Section */}
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="member">
            <h3>Alila</h3>
            <p className="role">UI/UX & Navigation</p>
            <p className="power">✨ Turning pixels into magic</p>
          </div>
          <div className="member">
            <h3>Grace</h3>
            <p className="role">Frontend Engineer</p>
            <p className="power">⚙️ Makes buttons actually do things</p>
          </div>
          <div className="member">
            <h3>You</h3>
            <p className="role">Backend & APIs</p>
            <p className="power">🧠 Speaks fluent JSON</p>
          </div>
        </div>
      </section>

      {/* 🌱 Vision */}
      <section className="vision">
        <h2>Our Vision</h2>
        <p>
          We imagine a world where every drop counts —  
          and every decision about water is backed by data.  
          DryPlan is just the beginning.
        </p>
      </section>

      {/* 🚀 Call to Action */}
      <section className="cta">
        <p>
          🚀 Built in 48 hours. Fueled by caffeine and passion.  
          Follow our journey on{" "}
          <a href="https://github.com/OliveAlila/DryPlan" target="_blank" rel="noreferrer">
            GitHub
          </a>{" "}
          💙
        </p>
      </section>
    </div>
  );
}
