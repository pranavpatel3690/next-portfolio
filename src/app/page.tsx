"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const sampleImages = [
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865933/DSC09839_gpovev.jpg', alt: 'Photo 1' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865933/DSC09803_xk0u8y.jpg', alt: 'Photo 2' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865930/DSC09867_fzs2x1.jpg', alt: 'Photo 3' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865930/DSC09369_kkyg5s.jpg', alt: 'Photo 4' },
];

export default function Home() {
  useEffect(() => {
    // Add body class for home page
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <section id="hero" style={{ position: "relative", overflow: "hidden" }}>
      {/* 3D Gallery Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, background: "#000" }}>
        <InfiniteGallery
          images={sampleImages}
          speed={1.2}
          zSpacing={3}
          visibleCount={12}
          falloff={{ near: 0.8, far: 14 }}
          className="h-full w-full"
        />
      </div>

      <div
        id="hero-overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div id="hero-name-wrap" style={{ textAlign: "center" }}>
          <h1 id="hero-title">Rancho Patel</h1>
          <Link href="/contact" id="hero-cta" style={{ pointerEvents: "auto" }}>
            Let's work together
          </Link>
          <p id="hero-sub">Photographer &amp; Filmmaker</p>
        </div>
      </div>
    </section>
  );
}
