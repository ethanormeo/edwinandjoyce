import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import SignatureGallery from "@/components/SignatureGallery";
import CategoryShowcase from "@/components/CategoryShowcase";
import Studio from "@/components/Studio";
import Experience from "@/components/Experience";
import StatsBand from "@/components/StatsBand";
import Quote from "@/components/Quote";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <SignatureGallery />
        <CategoryShowcase />
        <Studio />
        <Experience />
        <StatsBand />
        <Quote />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
