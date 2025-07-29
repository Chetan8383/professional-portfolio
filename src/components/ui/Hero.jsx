import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const bgRef = useRef(null);

    useGSAP(() => {
        const heroSplit = new SplitText('#title', { type: 'chars, words' });
        const ParagraphSplit = new SplitText('#subtitle', { type: 'lines' });

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.6,
            ease: 'expo.out',
            stagger: 0.06
        })

        gsap.from(ParagraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.6,
            ease: 'expo.out',
            stagger: 0.6,
            delay: 1
        })
    }, [])

    useGSAP(() => {
        gsap.to(bgRef.current, {
            scale: 1.2,
            y: -100,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bgRef.current,
                start: "10% top",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    useGSAP(() => {
        gsap.from("#codeScroll", {
            x: 200,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#codeScroll",
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col lg:flex-row justify-center items-start lg:items-center gap-4 px-6 lg:px-20 overflow-hidden">
            {/* Background image */}
            <div
                ref={bgRef}
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center scale-100 z-0 transition-all duration-300
                bg-[url('https://plus.unsplash.com/premium_photo-1677622678379-115b35bf27e8?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
                dark:bg-[url('https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
                "
            ></div>

            {/* Hero content */}
            <div className="relative z-10 w-full md:w-1/2 text-center md:text-left">
                <p id="title" className="text-md text-text font-bold dark:text-text-dark mb-2">Hi, my name is Chetan Mehra</p>
                <h2 id="subtitle" className="text-2xl lg:text-4xl text-orange-600 dark:text-orange-400 mb-6 font-bitcount">
                    The best error message is the <br /> one that never shows up.
                </h2>
                <p id="subtitle" className="text-base lg:text-md text-text dark:text-text-dark  font-pacifico">
                    I build fast, scalable web apps with the MERN stack — clean code, great UI, and modern tech.
                </p>
            </div>


            <div className="w-1/2 z-10 flex justify-center items-center">
                <pre id="codeScroll" className="bg-black/70 text-green-400 p-6 rounded-md text-sm font-mono leading-loose max-w-md">
                    {`const developer = {
  name: "Chetan Mehra",
  stack: "MERN",
  passion: "Clean UI, Fast APIs",
  animate: () => "GSAP on scroll"
};`}
                </pre>
            </div>
        </section>
    );
};

export default Hero;
