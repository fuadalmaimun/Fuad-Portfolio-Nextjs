import JsonLd from "../src/components/JsonLd";
import "../src/styles/globals.css";


export const metadata = {
  metadataBase: new URL("https://fuad-al-maimun.vercel.app"),

  title: {
    default: "Fuad Al Maimun | Full Stack Developer",
    template: "%s | Fuad Al Maimun",
  },

  description:
    "Fuad Al Maimun is a web developer building responsive websites and full-stack web applications using React, Next.js, and Node.js.",

  keywords: [
    "Fuad Al Maimun",
    "Fuad",
    "Maimun",
    "Next.js Developer",
    "React Developer",
    "Full Stack Developer",
    "Web Developer Bangladesh",
  ],

  openGraph: {
    title: "Fuad Al Maimun | Full Stack Developer",
    description:
      "Explore my portfolio, web development projects, and technical skills.",
    url: "https://fuad-al-maimun.vercel.app",
    siteName: "Fuad Al Maimun Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fuad Al Maimun - Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fuad Al Maimun | Full Stack Developer",
    description:
      "Explore my portfolio, web development projects, and technical skills.",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Preahvihear&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/jpeg" href="/images/profile.png" />
      </head>
      <body className="bg-dark-bg text-text-primary antialiased selection:bg-purple-600 selection:text-white">
          <JsonLd />

        {children}
      </body>
    </html>
  );
}

