"use client";

import { useState } from "react";

interface BlurImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  onClick?: () => void;
}

export default function BlurImage({
  src,
  alt = "",
  className = "",
  style = {},
  loading = "lazy",
  onClick,
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-neutral-900/60 ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded
            ? "blur-0 scale-100 opacity-100"
            : "blur-md scale-105 opacity-40"
        }`}
      />
    </div>
  );
}
