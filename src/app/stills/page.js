"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
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
      <div id="filter-nav">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => handleFilterClick("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "landscape" ? "active" : ""}`}
          onClick={() => handleFilterClick("landscape")}
        >
          Landscape
        </button>
        <button
          className={`filter-btn ${filter === "adventure" ? "active" : ""}`}
          onClick={() => handleFilterClick("adventure")}
        >
          Adventure
        </button>
        <button
          className={`filter-btn ${filter === "portraits" ? "active" : ""}`}
          onClick={() => handleFilterClick("portraits")}
        >
          Portraits
        </button>
        <button
          className={`filter-btn ${filter === "climbing" ? "active" : ""}`}
          onClick={() => handleFilterClick("climbing")}
        >
          Climbing
        </button>
      </div>

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
              {item.src.startsWith("https://") ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={item.src.includes('cloudinary')} // Quick fix for external images if next.config wasn't sufficient for all cases, but it is. We'll stick to standard props.
                />
              ) : (
                <img src={`/${item.src}`} alt={item.alt} loading="lazy" />
              )}
            </div>
          ))}
        </div>
      </div>
      <Lightbox />
    </>
  );
}
