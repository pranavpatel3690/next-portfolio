"use client";

import { useState, useEffect, useMemo } from "react";
import originalItems from "./data.json";
import Lightbox from "@/components/Lightbox";

export default function Stills() {
  const [filter, setFilter] = useState("all");
  const [displayItems, setDisplayItems] = useState([]);
  const [revealedItems, setRevealedItems] = useState(new Set());

  // Handle initial shuffle and filter changes
  useEffect(() => {
    let items = [];
    if (filter === "all") {
      items = [...originalItems].sort(() => Math.random() - 0.5);
    } else {
      items = originalItems.filter((item) => item.category === filter);
    }
    setDisplayItems(items);
    setRevealedItems(new Set()); // Reset reveals when filter changes
  }, [filter]);

  // Handle intersection observer for reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute("data-index");
            if (idx !== null) {
              setTimeout(() => {
                setRevealedItems((prev) => new Set(prev).add(parseInt(idx)));
              }, index * 80);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".gallery-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [displayItems]);

  // Add stills-page class to body on mount
  useEffect(() => {
    document.body.classList.add("stills-page");
    return () => {
      document.body.classList.remove("stills-page");
    };
  }, []);

  const openLightbox = (src, alt) => {
    const event = new CustomEvent("open-lightbox", { detail: { src, alt } });
    window.dispatchEvent(event);
  };

  const handleFilterClick = (newFilter) => {
    // Only scroll up if we are actually changing the filter
    if (newFilter !== filter) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setFilter(newFilter);
    }
  };

  return (
    <>
      <aside id="sidebar">
        <h2>Stills</h2>
        <ul id="filter-list">
          <li>
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => handleFilterClick("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`filter-btn ${filter === "landscape" ? "active" : ""}`}
              onClick={() => handleFilterClick("landscape")}
            >
              Landscape
            </button>
          </li>
          <li>
            <button
              className={`filter-btn ${filter === "adventure" ? "active" : ""}`}
              onClick={() => handleFilterClick("adventure")}
            >
              Adventure
            </button>
          </li>
          <li>
            <button
              className={`filter-btn ${filter === "portraits" ? "active" : ""}`}
              onClick={() => handleFilterClick("portraits")}
            >
              Portraits
            </button>
          </li>
          <li>
            <button
              className={`filter-btn ${filter === "climbing" ? "active" : ""}`}
              onClick={() => handleFilterClick("climbing")}
            >
              Climbing
            </button>
          </li>
        </ul>
      </aside>

      <div id="gallery-wrapper">
        <div id="gallery-track">
          {displayItems.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              data-index={index}
              className={`gallery-item ${
                revealedItems.has(index) ? "revealed" : ""
              }`}
              onClick={() => openLightbox(item.src, item.alt)}
            >
              <img
                src={item.src.startsWith("https://") ? item.src : `/${item.src}`}
                alt={item.alt}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <Lightbox />
    </>
  );
}
