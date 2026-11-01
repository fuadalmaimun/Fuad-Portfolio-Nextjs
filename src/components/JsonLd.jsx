export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://fuad-al-maimun.vercel.app/#person",
    name: "Fuad Al Maimun",
    url: "https://fuad-al-maimun.vercel.app",
    image: [
      "https://fuad-al-maimun.vercel.app/profile.png.jpeg",
      "https://fuad-al-maimun.vercel.app/images/Fuad2.png",
      "https://fuad-al-maimun.vercel.app/images/og-image.png",
    ],
    jobTitle: "Full Stack Developer",
    description:
      "Fuad Al Maimun is a Full Stack Developer from Bangladesh",
    sameAs: [
      "https://www.linkedin.com/in/fuad-al-maimun",
      "https://github.com/fuadalmaimun",
      "https://www.facebook.com/fuad.fuadalmaimun",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
