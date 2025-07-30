import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LoadingPage = ({ onComplete }) => {
    const [percentage, setPercentage] = useState(0);
    const loaderRef = useRef(null);
    const counterRef = useRef(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useGSAP(() => {
        let obj = { val: 0 };

        gsap.to(obj, {
            val: 100,
            duration: 5,
            ease: 'power3.out',
            onUpdate: () => {
                setPercentage(Math.round(obj.val));
            },
            onComplete: () => {
                // Scroll-up animation
                gsap.to(loaderRef.current, {
                    y: '-100%',
                    duration: 1,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        if (onComplete) onComplete();
                    }
                });
            }
        });
    }, []);

    return (
        <section
            ref={loaderRef}
            className="fixed inset-0 z-999999 flex flex-col justify-center border-b border-border dark:border-border-dark items-center bg-bg dark:bg-bg-dark text-text dark:text-text-dark font-bitcount text-4xl md:text-6xl"
        >
            <span ref={counterRef}>{percentage}%</span>
            <span className='!text-sm'>Loading...</span>
        </section>
    );
};

export default LoadingPage;
