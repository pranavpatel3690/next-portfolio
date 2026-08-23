"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const sampleImages = [
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865933/DSC09839_gpovev.jpg', alt: 'Photo 1' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865933/DSC09803_xk0u8y.jpg', alt: 'Photo 2' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865930/DSC09867_fzs2x1.jpg', alt: 'Photo 3' },
  { src: 'https://res.cloudinary.com/dar9k7h93/image/upload/v1785865930/DSC09369_kkyg5s.jpg', alt: 'Photo 4' },
];

// Dominant colors sampled from each photo
const photoColors = [
  '#c8a882', // Photo 1 - warm golden brown
  '#7a9bb5', // Photo 2 - cool blue grey
  '#b08860', // Photo 3 - earthy amber
  '#5a8a7a', // Photo 4 - muted teal green
];

export default function Home() {
  const [titleColor, setTitleColor] = useState('#ffffff');
  const [targetColor, setTargetColor] = useState('#ffffff');

  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  // Smooth color transition using requestAnimationFrame
  useEffect(() => {
    let animFrame: number;
    let current = { r: 255, g: 255, b: 255 };

    const parseHex = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    });

    const toHex = (r: number, g: number, b: number) =>
      `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;

    const animate = () => {
      const target = parseHex(targetColor);
      current.r += (target.r - current.r) * 0.05;
      current.g += (target.g - current.g) * 0.05;
      current.b += (target.b - current.b) * 0.05;
      setTitleColor(toHex(current.r, current.g, current.b));
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [targetColor]);

  const handleActiveImageChange = useCallback((index: number) => {
    setTargetColor(photoColors[index % photoColors.length]);
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
          onActiveImageChange={handleActiveImageChange}
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
          <h1
            id="hero-title"
            style={{ color: titleColor, transition: 'color 0.1s ease' }}
          >
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
