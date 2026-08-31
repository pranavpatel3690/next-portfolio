"use client";

import { useEffect } from "react";
import Link from "next/link";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const sampleImages = [
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865933/DSC09839_gpovev.jpg', alt: 'Climbing 1' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865933/DSC09803_xk0u8y.jpg', alt: 'Climbing 2' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865930/DSC09867_fzs2x1.jpg', alt: 'Climbing 3' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865930/DSC09369_kkyg5s.jpg', alt: 'Climbing 4' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785988264/DSC09989_wgbukc.jpg', alt: 'Climbing 5' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785988261/DSC09952_ajonyd.jpg', alt: 'Climbing 6' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785988260/DSC09962_glehtm.jpg', alt: 'Climbing 7' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865943/DSC09991_zdjjgv.jpg', alt: 'Climbing 8' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785866708/DSC09985_l6mj9c.jpg', alt: 'Climbing 9' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865940/DSC09362_aaza5l.jpg', alt: 'Climbing 10' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865937/DSC09932_p929wu.jpg', alt: 'Climbing 11' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865937/DSC09981_xlsd6r.jpg', alt: 'Climbing 12' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865933/DSC09945_ijgogy.jpg', alt: 'Climbing 13' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865932/DSC09919_jproyi.jpg', alt: 'Climbing 14' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865930/DSC09822_jg4ikd.jpg', alt: 'Climbing 15' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865929/DSC09442_q3ivmu.jpg', alt: 'Climbing 16' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865929/DSC09903_h4ogm7.jpg', alt: 'Climbing 17' },
];

export default function Home() {
  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <section id="hero" style={{ position: "relative", overflow: "hidden", background: "#000" }}>
      {/* 3D Gallery Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
        <InfiniteGallery
          images={sampleImages}
          speed={1.2}
          zSpacing={3}
          visibleCount={12}
          falloff={{ near: 0.8, far: 14 }}
          className="h-full w-full"
        />
      </div>

      {/* Blended Title Layer - placed directly over canvas to allow true mix-blend-mode */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "exclusion",
        }}
      >
        <h1 id="hero-title">
          Rancho Patel
        </h1>
      </div>

      {/* Interactive CTA & Subtitle Layer */}
      <div
        id="hero-overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Invisible layout spacer mirroring the title style for perfect alignment */}
          <h1 id="hero-title" style={{ visibility: "hidden" }}>
            Rancho Patel
          </h1>
          <Link href="/contact" id="hero-cta" style={{ pointerEvents: "auto" }}>
            Let's work together
          </Link>
          <p id="hero-sub">Photographer &amp; Filmmaker</p>
        </div>
      </div>
    </section>
  );
}
