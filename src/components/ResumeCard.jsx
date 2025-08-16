import React from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Download, Github, Instagram, Linkedin } from 'lucide-react';
import Button from './common/Buttons';

const ResumeCard = () => {
    useGSAP(() => {
        gsap.to('#up-lift', {
            y: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: '#up-lift',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        gsap.fromTo('#resume-card',
            { x: 400 },   // start off-screen to right
            {
                opacity: 1,
                x: 0,
                ease: 'linear',
                scrollTrigger: {
                    trigger: '#resume-card',
                    start: 'top 90%',
                    end: 'bottom 90%',
                    scrub: true,
                }
            }
        );
    }, []);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div
            id="up-lift"
            className='overflow-hidden py-10'
        >
            <h1 className="text-3xl font-bold text-text dark:text-text-dark mb-4 font-pacifico">
                Resume
            </h1>

            <div id='resume-card' className="max-w-md mx-auto p-6 flex items-center flex-col gap-4 h-full rounded-2xl shadow-md bg-bg dark:bg-bg-dark border border-border dark:border-border-dark text-center">
                <img src="/avatar.jpg" className='rounded-full border border-border dark:border-border-dark overflow-hidden object-cover size-15' alt="" />

                <small className='text-text-secondary dark:text-text-secondary-dark font-light'>I’m a passionate MERN stack developer skilled in building responsive, user-friendly applications with Tailwind CSS. I leverage tools like Formik and Yup for smooth form handling and validation, turning complex ideas into clean, scalable solutions.</small>
                <div className="flex justify-center items-center gap-6 py-4  text-text dark:text-text-dark">
                    <a
                        href="https://github.com/Chetan8383"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform duration-300 hover:-translate-y-2 hover:scale-110 "
                    >
                        <Github className="size-6" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/chetan-mehra/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform duration-300  hover:-translate-y-2 hover:scale-110"
                    >
                        <Linkedin className="size-6" />
                    </a>

                    <a
                        href="https://www.instagram.com/_chetanmehra/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform duration-300 hover:-translate-y-2 hover:scale-110"
                    >
                        <Instagram className="size-6" />
                    </a>
                </div>

                <Button
                    variant='inverse'
                    className='font-bitcount'
                    size='md'
                    animateIcon='animate-bounce'
                    icon={<Download className='size-4' />}
                    onClick={handleDownload}
                >
                    Resume
                </Button>

            </div>
        </div>
    );
};

export default ResumeCard;
