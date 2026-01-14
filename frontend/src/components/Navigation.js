import React, { useEffect, useState } from "react";
import "./Navigation.css";

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav-wrapper">
      <div className={`nav-capsule ${scrolled ? "nav-scrolled" : ""}`}>
        
        {/* LOGO */}
        <button
          className="nav-logo"
          onClick={() => scrollToSection("home")}
        >
          <span>NeX</span>Let
        </button>

        {/* LINKS */}
        <div className="nav-links">
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("services")}>Services</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </div>
      </div>
    </nav>
    
  );
}

export default Navigation;
