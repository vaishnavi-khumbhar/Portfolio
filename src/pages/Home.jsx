import { motion } from "framer-motion";
import ScrollProgress from "../components/ScrollProgress.jsx";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Services from "../components/Services.jsx";
import CrmShowcase from "../components/CrmShowcase.jsx";
import Projects from "../components/Projects.jsx";
import Experience from "../components/Experience.jsx";
import Education from "../components/Education.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import CommandPalette from "../components/CommandPalette.jsx";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-chip focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <motion.main id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Services />
        <CrmShowcase />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </motion.main>
      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </>
  );
}