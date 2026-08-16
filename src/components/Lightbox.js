"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Lightbox() {
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: "", alt: "" });

  useEffect(() => {
    const handleOpenLightbox = (e) => {
      setLightboxData({
        isOpen: true,
        src: e.detail.src,
        alt: e.detail.alt,
      });
    };

    window.addEventListener("open-lightbox", handleOpenLightbox);
    return () => window.removeEventListener("open-lightbox", handleOpenLightbox);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && lightboxData.isOpen) {
        setLightboxData({ ...lightboxData, isOpen: false });
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxData]);

  if (!lightboxData.isOpen) return null;

  return (
    <div id="lightbox" className="active" onClick={() => setLightboxData({ ...lightboxData, isOpen: false })}>
      <button 
        id="lightbox-close" 
        aria-label="Close" 
        onClick={(e) => {
          e.stopPropagation();
          setLightboxData({ ...lightboxData, isOpen: false });
        }}
      >
        &times;
      </button>
      <img src={lightboxData.src} alt={lightboxData.alt} id="lightbox-img" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
