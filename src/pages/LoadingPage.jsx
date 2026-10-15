import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const images = [
    '/projects/amit-kohli.png',
    '/projects/webversity.png',
    '/projects/otakumart.png',
];

const LoadingPage = ({ onComplete }) => {
    const loaderRef = useRef(null);
    const imagesRef = useRef([]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        document.documentElement.classList.toggle(
            'dark',
            savedTheme === 'dark'
        );
    }, []);

    useGSAP(() => {
        const imageElements = imagesRef.current.filter(Boolean);

        gsap.set(imageElements, { opacity: 0, scale: 1.05 });
        gsap.set(imageElements[0], { opacity: 1, scale: 1 });

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(loaderRef.current, {
                    scale: 0.08,
                    opacity: 0,
                    borderRadius: '24px',
                    duration: 0.8,
                    ease: 'power3.inOut',
                    onComplete: () => onComplete?.(),
                });
            },
        });

        // Image shuffle
        imageElements.forEach((img, i) => {
            if (i === 0) return;

            tl.to(
                imageElements[i - 1],
                {
                    opacity: 0,
                    scale: 1.05,
                    duration: 0.5,
                    ease: 'power2.inOut',
                }
            ).fromTo(
                img,
                { opacity: 0, scale: 1.05 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '<'
            );
        });
    }, { scope: loaderRef });

    return (
        <section
            ref={loaderRef}
            className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden bg-black text-white"
            style={{ transformOrigin: 'center center' }}
        >
            {images.map((src, i) => (
                <img
                    key={src}
                    ref={(el) => (imagesRef.current[i] = el)}
                    src={src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ))}

            <div className="absolute inset-0 bg-black/30" />
        </section>
    );
};

export default LoadingPage;