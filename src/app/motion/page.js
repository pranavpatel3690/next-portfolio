"use client";

import { useEffect, useState, useRef } from "react";
import Head from "next/head";

const projects = [
  {
    number: "01",
    category: "Commercial",
    title: "Canon Commercial",
    video: "https://res.cloudinary.com/dar9k7h93/video/upload/v1775416956/compress_Main_Final_h264_cad_nfmzdb.mp4",
    thumb: "/images/thumb_canon.jpg",
  },
  {
    number: "02",
    category: "Commercial",
    title: "Moosehead Beer",
    video: "https://res.cloudinary.com/dar9k7h93/video/upload/v1775414336/Get_a_Moosehead_with_Your_Name_On_It_wmvhql.mp4",
    thumb: "/images/thumb_moosehead.jpg",
  },
  {
    number: "03",
    category: "Music Video",
    title: "Finger Eleven",
    video: "/videos/finger_eleven_1.mp4",
    thumb: "/images/thumb_fe1.jpg",
  },
  {
    number: "04",
    category: "Short Film",
    title: "Capacity",
    video: "/videos/CAPACITY.mp4",
    thumb: "/images/Capacity_19_-Thumbnail.jpeg",
  },
];

export default function Motion() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("motion-page");
    return () => document.body.classList.remove("motion-page");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const openVideo = (project) => {
    setActiveVideo(project);
    if (videoRef.current) {
      videoRef.current.src = project.video;
      videoRef.current.play();
    }
  };

  const closeVideo = () => {
    setActiveVideo(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
    }
  };

  return (
    <>
      <section className="motion-hero">
        <div className="motion-hero-content">
          <h1 className="motion-hero-title">Motion</h1>
          <p className="motion-hero-sub">Selected Film &amp; Commercial Work</p>
        </div>
        <div className="motion-hero-scroll">
          <span>Scroll to explore</span>
          <div className="motion-hero-line"></div>
        </div>
      </section>

      <div id="projects-container">
        {projects.map((project) => (
          <article
            key={project.number}
            className="project-card"
            onClick={() => openVideo(project)}
            onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector("video");
              if (video) video.play().catch(() => {});
            }}
            onMouseLeave={(e) => {
              const video = e.currentTarget.querySelector("video");
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            }}
          >
            <div className="project-number">{project.number}</div>
            <div className="project-visual">
              <div
                className="project-thumb"
                style={{ backgroundImage: `url('${project.thumb}')` }}
              ></div>
              <video
                className="project-video"
                src={project.video}
                muted
                loop
                playsInline
                preload="none"
              ></video>
              <div className="project-overlay">
                <div className="project-play-btn">
                  <svg width="18" height="20" viewBox="0 0 14 16" fill="white">
                    <path d="M1 1l12 7-12 7V1z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h2 className="project-title">{project.title}</h2>
            </div>
          </article>
        ))}
      </div>

      <footer className="motion-footer">
        <p>&copy; 2026 Rancho Patel. All rights reserved.</p>
      </footer>

      <div id="video-player" aria-hidden={!activeVideo} className={activeVideo ? "active" : ""}>
        <button id="video-close" aria-label="Close video" onClick={closeVideo}>
          &times;
        </button>
        <video id="video-player-el" controls ref={videoRef}>
          {activeVideo && <source src={activeVideo.video} type="video/mp4" />}
        </video>
        <div id="video-info">
          <span id="video-title-display">{activeVideo?.title}</span>
        </div>
      </div>
    </>
  );
}
