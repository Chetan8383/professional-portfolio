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

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ✅ Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1,          // smoothness (0 < lerp < 1)
      duration: 1.2,      // scroll duration in seconds
      smoothTouch: true,  // smooth on touch devices
    });

    // ✅ Tell ScrollTrigger to update on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // ✅ Create RAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // cleanup
    };
  }, []);

  return (
    isLoading ? (
      <LoadingPage onComplete={() => setIsLoading(false)} />
    ) : (
      <div className="min-h-screen relative bg-bg dark:bg-bg-dark text-text dark:text-text-dark font-poppins">
        <ThemeToggle />
        <Navbar />

        <div>
          <section id="Home">
            <Hero />
          </section>

          <section id="Projects">
            <Projects />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="Contact Me">
            <div>Contact Section</div>
          </section>
        </div>
      </div>
    )
  );
}

export default App;
