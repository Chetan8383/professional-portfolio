import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Contact = () => {
    const bgRef = useRef(null);
    const formRef = useRef(null);

    useGSAP(() => {
        // Background floating animation
        gsap.to(bgRef.current.querySelectorAll('.bg-shape'), {
            y: '+=30',
            x: '+=30',
            rotation: 360,
            duration: 20,
            ease: 'none',
            repeat: -1,
            yoyo: true,
            stagger: 0.5
        });

        // Form fade/slide in
        gsap.from(formRef.current.children, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15
        });
    }, []);

    return (
        <div className="
      relative min-h-screen flex items-center justify-center overflow-hidden
      text-text dark:text-text-dark
    ">
            {/* Animated Background */}
            <div ref={bgRef} className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-shape absolute rounded-full opacity-20 blur-2xl"
                        style={{
                            width: `${gsap.utils.random(150, 300)}px`,
                            height: `${gsap.utils.random(150, 300)}px`,
                            background: `hsl(${gsap.utils.random(180, 320)}, 70%, 50%)`,
                            top: `${gsap.utils.random(-100, window.innerHeight)}px`,
                            left: `${gsap.utils.random(-100, window.innerWidth)}px`,
                        }}
                    />
                ))}
            </div>

            {/* Contact Form */}
            <div className="
        relative z-10 w-full max-w-lg p-8 rounded-xl shadow-lg
        bg-white/10 backdrop-blur-lg text-white
        dark:bg-black/20
      ">
                <h2 className="text-3xl  mb-6 text-center font-bitcount">Contact Me</h2>
                <form ref={formRef} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-text dark:text-text-dark">Name</label>
                        <input
                            type="text"
                            className="
                w-full px-4 py-2 rounded-lg
                bg-white/20 text-white placeholder-white/60
                focus:outline-none focus:ring-2 focus:ring-purple-400
                dark:bg-gray-800/50 dark:placeholder-gray-400
              "
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-text dark:text-text-dark">Email</label>
                        <input
                            type="email"
                            className="
                w-full px-4 py-2 rounded-lg
                bg-white/20 text-white placeholder-white/60
                focus:outline-none focus:ring-2 focus:ring-purple-400
                dark:bg-gray-800/50 dark:placeholder-gray-400
              "
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-text dark:text-text-dark">Message</label>
                        <textarea
                            rows="4"
                            className="
                w-full px-4 py-2 rounded-lg
                bg-white/20 text-white placeholder-white/60
                focus:outline-none focus:ring-2 focus:ring-purple-400
                dark:bg-gray-800/50 dark:placeholder-gray-400
              "
                            placeholder="Your message..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="
              w-full py-2 px-4 rounded-lg font-semibold text-text dark:text-text-dark transition
              bg-purple-500 hover:bg-purple-600
              dark:bg-purple-600 dark:hover:bg-purple-700
            "
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
