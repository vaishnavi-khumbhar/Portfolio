// Every description below was written after reading the actual repository
// (README, package.json, routes, components and data files).
// `live` is only set where the owner supplied the URL herself. Everything else
// has no live button. `liveLabel` optionally renames the button.
const GH = "https://github.com/vaishnavi-khumbhar";

export const projects = [
  {
    id: "sara-infra",
    name: "Sara Infra Website",
    category: "Real-estate website",
    summary:
      "Marketing website for a Navi Mumbai residential developer, with a dedicated page for each of its three projects.",
    highlights: [
      "Home, About, Projects, Lifestyle and Contact pages plus one detail page per project",
      "Enquiry modal that opens a pre-filled WhatsApp message, or posts to a configurable endpoint",
      "Project walkthrough videos, galleries and amenity sections",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    image: "projects/sara.webp",
    alt: "Home page of the Sara Infra website showing a residential tower at dusk with the headline Building Homes. Building Families.",
    repo: `${GH}/sara-infra-website`,
    live: null,
  },
  {
    id: "rajmane-agro",
    name: "Rajmane Agro Products",
    category: "E-commerce storefront",
    summary:
      "TypeScript storefront for a jaggery brand with cart, wishlist, checkout and order tracking. Currently a frontend phase running on demo data.",
    highlights: [
      "Cart, wishlist, checkout, order tracking and login flows",
      "English, Marathi and Hindi interface with lazy-loaded routes",
      "Cart maths covered by unit tests; backend hand-off points documented",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    image: "projects/rajmane.webp",
    alt: "Rajmane Agro Products storefront home page with a promotional banner for jaggery products.",
    repo: `${GH}/rajmane-agro-products`,
    live: null,
    note: "Frontend phase, demo data",
  },
  {
    id: "shahain",
    name: "Shahain Outdoor Living",
    category: "Business website",
    summary:
      "Image-first marketing site for a Pune outdoor furniture and shade-solutions company, built around a data-driven product catalogue.",
    highlights: [
      "Five product categories: furniture, awnings, umbrellas, shade sails and tensile structures",
      "Projects, clients, solutions, journal and contact pages with a quote popup",
      "Content kept in data files so copy and products update without touching components",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    image: "projects/shahain.webp",
    alt: "Shahain Outdoor Living home page with a hero slider showing an awning-fitted building.",
    repo: `${GH}/Shahain-Outdoor-Living`,
    live: null,
  },
  {
    id: "abm",
    name: "Advertising & Branding Marketing",
    category: "Agency website",
    summary:
      "Website for a digital marketing and branding agency covering its services, case studies and enquiry flow.",
    highlights: [
      "Home, About, Services, Case Studies and Contact pages",
      "Hero slider, enquiry widget that opens WhatsApp, and a floating chat-assistant widget",
      "Service sections for digital marketing, branding, ads, social media, video and web development",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    image: "projects/abm.webp",
    alt: "Advertising Branding & Marketing home page with a website development hero slide.",
    repo: `${GH}/Advertising-Branding-Marketing`,
    live: null,
  },
  {
    id: "aadarsh-awning",
    name: "Aadarsh Awning Website",
    category: "Business website",
    summary:
      "Responsive website for an awning and shade-solutions business in Mumbai, with product pages and a quote enquiry flow.",
    highlights: [
      "Product listing and detail pages, gallery, approach and why-us pages",
      "Quote form that opens a pre-filled WhatsApp message",
      "Hero slider, per-page SEO hook and hosting redirect configs for Netlify and Vercel",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    image: "projects/aadarsh.webp",
    alt: "Aadarsh Awning home page showing blue and white striped awnings on a residential building.",
    repo: `${GH}/Aadarsh-Awning-website`,
    live: null,
  },
  {
    id: "mauli-mobile",
    name: "Mauli Mobile Wala",
    category: "Retail website",
    summary:
      "Website for a four-store mobile and electronics retailer, with product categories, store pages and a franchise page.",
    highlights: [
      "Home, About, Products, Our Stores, Franchise, Articles and Contact pages",
      "Quick-enquiry form with WhatsApp chat",
      "Animated hero slider, brand marquee and scroll progress indicator",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    image: "projects/mauli.webp",
    alt: "Mauli Mobile Wala home page with a customer being shown a smartphone in a store.",
    repo: `${GH}/mauli-mobile-wala`,
    live: null,
  },
  {
    id: "trinity-catering",
    name: "Trinity Catering",
    category: "Business website",
    summary:
      "Corporate catering website for a Pune caterer, focused on turning visitors into event enquiries.",
    highlights: [
      "Home, About, Services, Menu, Gallery and Contact pages",
      "Cuisine and menu preview sections",
      "Enquiry popup and WhatsApp quote CTA",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    image: "projects/trinity.webp",
    alt: "Trinity Catering home page with the headline Your Corporate Catering Partner, Not Just Your Caterer.",
    repo: `${GH}/Trinity-Catering`,
    live: null,
  },
  {
    id: "ma-safety",
    name: "M.A. Safety Website",
    category: "Full-stack (MERN)",
    summary:
      "Online safety-wear store with a shop, services pages, search, cart and sign-in, built with the MERN stack.",
    highlights: [
      "Shop, Services and Contact pages with product search and cart",
      "Sign-in with JWT authentication and role-based access",
      "Responsive interface backed by REST APIs",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST APIs"],
    image: "projects/masafety.webp",
    alt: "Home page of the M.A. Safety website with workers in hard hats and the headline Safety wear, clean safe for better tomorrow.",
    repo: null,
    live: "https://vaishnavi-khumbhar.github.io/M.A.-Safety-Website-/",
    note: "Live on GitHub Pages",
  },
  {
    id: "vrundavan-resort",
    name: "Vrundavan Resort",
    category: "Resort website",
    summary:
      "Website for Vrundavan Celebration & Resort at Mahapur, Latur: a riverside resort for agro tourism, picnics, adventure activities and celebrations.",
    highlights: [
      "Home, About, Services, Gallery and Contact pages",
      "Book Venue and Call Now actions, with a hero slideshow",
      "Covers family picnics, school trips, tent camping, swimming pool and wedding celebrations",
    ],
    tech: [],
    image: "projects/vrundavan.webp",
    alt: "Home page of the Vrundavan Celebration & Resort website with a night view of the riverside grounds and the headline VRUNDAVAN.",
    repo: null,
    live: "https://www.vrundavan-resort.co/",
    liveLabel: "Visit Website",
    note: "Live website",
  },
  {
    id: "priyankas-creation",
    name: "Priyanka's Creation",
    category: "Business website",
    summary:
      "Online storefront for Priyanka's Creation, a handmade-in-Pune business making personalised exam boards, photo frames, and kitchen and wedding creations.",
    highlights: [
      "Product catalogue with search and a Shop Collection page",
      "Order on WhatsApp and Chat With Us buttons",
      "Home, Products, About Us and Contact pages",
    ],
    tech: [],
    image: "projects/priyanka.webp",
    alt: "Home page of Priyanka's Creation with the headline Make Every Little Thing Special and a personalised photo frame.",
    repo: null,
    live: "https://vaishnavi-khumbhar.github.io/priyankas-creation/",
    note: "Live on GitHub Pages",
  },
  {
    id: "samarth-website",
    name: "Samarth Organic Store",
    category: "Business website",
    summary:
      "Online store for Samarth Organic, selling wood-pressed oils, natural honey, handmade soaps, jaggery products and pure Gir cow ghee.",
    highlights: [
      "Product catalogue with search, cart, wishlist and account icons",
      "Home, About Us, Products and Contact Us pages",
      "WhatsApp and call buttons for quick orders",
    ],
    tech: [],
    image: "projects/samarth.webp",
    alt: "Home page of Samarth Organic with the headline Premium Organic Natural Products For Healthy Living and bottles of cold-pressed oil.",
    repo: null,
    live: "https://www.samarthorganicstore.com/",
    liveLabel: "Visit Website",
    note: "Live website",
  },
  {
    id: "samarth-organic",
    name: "Samarth Organic Admin Panel",
    category: "Admin panel (PHP)",
    summary:
      "PHP and MySQL admin panel for managing a product catalogue and site content. Access is login-protected.",
    highlights: [
      "Product and category management with CRUD operations",
      "Banner and gallery management with image uploads",
      "Developed and tested locally on XAMPP",
    ],
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "XAMPP"],
    image: null,
    repo: null,
    live: "https://www.samarthorganicstore.com/samarth-backend/admin-panel/login.php",
    liveLabel: "Open Admin Login",
    note: "Login-protected admin panel",
    cover: { hue: 75, tagline: "Admin dashboard" },
  },
];