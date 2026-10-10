import "./globals.css";

export const metadata = {
  title: "Rancho Patel — Adventure Photographer & Filmmaker",
  description: "Official portfolio of Rancho Patel. Specializing in high-end adventure, landscape, and short film photography and filmmaking across the globe.",
  openGraph: {
    title: "Rancho Patel — Adventure Photographer & Filmmaker",
    description: "Capturing the raw essence of adventure through high-end photography and cinematic filmmaking.",
    url: "https://www.ranchopatel.com/",
    siteName: "Rancho Patel",
    images: [
      {
        url: "https://www.ranchopatel.com/images/hero_main.jpg",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rancho Patel — Adventure Photographer & Filmmaker",
    description: "Capturing the raw essence of adventure through high-end photography and cinematic filmmaking.",
    images: ["https://www.ranchopatel.com/images/hero_main.jpg"],
  },
};

import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rancho Patel",
              url: "https://www.ranchopatel.com/",
              image: "https://www.ranchopatel.com/images/portrait.jpg",
              jobTitle: "Adventure Photographer & Filmmaker",
              description: "Rancho Patel is an adventure photographer and filmmaker specializing in high-performance field craft, landscape photography, and remote storytelling.",
              homeLocation: {
                "@type": "Place",
                name: "Calgary, Alberta, Canada"
              },
              knowsAbout: [
                "Adventure Photography",
                "Filmmaking",
                "Visual Storytelling",
                "Landscape Photography",
                "Commercial Photography"
              ],
              email: "helloranchoo@gmail.com",
              telephone: "+12265064033",
              sameAs: [
                "https://instagram.com/prnv_patel_"
              ]
            })
          }}
        />
      </head>
      <body>
        <PageTransition>
          <div className="page-transition" id="page-transition"></div>
          <Navbar />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
