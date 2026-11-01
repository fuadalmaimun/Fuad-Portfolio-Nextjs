/**
 * Single source of truth for site-wide personal links and identity.
 * Keeping these in one place prevents drift between the hero, navbar,
 * contact section and footer.
 */

export const SITE = {
  name: "Fuad Al Maimun",
  role: "Full Stack Developer",
  email: "fuadmaymun0@gmail.com",
  phone: "+880 1300 725948",
  resume: {
    // Encoded so the path works in hrefs, downloads and iframes alike.
    url: "/Fuad%20Resume.pdf",
    downloadName: "Fuad_Al_Maimun_Resume.pdf",
  },
};

export const SOCIALS = {
  github: "https://github.com/fuadalmaimun",
  linkedin: "https://www.linkedin.com/in/fuad-al-maimun-97ba42399/",
  whatsapp:
    "https://api.whatsapp.com/send/?phone=%2B8801300725948&text&type=phone_number&app_absent=0",
  facebook: "https://www.facebook.com/fuad.fuadalmaimun",
};
