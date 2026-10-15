import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Lightbulb, ExternalLink } from 'lucide-react';

import Button from '../components/common/Buttons';
import ProjectModal from '../components/ProjectModal';

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = [
    {
        title: 'Rebabi Collection',
        used: 'Shopify, Liquid, Rezorpay',
        projImg: '/projects/rebabi-collection.png',
        description: 'A modern e-commerce store featuring product collections and a smooth shopping experience.',
        url: 'https://rebabicollection.com/',
        year: "2026"
    },
    {
        title: 'Webversity',
        used: 'Next.js, ReactJS, Tailwind CSS v4, GSAP, Resend',
        projImg: '/projects/webversity.png',
        description: 'A modern web development agency website showcasing services, projects, and digital solutions with smooth animations and a responsive design.',
        url: 'https://webversity.in/',
        year: '2026',
    },
    {
        title: 'Amit Kohli',
        used: 'React.js, TailwindCSS, Gsap, Framer Motion',
        projImg: '/projects/amit-kohli.png',
        description: 'A creative artist portfolio showcasing Amit’s artwork, artistic style, and creative journey through an elegant, visually engaging, and responsive design.',
        url: 'https://amit-kohli.vercel.app/',
        year: "2026"
    },
    {
        title: 'MakeMyDraft',
        used: 'React.js, Tailwind CSS, Framer Motion, PHP',
        projImg: '/projects/makemydraft.png',
        description: 'A modern platform designed to simplify document creation with an intuitive interface, smooth animations, and a responsive user experience.',
        url: 'https://makemydraft.com/',
        year: '2025',
    },
    {
        title: 'OtakuMart',
        used: 'ReactJS, Tailwind CSS, Zustand, NodeJS, ExpressJS, MongoDB',
        projImg: '/projects/otakumart.png',
        description: 'An anime and manga-themed e-commerce platform where users can browse, search, and purchase products.',
        url: 'https://otakumart-frontend.vercel.app/',
        year: "2025"
    },
    {
        title: 'ChatterBox',
        used: 'ReactJS, Tailwind CSS, Socket.IO, JWT, ExpressJS',
        projImg: '/projects/chatterbox.png',
        description: 'A real-time chat application featuring authentication, private messaging, group chats, and media uploads.',
        url: 'https://chatterbox-rqxn.onrender.com/',
        year: "2024"
    },
    {
        title: 'Fraudo Frontend',
        used: 'ReactJS, Tailwind CSS, Formik, Yup, Recharts',
        projImg: '/projects/fraudo.png',
        description: 'A fraud detection and cyber threat intelligence interface with interactive data visualizations.',
        url: 'https://app.fraudo.io/',
        year: "2024"
    },
    {
        title: 'Consultancy Site',
        used: 'HTML, CSS, Bootstrap',
        projImg: '/projects/consaltansy.png',
        description: 'A responsive business consultancy website showcasing services and client testimonials.',
        url: 'https://chetan8383.github.io/Consultancy-site/',
        year: "2023"
    },
    {
        title: 'FestLive',
        used: 'HTML, CSS, Bootstrap',
        projImg: '/projects/festival.png',
        description: 'A cultural festival landing page highlighting event details, schedules, and activities.',
        url: 'https://chetan8383.github.io/FestLive/',
        year: "2023"
    },
    {
        title: 'Lakshaya Computer Institute',
        used: 'HTML, CSS, Bootstrap, SwiperJS, AOS',
        projImg: '/projects/lakshaya-CI.png',
        description: 'An educational institute website featuring interactive galleries, animations, and 360° views.',
        url: 'https://chetan8383.github.io/Lakshaya-CI/',
        year: "2023"
    },
];

const Projects = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    const [hoveredImg, setHoveredImg] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [selectedProject, setSelectedProject] = useState(null);

    useGSAP(() => {
        const split = new SplitText('.projects-heading', {
            type: 'chars',
        });

        gsap.from(split.chars, {
            opacity: 0,
            y: 35,
            rotateX: 45,
            stagger: 0.035,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.projects-heading',
                start: 'top 85%',
                once: true,
            },
        });

        gsap.from('.project-card', {
            opacity: 0,
            y: 35,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 85%',
                once: true,
            },
        });

        return () => split.revert();
    }, { scope: sectionRef });

    const handleMouseMove = (e) => {
        if (window.matchMedia('(hover: none)').matches) return;

        gsap.to(imageRef.current, {
            x: e.clientX + 20,
            y: e.clientY + 20,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
        });
    };

    const handleMouseEnter = (project) => {
        if (window.matchMedia('(hover: none)').matches) return;

        setHoveredImg(project.projImg);

        gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: 'power2.out',
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-bg px-4 py-12 text-text dark:bg-bg-dark dark:text-text-dark md:px-8 md:py-20"
        >
            <h1 className="projects-heading mb-10 text-center font-bitcount text-3xl md:mb-14 md:text-5xl">
                Projects
            </h1>

            <div
                className="projects-grid mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10"
                onMouseMove={handleMouseMove}
            >
                {projects.map((project) => (
                    <article
                        key={project.title}
                        className="project-card group flex min-w-0 flex-col gap-4"
                        onMouseEnter={() => handleMouseEnter(project)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-black/5 dark:border-border-dark">
                            <img
                                src={project.projImg}
                                alt={`${project.title} project preview`}
                                loading="lazy"
                                onLoad={() =>
                                    setLoadedImages((prev) => ({
                                        ...prev,
                                        [project.projImg]: true,
                                    }))
                                }
                                className="zoom-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />

                            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-md">
                                {project.year}
                            </span>

                            {project.url !== '#' && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit ${project.title}`}
                                    className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 hover:scale-110 group-hover:opacity-100"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <h2 className="text-lg font-semibold md:text-xl">
                                    {project.title}
                                </h2>
                                <p className="mt-1 line-clamp-2 text-sm text-text/60 dark:text-text-dark/60">
                                    {project.description}
                                </p>
                            </div>

                            <Button
                                size="sm"
                                variant="primary"
                                icon={<Lightbulb className="size-4" />}
                                iconPosition="right"
                                onClick={() => setSelectedProject(project)}
                            >
                                Details
                            </Button>
                        </div>
                    </article>
                ))}
            </div>

            {/* Floating image preview for desktop */}
            <div
                ref={imageRef}
                className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-48 w-72 origin-top-left overflow-hidden rounded-xl bg-bg opacity-0 shadow-2xl md:block"
            >
                {hoveredImg && (
                    loadedImages[hoveredImg] ? (
                        <img
                            src={hoveredImg}
                            alt="Project preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <div className="size-7 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        </div>
                    )
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default Projects;