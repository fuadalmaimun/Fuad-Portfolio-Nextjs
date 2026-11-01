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
    stateManagement: {
      summary:
        "A server-first architecture: Next.js App Router Server Components render article lists and pages, while client components are reserved for genuinely interactive pieces such as comments, search and the trending ticker. Category and pagination state live in the URL, making every news view shareable and cacheable.",
      highlights: [
        {
          title: "URL-driven filters",
          detail:
            "Category and page state sync to search params, giving the UI a single source of truth and making every news view bookmarkable.",
        },
        {
          title: "Incremental Static Regeneration",
          detail:
            "Article pages are statically generated and revalidated in the background, so breaking news appears quickly without a full rebuild.",
        },
        {
          title: "Session state via Better Auth",
          detail:
            "Editor sessions are handled by Better Auth with httpOnly cookies — only server-side role checks gate the admin UI, never localStorage.",
        },
        {
          title: "Targeted revalidation",
          detail:
            "Publishing or editing an article revalidates only the affected paths and tags, so the CDN never serves stale headlines.",
        },
      ],
    },
    backendArchitecture: {
      summary:
        "A single Next.js application on Vercel: route handlers and server actions sit directly on top of MongoDB, while Better Auth owns identity, sessions and editorial roles — no separate API server to deploy or keep in sync.",
      highlights: [
        {
          title: "MongoDB collections",
          detail:
            "Articles, categories, users and comments are modelled as collections with indexed slug and category fields for fast lookups.",
        },
        {
          title: "Route handlers & server actions",
          detail:
            "Public reads are served from cached route handlers; mutations run through server actions with validation before touching the database.",
        },
        {
          title: "Role-based authorization",
          detail:
            "Better Auth issues secure sessions and enforces reader-vs-editor permissions on every privileged operation, server-side.",
        },
        {
          title: "Editorial publishing pipeline",
          detail:
            "A draft-to-publish workflow triggers cache revalidation hooks so readers always see the latest version of a story.",
        },
      ],
    },
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
    stateManagement: {
      summary:
        "The Next.js App Router handles server-fetched destination data for fast first paint, while client components own the interactive booking flows. Authentication state is managed by Better Auth and stored in httpOnly cookies, so raw tokens never live in localStorage.",
      highlights: [
        {
          title: "Server-fetched destinations",
          detail:
            "Destination lists and detail pages fetch on the server with loading and error boundaries, keeping first paint fast and SEO-friendly.",
        },
        {
          title: "Cookie-based session state",
          detail:
            "Better Auth keeps session cookies httpOnly — the frontend reads user state from the session endpoint instead of parsing tokens itself.",
        },
        {
          title: "JWT for API authorization",
          detail:
            "Protected booking routes validate a signed JWT in Express middleware, so only authenticated callers can create or read bookings.",
        },
        {
          title: "Per-user booking views",
          detail:
            "Booking lists are filtered by the authenticated user id on the server, avoiding over-fetching and stale client-side caches.",
        },
      ],
    },
    backendArchitecture: {
      summary:
        "A standalone Express.js REST API with MongoDB, consumed by the Next.js frontend across a clear JSON contract — frontend and backend deploy independently and scale separately.",
      highlights: [
        {
          title: "REST resource endpoints",
          detail:
            "Destinations and bookings are exposed as consistent JSON resources with standard status codes and centralized error handling.",
        },
        {
          title: "JWT middleware",
          detail:
            "A verification step guards every mutating route; invalid or expired tokens are rejected before any database work happens.",
        },
        {
          title: "MongoDB persistence",
          detail:
            "Destinations and bookings are stored in MongoDB with reference integrity between a user and their booking records.",
        },
        {
          title: "CORS & environment configuration",
          detail:
            "An origin allow-list and env-driven config keep the API safe to run in development and production side by side.",
        },
      ],
    },
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
    stateManagement: {
      summary:
        "The complaint wizard is driven by a single useReducer that owns the current step, form data and validation errors, making the multi-step flow predictable and easy to reset. Ticket status uses optimistic updates plus polling so users see progress without refreshing.",
      highlights: [
        {
          title: "useReducer-driven wizard",
          detail:
            "Step navigation, field values and per-step validation errors all dispatch to one reducer — no tangled useState chains.",
        },
        {
          title: "Optimistic ticket tracking",
          detail:
            "Status milestones update immediately in the UI and reconcile with the server on the next poll, eliminating manual refreshes.",
        },
        {
          title: "Memoized dashboard filtering",
          detail:
            "Zone, urgency and date filters run through useMemo so large ticket lists re-render without frame drops.",
        },
        {
          title: "Controlled upload state",
          detail:
            "Photo previews and progress are tracked per field, keeping the form responsive even on low-bandwidth mobile connections.",
        },
      ],
    },
    backendArchitecture: {
      summary:
        "A REST API layer manages the full ticket lifecycle with role-based access for citizens and administrators, automated ticket ID generation, and paginated queries that keep dashboards fast as complaint volume grows.",
      highlights: [
        {
          title: "Ticket lifecycle endpoints",
          detail:
            "Create, read and transition-status endpoints enforce the Pending → In Progress → Resolved state machine on the server.",
        },
        {
          title: "Role-based authorization",
          detail:
            "Admin dashboards and triage actions are gated by role checks; citizens can only read their own tickets.",
        },
        {
          title: "Evidence photo uploads",
          detail:
            "Incident photos are accepted with size and type validation and stored separately from ticket metadata.",
        },
        {
          title: "Paginated, indexed queries",
          detail:
            "Admin listings paginate and filter by zone and date so dashboards stay responsive as data accumulates.",
        },
      ],
    },
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
    stateManagement: {
      summary:
        "Cart and session state live in React Context backed by useReducer, with a persistence layer that writes through to localStorage and re-hydrates across browser tabs. Search and filter values are treated as derived state, never duplicated copies.",
      highlights: [
        {
          title: "Context + useReducer cart",
          detail:
            "Add, remove and quantity changes dispatch to one reducer, so totals and item counts are always derived — never drift out of sync.",
        },
        {
          title: "Cross-tab persistence",
          detail:
            "Cart state serializes to localStorage on every change and re-hydrates from storage events, keeping multiple tabs consistent.",
        },
        {
          title: "Debounced derived filters",
          detail:
            "Search input is debounced and fed into memoized price/category filtering, avoiding re-render storms while typing.",
        },
        {
          title: "Router-driven navigation",
          detail:
            "React Router carries product and category state in the URL, so deep links restore the exact browsing context.",
        },
      ],
    },
    backendArchitecture: {
      summary:
        "A deliberately frontend-only build with a typed service layer that abstracts the product catalog, cart and checkout behind swappable adapters — mock data today, a real API tomorrow, without touching UI code.",
      highlights: [
        {
          title: "Service-layer abstraction",
          detail:
            "All catalog, cart and order reads go through one data module — components never call fetch or localStorage directly.",
        },
        {
          title: "Adapter-ready checkout",
          detail:
            "Order submission runs through an adapter interface designed for Stripe or SSLCommerz to drop in later.",
        },
        {
          title: "Versioned local persistence",
          detail:
            "localStorage acts as the temporary store with versioned keys, so schema changes can't crash returning visitors.",
        },
        {
          title: "API-shaped contracts",
          detail:
            "Types mirror a REST shape (entities, lists, errors), which makes wiring a real backend a drop-in change.",
        },
      ],
    },
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


