import ThemeToggle from "./theme/ThemeToggle";
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import About from "./pages/About";


gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <div className="min-h-screen relative bg-bg dark:bg-bg-dark text-text dark:text-text-dark font-poppins ">
      <ThemeToggle />
      <Navbar />

      <div className="">
        <Hero />
        <About />
      </div>
      
    </div>
  );
}

export default App;
