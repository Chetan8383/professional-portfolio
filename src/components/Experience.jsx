import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const experiences = [
    { role: 'Frontend Developer', company: 'HNCyber Space', duration: 'Apr 2025 – Present' },
    { role: 'Web Developer Intern', company: 'OctaNet Services Pvt Ltd.', duration: 'Aug 2024' },
    { role: 'Front-End Developer', company: 'Skyscanner', duration: 'April 2024' },
    { role: 'Front End Developer', company: 'Moreton Bay', duration: 'May 2024' },
];

const Experience = () => {
    useGSAP(() => {
        // Animate heading
        const split = new SplitText('#heading', { type: 'chars' });
        gsap.from(split.chars, {
            opacity: 0,
            y: 50,
            scale: 0.8,
            rotateX: 45,
            transformOrigin: 'top center',
            ease: 'back.out(1.7)',
            stagger: 0.05,
            duration: 1.2,
            scrollTrigger: {
                trigger: '#heading',
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        // Animate cards
        // Initial fade + slide-in when appearing
        gsap.from('.exp-card', {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.exp-card',
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });

        // Uplift effect while scrolling
        gsap.to('.exp-card', {
            y: -40, // move up
            ease: 'none',
            stagger: 0.15,

            scrollTrigger: {
                trigger: '.exp-card',
                start: 'top bottom',   // when bottom of viewport hits
                end: 'bottom top',     // when top of viewport leaves
                scrub: true,           // smooth follow
            }
        });


        // Hover animation for buttons
        const buttons = document.querySelectorAll('.exp-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, { scale: 1.1, duration: 0.2, ease: 'power1.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power1.inOut' });
            });
        });
    }, []);

    return (
        <div className="p-4 space-y-4 max-w-4xl mx-auto">
            <h1 id="heading" className="text-2xl font-bold text-text dark:text-text-dark">
                Experience
            </h1>

            {experiences.map((exp, index) => (
                <div
                    key={index}
                    className="exp-card flex justify-between items-center p-4 border border-border dark:border-border-dark rounded-xl"
                >
                    <div>
                        <h1 className="text-text-secondary dark:text-text-secondary-dark font-bitcount">
                            {exp.company}
                        </h1>
                        <p className="text-text dark:text-text-dark">{exp.role}</p>
                    </div>
                    <button className="exp-btn bg-primary-dark dark:bg-primary text-text-dark dark:text-text px-4 py-2 text-xs rounded-full">
                        {exp.duration}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Experience;
