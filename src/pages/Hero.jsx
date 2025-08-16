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
        const split = new SplitText("#typedCode", { type: "chars" });

        gsap.from(split.chars, {
            opacity: 0,
            duration: 0.05,
            stagger: 0.03,
            delay: '1',
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#codeScroll",
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, []);


    return (
        <section className="relative min-h-screen flex flex-col md:flex-row justify-evenly md:justify-center items-start lg:items-center gap-4 px-6 lg:px-20 overflow-hidden">
            {/* Background image */}
            <div
                ref={bgRef}
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center scale-100 z-0 transition-all duration-300
                bg-[url('/hero-bg.jpg')]
                dark:bg-[url('/hero-bg-dark.jpg')]
                "
            ></div>

            {/* Hero content */}
            <div className="relative z-10 w-full md:w-1/2 text-left">
                <p id="title" className="text-md text-text font-bold dark:text-text-dark mb-2">Hi, my name is Chetan Mehra</p>
                <h2 id="subtitle" className="text-2xl lg:text-4xl text-orange-600 dark:text-orange-400 mb-6 font-bitcount">
                    The best error message is the <br /> one that never shows up.
                </h2>
                <p id="subtitle" className="text-base lg:text-md text-text dark:text-text-dark  font-pacifico">
                    I build fast, scalable web apps with the MERN stack — clean code, great UI, and modern tech.
                </p>
            </div>


            <div className="w-full md:w-1/2 z-10 flex justify-end items-center">
                <pre
                    id="codeScroll"
                    className="bg-bg/10 dark:bg-bg-dark/10 backdrop-blur-md text-accent dark:text-accent-dark p-4 md:p-6 rounded-md text-xs md:text-sm  font-mono leading-loose max-w-md whitespace-pre-wrap"
                >
                    <code id="typedCode">
                        <div>
                            <span className="text-text dark:text-text-dark">const</span> <span className="text-orange-500">developer</span> = {'{'}
                        </div>
                        <div>
                            &nbsp;&nbsp;<span className="text-success dark:text-success-dark">name</span>: <span className="text-accent dark:text-accent-dark">"Chetan Mehra"</span>,
                        </div>
                        <div>
                            &nbsp;&nbsp;<span className="text-success dark:text-success-dark">stack</span>: <span className="text-accent dark:text-accent-dark">"MERN"</span>,
                        </div>
                        <div>
                            &nbsp;&nbsp;<span className="text-success dark:text-success-dark">passion</span>: <span className="text-accent dark:text-accent-dark">"Clean UI, Fast APIs"</span>,
                        </div>
                        <div>
                            &nbsp;&nbsp;<span className="text-success dark:text-success-dark">animate</span>: <span className="text-text dark:text-text-dark">() =&gt;</span>{" "}
                            <span className="text-accent dark:text-accent-dark">"GSAP on scroll"</span>
                        </div>
                        <div>{'};'}</div>
                    </code>
                </pre>

            </div>

        </section>
    );
};

export default Hero;
