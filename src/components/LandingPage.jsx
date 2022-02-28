import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function HomePage() {
  return (
    <div className="landing-box">
    <Header/>
    <main>    
      <a href="http://localhost:3000/editor" className="editor-link">
        <img src="/mobile.png" alt="mobile" className="landing-icon-style" />
        <h3> Design for Mobiles</h3>
        <small>Best for small screen devices </small>
      </a>
    </main>
    <Footer/>
    </div>
  );
}

export default HomePage;
