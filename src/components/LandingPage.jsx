import React from "react";

function HomePage() {
  return (
    <div className="landing-box">
    
      <a href="http://localhost:3000/editor" className="editor-link">
        <img src="/mobile.png" alt="mobile" className="landing-icon-style" />
        <h3> Design for Mobiles</h3>
        <small>Best for small screen devices </small>
      </a>

      <a href="http://localhost:3000/editor" className="editor-link">
        <img src="/laptop.png" alt="laptop" className="landing-icon-style" />
        <h3>Design for Laptops</h3>
        <small>Best for devices like desktops and laptops </small>
      </a>
    </div>
  );
}

export default HomePage;
