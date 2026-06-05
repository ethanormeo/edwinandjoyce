import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import CategoryShowcase from "@/components/CategoryShowcase";
import SignatureGallery from "@/components/SignatureGallery";
import Experience from "@/components/Experience";
import Studio from "@/components/Studio";
import StatsBand from "@/components/StatsBand";
import Quote from "@/components/Quote";
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
        <CategoryShowcase />
        <SignatureGallery />
        <Experience />
        <Studio />
        <StatsBand />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
