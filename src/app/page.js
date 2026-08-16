"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  "/images/hero_main.jpg",
  "/images/l_3.jpg",
  "/images/DSC01934.jpg",
  "/images/c_5.jpg",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastActiveSlide, setLastActiveSlide] = useState(null);

  useEffect(() => {
    // Add body class for home page
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastActiveSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      
      // Clear the last-active state after transition completes (3s)
      setTimeout(() => {
        setLastActiveSlide(null);
      }, 3000);
    }, 6500);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section id="hero">
      <div id="hero-slideshow">
        {slides.map((src, index) => {
          let className = "hero-slide";
          if (index === currentSlide) className += " active";
          else if (index === lastActiveSlide) className += " last-active";
          
          return (
            <div
              key={src}
              className={className}
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          );
        })}
      </div>
      <div id="hero-overlay">
        <div id="hero-name-wrap">
          <h1 id="hero-title">Rancho Patel</h1>
          <p id="hero-sub">Photographer &amp; Filmmaker</p>
          <Link href="/contact" id="hero-cta">
            Let's work together
          </Link>
        </div>
      </div>
      <div id="home-footer-overlay">
        <p>&copy; 2026 Rancho Patel Photography</p>
      </div>
    </section>
  );
}
