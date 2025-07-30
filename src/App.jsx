import React, { useState } from 'react';
import ThemeToggle from "./theme/ThemeToggle";
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/ui/Navbar";
import About from "./pages/About";
import Hero from "./pages/Hero";
import Projects from "./pages/Projects";
import LoadingPage from "./pages/LoadingPage";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  
  return (isLoading ? <LoadingPage onComplete={() => setIsLoading(false)} /> :
    <div className="min-h-screen relative bg-bg dark:bg-bg-dark text-text dark:text-text-dark font-poppins">
      <ThemeToggle />
      <Navbar />


      <div>
        <Hero />
        <Projects />
        <About />
      </div>
    </div>
  );
}

export default App;
