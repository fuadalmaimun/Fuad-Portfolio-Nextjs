import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export function ContactSeoSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Fuad", 
    "url": "https://fuad-al-maimun.vercel.app", 
    "jobTitle": "Full Stack Developer",
    "sameAs": [
      "https://github.com/fuadalmaimun",
      "https://www.linkedin.com/in/fuad-al-maimun",
      "https://www.facebook.com/fuadalmaimun1"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@yourdomain.com",
      "contactType": "customer support"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#05020D] text-text-primary">
      <Navbar />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
