"use client";

import { useEffect, useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.classList.add("contact-page");
    return () => document.body.classList.remove("contact-page");
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector("#form-submit");

    submitBtn.textContent = "Sending...";
    submitBtn.style.opacity = "0.7";
    setIsSubmitting(true);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
      submitBtn.textContent = "Send";
      submitBtn.style.opacity = "1";
    }
  };

  return (
    <div id="contact-split">
      <div id="contact-left">
        <h2>
          Get In<br />
          Touch
        </h2>
        <p>
          Available for adventure assignments, editorial commissions, fine art
          prints, brand collaborations, and speaking engagements worldwide.
        </p>
        <a href="mailto:helloranchoo@gmail.com" id="contact-email-link">
          helloranchoo@gmail.com
        </a>
        <div style={{ marginTop: "10px" }}>
          <a
            href="tel:+12265064033"
            style={{
              color: "#999",
              textDecoration: "none",
              fontFamily: "'Neue Montreal', sans-serif",
              fontSize: "1.2rem",
              transition: "color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#999")}
          >
            +1 (226) 506-4033
          </a>
        </div>
        <div id="contact-socials">
          <a
            href="https://instagram.com/prnv_patel_"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-icon"
            aria-label="Instagram"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>

      <div id="contact-right" style={{ position: "relative" }}>
        <h3>Send a Message</h3>

        <div
          id="form-success-overlay"
          style={{ opacity: success ? 1 : 0, pointerEvents: success ? "auto" : "none", transition: "opacity 0.4s ease" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3 style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}>
            Message Received
          </h3>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Thanks for reaching out. I'll be in touch shortly.
          </p>
        </div>

        <form
          id="contact-form"
          action="https://formsubmit.co/helloranchoo@gmail.com"
          method="POST"
          onSubmit={handleFormSubmit}
          style={{ opacity: success ? 0 : 1, transition: "opacity 0.4s ease" }}
        >
          <input
            type="hidden"
            name="_subject"
            value="New Inquiry from Portfolio Website"
          />
          <input type="hidden" name="_captcha" value="false" />

          <div className="form-group">
            <label htmlFor="form-name">Name</label>
            <input
              type="text"
              id="form-name"
              name="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="form-email">Email</label>
            <input
              type="email"
              id="form-email"
              name="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="form-service">What's on your mind?</label>
            <select id="form-service" name="service" required defaultValue="">
              <option value="" disabled>
                Select an option...
              </option>
              <option value="Photography">Photography</option>
              <option value="Videography">Videography</option>
              <option value="Photography & Videography">
                Photography & Videography
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="form-subject">Subject</label>
            <input
              type="text"
              id="form-subject"
              name="subject"
              placeholder="Commission / Licensing / Other"
            />
          </div>
          <div className="form-group">
            <label htmlFor="form-message">Message</label>
            <textarea
              id="form-message"
              name="message"
              placeholder="Tell me about your project..."
              required
            ></textarea>
          </div>
          <button type="submit" id="form-submit" disabled={isSubmitting}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
