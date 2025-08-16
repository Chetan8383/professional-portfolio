import React, { useState, useEffect } from 'react';
import ThemeToggle from "./theme/ThemeToggle";
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import Lenis from 'lenis'; // ✅ Import Lenis
import Navbar from "./components/ui/Navbar";
import About from "./pages/About";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";
import LoadingPage from "./pages/LoadingPage";
import Contact from './pages/Contact';
import CopyRight from './components/CopyRight';
import { Toaster } from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.5,
      duration: 1.2,
      smoothTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    isLoading ? (
      <LoadingPage onComplete={() => setIsLoading(false)} />
    ) : (
      <div className="min-h-screen relative bg-bg dark:bg-bg-dark text-text dark:text-text-dark font-poppins">
        <Toaster/>
        <ThemeToggle />
        <Navbar />

        <div>
          <section id="Home">
            <Hero />
          </section>

          <section id="Projects">
            <Projects />
          </section>

          <section id="About">
            <About />
          </section>

          <section id="Contact Me">
            <Contact />
          </section>
        </div>

        <CopyRight />
      </div>
    )
  );
}

export default App;
