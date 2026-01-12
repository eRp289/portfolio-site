import Hero from "@/components/Hero";
import AvailableBanner from "@/components/AvailableBanner";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccessibilityWidget from "@/components/AccessibilityWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-white" role="main">
        <Hero />
        <AvailableBanner />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <AccessibilityWidget />
    </>
  );
}
