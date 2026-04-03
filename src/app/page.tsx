import ShaderBackground from "@/components/ShaderBackground";
import Nav from "@/components/Nav";
import ContactAside from "@/components/ContactAside";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";
import Introduction from "@/components/Introduction";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  return (
    <>
      <div className="grain-overlay fixed inset-0 z-[9999]" aria-hidden="true" />
      <ShaderBackground />
      <Nav />
      <ContactAside />
      <main className="max-w-[720px] mx-auto px-6 pt-32 pb-24">
        <Hero />
        <ProjectList />
        <Introduction />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
