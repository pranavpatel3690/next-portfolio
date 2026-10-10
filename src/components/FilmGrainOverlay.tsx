"use client";

import { useEffect, useState } from "react";

export default function FilmGrainOverlay() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Check local storage preference
    const saved = localStorage.getItem("film-grain-enabled");
    if (saved !== null) {
      setEnabled(saved === "true");
    }
  }, []);

  const toggleGrain = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    localStorage.setItem("film-grain-enabled", String(nextState));
  };

  return (
    <>
      {/* SVG Noise Definition */}
      <svg className="hidden">
        <filter id="film-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Film Grain Texture Layer */}
      {enabled && (
        <div
          className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.045] mix-blend-overlay animate-grain"
          style={{
            filter: "url(#film-grain-filter)",
            width: "300%",
            height: "300%",
            top: "-100%",
            left: "-100%",
          }}
        />
      )}

      {/* Subtle Grain Toggle Button in Bottom Corner */}
      <button
        onClick={toggleGrain}
        className="fixed bottom-4 right-4 z-[9995] px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider transition-all duration-300 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:border-white/50 bg-black/40 hover:bg-black/70 flex items-center gap-1.5"
        title="Toggle 35mm Film Grain Overlay"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            enabled ? "bg-amber-400 animate-pulse" : "bg-white/30"
          }`}
        />
        <span>GRAIN: {enabled ? "35MM ON" : "OFF"}</span>
      </button>
    </>
  );
}
