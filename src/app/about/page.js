"use client";

import { useEffect } from "react";
import FadeInScroll from "@/components/FadeInScroll";
import BlurImage from "@/components/BlurImage";

export default function About() {
  useEffect(() => {
    document.body.classList.add("about-page");
    return () => document.body.classList.remove("about-page");
  }, []);

  return (
    <div id="about-body">
      <FadeInScroll direction="right" delay={0.1} className="w-full">
        <div id="about-side-portrait">
          <BlurImage
            src="/images/About.PNG"
            alt="Rancho Patel"
            className="w-full h-auto rounded-xs"
          />
          <p id="about-side-caption">
            Rancho Patel — Photographer &amp; Filmmaker
          </p>
        </div>
      </FadeInScroll>

      <div id="about-text">
        <FadeInScroll delay={0.1}>
          <h2>Rancho Patel</h2>
        </FadeInScroll>

        <FadeInScroll delay={0.2}>
          <p className="about-lead">
            I don't just take photos — I chase moments. Give me a backpack, a
            camera, and a one-way ticket, and I'll bring back a story worth telling.
          </p>
        </FadeInScroll>

        <FadeInScroll delay={0.3}>
          <p>
            I'm Rancho — a photographer and filmmaker driven by an obsession with
            travel and adventure. I live for the kind of places that make your heart
            race: mountain ridges at sunrise, unmarked trails through dense jungle,
            remote coastlines where the only sound is the ocean and your own
            breathing. That's where I do my best work.
          </p>
        </FadeInScroll>

        <FadeInScroll delay={0.4}>
          <p>
            I picked up a camera because I wanted to hold onto the feeling of being
            somewhere completely alive. What started as shooting on road trips and
            hikes turned into a full-blown pursuit — travelling the world,
            documenting the raw and the real, and turning it all into visuals that
            make people feel something.
          </p>
        </FadeInScroll>

        <FadeInScroll delay={0.5}>
          <p>
            Whether I'm behind the lens capturing a still frame or directing
            motion, the goal is always the same: tell the story that words can't.
            The dust on a trail at golden hour. The silence before a storm breaks
            over the mountains. The look on someone's face when they reach the
            summit. That's what I live to create.
          </p>
        </FadeInScroll>

        <FadeInScroll delay={0.6}>
          <p>
            If you're looking for someone who'll go the extra mile — literally —
            let's make something together.
          </p>
        </FadeInScroll>

        <div id="about-credits">
          <FadeInScroll delay={0.7}>
            <div className="credit-item">
              <span className="credit-label">What I Do</span>
              <span className="credit-value">
                Photography · Filmmaking · Visual Storytelling
              </span>
            </div>
          </FadeInScroll>

          <FadeInScroll delay={0.8}>
            <div className="credit-item">
              <span className="credit-label">Obsessed With</span>
              <span className="credit-value">
                Travel · Adventure · The Outdoors
              </span>
            </div>
          </FadeInScroll>

          <FadeInScroll delay={0.9}>
            <div className="credit-item">
              <span className="credit-label">Gear</span>
              <span className="credit-value">
                Sony · DJI · Whatever fits in the bag
              </span>
            </div>
          </FadeInScroll>

          <FadeInScroll delay={1.0}>
            <div className="credit-item">
              <span className="credit-label">Available for</span>
              <span className="credit-value">
                Commissions · Collabs · Adventures
              </span>
            </div>
          </FadeInScroll>
        </div>
      </div>
    </div>
  );
}
