import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import GithubStats from "@/components/GithubStats";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black dark:bg-black">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <GithubStats />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
