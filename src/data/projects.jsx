export const projectsData = [
{
    id: "1",
    title: "Bangla News 24",
    category: "Full Stack News Portal",
    description:
      "A modern, high-performance Bangla news portal delivering real-time news updates across diverse categories with clean editorial typography and seamless reader engagement.",
    detailedDescription:
      "Bangla News 24 is a comprehensive digital journalism platform built to provide fast, accessible, and up-to-the-minute news coverage for millions of Bengali readers. Features curated editorial desks, categorized news feeds, trending articles, rich multimedia embeds, and responsive typography optimized for readability.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Better Auth",
    ],
    image: "/images/news.png",
    githubUrl: "https://github.com/fuadalmaimun/bangla-news-24",
    liveUrl: "https://bd-news-24.vercel.app",
    role: "Full Stack Developer",
    status: "Production Ready",
    features: [
      "Dynamic category filtering (National, Politics, Sports, Tech, International)",
      "Server-side rendering (SSR) for ultra-fast load times and SEO optimization",
      "Robust editorial authentication and article management workflow",
      "Responsive, clean layout with high-contrast Bangla typography support",
      "Interactive reader comments, social sharing, and trending news tickers",
    ],
    challenges: [
      {
        title: "Optimizing Server-Side Rendering & Caching",
        detail:
          "Balancing up-to-the-second breaking news updates with fast page load times required implementing intelligent Next.js ISR (Incremental Static Regeneration) and cache invalidation strategies.",
      },
      {
        title: "Bangla Font Rendering & Typography Layouts",
        detail:
          "Ensuring consistent, legible rendering of complex Bengali script glyphs across various mobile devices and operating systems without causing layout shifts (CLS).",
      },
      {
        title: "Secure Editorial Authentication",
        detail:
          "Designing role-based authentication with Better Auth to safeguard the content publishing pipeline against unauthorized access.",
      },
    ],
    futurePlans: [
      "Integrate an AI-assisted article summarizer for quick bullet-point takeaways.",
      "Implement Web Push Notifications for urgent breaking news alerts.",
      "Add offline bookmarking and audio news narration (Text-to-Speech) for improved accessibility.",
      "Build a native mobile companion app using React Native.",
    ],
  },

  {
    id: "4",
    title: "Wanderlust",
    category: "Full Stack Travel & Booking Platform",
    description:
      "A modern travel booking platform that helps users explore destinations, discover travel packages, and manage their bookings through a responsive and user-friendly interface.",
    detailedDescription:
      "Wanderlust is a full-stack travel web application built with Next.js, Express.js, and MongoDB. It enables users to explore travel destinations, view destination details, authenticate securely, and manage personal bookings. Better Auth handles user authentication, while JWT-based authorization helps secure protected backend API routes.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "Better Auth",
      "JWT",
      "REST API",
    ],
    image: "/images/wanderlustBanner.jpg",
    githubUrl: "https://github.com/fuadalmaimun/wanderlust",
    liveUrl: "https://wanderlust-nine-theta-56.vercel.app/",
    role: "Full Stack Developer",
    status: "Live Project",
    features: [
      "Browse and explore travel destinations",
      "View destination details, prices, and travel durations",
      "Secure user authentication with Better Auth",
      "Create and manage travel bookings",
      "View personal bookings",
      "Express.js REST API integrated with MongoDB",
      "JWT-based authorization for protected backend routes",
      "Responsive interface for desktop and mobile devices",
    ],
    challenges: [
      {
        title: "Authentication and API Security",
        detail:
          "Integrating Better Auth with JWT-based authorization to protect backend API routes and authenticated booking operations.",
      },
      {
        title: "Dynamic Destination Data",
        detail:
          "Connecting the Next.js frontend with the Express.js backend and handling dynamic destination fetching and loading errors.",
      },
      {
        title: "Booking Management",
        detail:
          "Managing booking submissions and retrieving user-specific booking records through the backend API.",
      },
    ],
    futurePlans: [
      "Integrate online payment gateways for travel bookings",
      "Add destination search, filtering, and sorting",
      "Implement booking confirmation email notifications",
      "Add destination reviews and ratings",
    ],
  },

  {
    id: "2",
    title: "Power Complaint",
    category: "Public Utility & Service Platform",
    description:
      "A streamlined civic utility platform designed for citizens to report, track, and resolve electricity-related complaints with status monitoring and administrative dashboards.",
    detailedDescription:
      "Power Complaint simplifies the workflow between electricity consumers and service providers. Citizens can log power outages, damaged transformers, or billing discrepancies, attach supporting photos, and monitor ticket progression in real-time. Admins and field operators can assign, prioritize, and resolve issues efficiently.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "REST API",
    ],
    image: "/images/power.png",
    githubUrl: "https://github.com/fuadalmaimun/power-complaints",
    liveUrl: "https://power-complain.vercel.app/",
    role: "Frontend & Full Stack Developer",
    status: "Live Project",
    features: [
      "Step-by-step interactive complaint submission wizard with image uploads",
      "Real-time ticket tracking with status milestones (Pending, In Progress, Resolved)",
      "Role-based administration dashboard for prioritizing emergency power disruptions",
      "Automated ticket ID generation and SMS/Email notification stubs",
      "Filter complaints by geographical zone, urgency level, and incident date",
    ],
    challenges: [
      {
        title: "Real-time State Sync & Ticket Tracking",
        detail:
          "Ensuring users immediately observe status updates without manually refreshing the browser. Designed optimistic UI updates and polling mechanisms.",
      },
      {
        title: "Handling Complex Form Validation & File Uploads",
        detail:
          "Validating multi-step user submissions with geographic coordinates and incident photos while keeping the form lightweight for low-bandwidth mobile connections.",
      },
      {
        title: "Admin Dashboard Performance with Large Datasets",
        detail:
          "Filtering and categorizing high volumes of complaint entries without UI lag using client-side memoization and paginated queries.",
      },
    ],
    futurePlans: [
      "Integrate interactive GIS mapping (Leaflet/Mapbox) to visualize outage clusters on city maps.",
      "Add automated SMS alert triggers upon each stage of complaint resolution.",
      "Develop an automated AI triage system to detect duplicate complaint reports in the same neighborhood.",
    ],
  },

  {
    id: "3",
    title: "Urban Vibe E-Commerce",
    category: "Modern E-Commerce Solution",
    description:
      "A full-featured e-commerce platform offering modern product discovery, interactive cart & checkout systems, user authentication, and responsive shopping experiences.",
    detailedDescription:
      "Urban Vibe is a sleek, customer-centric retail web application crafted for effortless browsing and high conversion rates. Features lightning-fast product filtering by price and category, persistent shopping bag management, customer account authentication, and secure mock checkout flows.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Context API",
      "React Router",
    ],
    image: "/images/e-commarce.png",
    githubUrl: "https://github.com/fuadalmaimun/my-E-commarce-web",
    liveUrl: "https://device-store-fuad.netlify.app/",
    role: "Frontend Developer",
    status: "Live Demo",
    features: [
      "Dynamic product catalog with multi-facet filters (category, price range, rating)",
      "Persistent shopping cart with local storage synchronization and quantity adjustment",
      "User authentication with profile management and order history simulation",
      "Interactive product zoom, multi-image gallery preview, and stock alerts",
      "Mobile-optimized one-thumb checkout flow with coupon code validation",
    ],
    challenges: [
      {
        title: "Complex Cart State & LocalStorage Synchronization",
        detail:
          "Preventing race conditions between multiple tabs and handling cart item mutations seamlessly with React Context and localStorage persistence.",
      },
      {
        title: "Instant Multi-Filter Performance",
        detail:
          "Debouncing user search input and calculating composite price/category filters on client without frame drops or re-render lag.",
      },
      {
        title: "Responsive Checkout UI on Small Viewports",
        detail:
          "Designing a sticky cart drawer and summary breakdown that remains accessible and clutter-free on small mobile screens.",
      },
    ],
    futurePlans: [
      "Integrate Stripe & SSLCommerz payment gateways for live transactional processing.",
      "Add customer product reviews with photo uploads and verified buyer badges.",
      "Implement a wishlist feature with price drop notification emails.",
      "Build a vendor management portal for inventory tracking.",
    ],
  },
];
export const getProjectById = (id) => projectsData.find((p) => p.id === id);

  // {
  //   id: "4",
  //   title: "Bazar Dor BD",
  //   category: "Grocery & Commodity Price Tracker",
  //   description:
  //     "A community-focused commodity and daily grocery price tracking web app helping consumers compare prices, discover local market trends, and make informed shopping choices.",
  //   detailedDescription:
  //     "Bazar Dor BD addresses daily market price fluctuations by offering consumers transparent price comparisons across major essential commodities. Users can monitor price trends, search everyday staples, and locate affordable alternatives.",
  //   technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
  //   image: "/images/baza-dor.png",
  //   githubUrl: "https://github.com/fuadalmaimun/bazar-dor-a07",
  //   liveUrl: "https://bazar-dor-a07-seven.vercel.app",
  //   role: "Full Stack Developer",
  //   status: "Live Project",
  //   features: [
  //     "Real-time price index for daily grocery items (vegetables, rice, oil, meat)",
  //     "Interactive historical price trend charts for commodity tracking",
  //     "Search and filter by market locality and category",
  //     "Community crowd-sourced price submission and verification interface",
  //   ],
  //   challenges: [
  //     {
  //       title: "Dynamic Price Volatility Representation",
  //       detail:
  //         "Designing charts that clearly indicate daily price drops or surges without overwhelming non-technical consumers.",
  //     },
  //     {
  //       title: "Data Verification & Crowd-sourcing",
  //       detail:
  //         "Implementing moderation checks to prevent false price submissions from skewing market averages.",
  //     },
  //   ],
  //   futurePlans: [
  //     "Add localized price alerts via Telegram / WhatsApp bot.",
  //     "Integrate OCR price tag scanning using smartphone cameras.",
  //     "Expand coverage to district-level local markets across Bangladesh.",
  //   ],
  // },

  // {
  //   id: "5",
  //   title: "Dev Stack Task Manager",
  //   category: "Developer Productivity Suite",
  //   description:
  //     "A kanban-style productivity tool for developers and teams featuring drag-and-drop workflow boards, sprint analytics, and real-time task progression.",
  //   detailedDescription:
  //     "Dev Stack streamlines task management for developers by providing an intuitive kanban board, tag-based categorization, urgency flags, and progress metrics. Designed with clean keyboard shortcuts and smooth visual feedback.",
  //   technologies: ["React", "TypeScript", "Tailwind CSS", "Context API"],
  //   image: "/images/dev stack.png",
  //   githubUrl: "https://github.com/fuadalmaimun/dev-stack-assignment-5",
  //   liveUrl: "https://dev-stack-assignment-5.netlify.app/",
  //   role: "Frontend Developer",
  //   status: "Completed",
  //   features: [
  //     "Fluid drag-and-drop task movement across customizable swimlanes",
  //     "Priority badges, due-date countdowns, and completion metrics",
  //     "Tag-based task filtering and fuzzy search functionality",
  //     "Local storage data persistence and export/import options",
  //   ],
  //   challenges: [
  //     {
  //       title: "Accessible Drag-and-Drop Implementation",
  //       detail:
  //         "Ensuring smooth touch interactions on mobile devices alongside pointer drag events on desktop browsers.",
  //     },
  //     {
  //       title: "State Persistence Without Data Loss",
  //       detail:
  //         "Managing serialized state updates so user reordering is instantly saved without lag.",
  //     },
  //   ],
  //   futurePlans: [
  //     "Add collaborative real-time team boards using WebSockets.",
  //     "Integrate GitHub issue synchronization to import issues directly into tasks.",
  //     "Introduce time-tracking pomodoro timers for individual tasks.",
  //   ],
  // },

  // {
  //   id: "6",
  //   title: "BPL Dream 11 Fantasy Squad",
  //   category: "Sports & Gaming Web Application",
  //   description:
  //     "An interactive cricket fantasy squad selector for the Bangladesh Premier League featuring credit cap limits, player analytics, and live team balance checks.",
  //   detailedDescription:
  //     "BPL Dream 11 lets cricket lovers assemble their dream BPL match squad within realistic salary caps. Offers player performance metrics, role quotas (batsmen, bowlers, all-rounders), and interactive balance calculators.",
  //   technologies: ["React", "DaisyUI", "Tailwind CSS", "JavaScript"],
  //   image: "/images/bpl-dream.png",
  //   githubUrl: "https://github.com/fuadalmaimun/ai-image-gen",
  //   liveUrl: "https://bangladesh-national-team.netlify.app/",
  //   role: "Frontend Developer",
  //   status: "Live Project",
  //   features: [
  //     "Real-time budget / credit calculation with dynamic balance counters",
  //     "Role-based player quotas (Batsmen, Bowlers, Wicketkeepers, All-rounders)",
  //     "Interactive card selection with animated notifications upon squad actions",
  //     "Squad review drawer with visual team composition breakdown",
  //   ],
  //   challenges: [
  //     {
  //       title: "Dynamic Constraints & Validation Logic",
  //       detail:
  //         "Enforcing multi-condition squad constraints (max 6 players, player credits <= budget, role balances) with instant user feedback.",
  //     },
  //     {
  //       title: "Responsive Card Grid with Rich Player Stats",
  //       detail:
  //         "Fitting player portraits, country flags, stats, and selection buttons into compact cards across all phone sizes.",
  //     },
  //   ],
  //   futurePlans: [
  //     "Integrate live ball-by-ball score APIs for in-match fantasy scoring.",
  //     "Add multiplayer leaderboards and private leagues for friends.",
  //   ],
  // },


