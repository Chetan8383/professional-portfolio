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
        // Fade & scale in
        gsap.from('.exp-card', {
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.exp-card',
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });

        // Smooth parallax lift
        gsap.utils.toArray('.exp-card').forEach((card, i) => {
            gsap.to(card, {
                y: -30,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5, // half-second smoothing
                },
            });
        });

        // Hover animation for buttons
        const buttons = document.querySelectorAll('.exp-btn');
        buttons.forEach((btn) => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, { scale: 1.08, duration: 0.25, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power2.inOut' });
            });
        });
    }, []);

    return (
        <div className="space-y-4 w-full">
            <h1 className="exp-card text-4xl text-text dark:text-text-dark mb-3 font-pacifico tracking-widest">
                Experience
            </h1>

            {experiences.map((exp, index) => (
                <div
                    key={index}
                    className="exp-card shadow-md flex flex-col md:flex-row justify-between items-start gap-2 md:items-center p-4 border border-border dark:border-border-dark rounded-xl"
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
