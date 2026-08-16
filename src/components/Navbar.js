"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Top Navigation */}
      <header id="site-header" className="solid-mode">
        <Link href="/contact" id="nav-contact">
          Contact
        </Link>
        <Link href="/" id="nav-logo">
          <img
            src="/images/logo.png"
            alt="Rancho Patel"
            className="nav-logo-img"
          />
        </Link>
        <button id="nav-menu-btn" aria-label="Open menu" onClick={toggleMenu}>
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <div className="hamburger" id="hamburger">
            <span
              style={
                menuOpen
                  ? { transform: "translateY(6.5px) rotate(45deg)" }
                  : {}
              }
            ></span>
            <span style={menuOpen ? { opacity: "0" } : {}}></span>
            <span
              style={
                menuOpen
                  ? { transform: "translateY(-6.5px) rotate(-45deg)" }
                  : {}
              }
            ></span>
          </div>
        </button>
      </header>

      {/* Fullscreen Menu Overlay */}
      <nav
        id="menu-overlay"
        aria-hidden={!menuOpen}
        className={menuOpen ? "active" : ""}
      >
        <div id="menu-image-half">
          <img
            src="/images/hero_main.jpg"
            alt="Featured Menu Image"
            id="menu-featured-img"
          />
        </div>
        <div id="menu-content-half">
          <div id="menu-links">
            <Link href="/" className="menu-link">
              Home
            </Link>
            <Link href="/about" className="menu-link">
              About
            </Link>
            <Link href="/stills" className="menu-link">
              Stills
            </Link>
            <Link href="/motion" className="menu-link">
              Motion
            </Link>
            <Link href="/contact" className="menu-link">
              Contact
            </Link>
          </div>
          <div id="menu-footer">
            <a
              href="https://instagram.com/prnv_patel_"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-social"
            >
              Instagram
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
