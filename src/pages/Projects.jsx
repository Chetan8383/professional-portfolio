import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronRight, Grip, Lightbulb, List } from 'lucide-react';
import Button from '../components/common/Buttons';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';
import ProjectModal from '../components/ProjectModal';

const projects = [
    {
        title: 'OtakuMart',
        used: 'ReactJs, TailwindCSS, Zustand, Cloudinary, ExpressJs, NodeJs',
        projImg: '/projects/otakumart.png',
        description: 'An anime and manga-themed e-commerce platform where users can browse, search, and purchase products with a smooth shopping experience.',
        url: 'https://otakumart.example.com'
    },
    {
        title: 'ChatterBox',
        used: 'ReactJs, Tailwind, Daisy UI, Lucide, Socket.io, Bcryptjs, Cloudinary, JWT, Mongoose, ExpressJs',
        projImg: '/projects/chatterbox.png',
        description: 'A real-time chat application supporting authentication, group chats, private messaging, and media uploads.',
        url: 'https://chatterbox.example.com'
    },
    {
        title: 'World Atlas',
        used: 'ReactJs, CSS',
        projImg: '/projects/world-Atlas.png',
        description: 'An interactive world atlas with country details, map visuals, and quick search features.',
        url: 'https://worldatlas.example.com'
    },
    {
        title: 'FestLive',
        used: 'HTML, CSS, Bootstrap, @mediaquery',
        projImg: '/projects/festival.png',
        description: 'A landing page for a cultural festival showcasing event details, schedules, and highlights.',
        url: 'https://festlive.example.com'
    },
    {
        title: 'Consultancy Site',
        used: 'HTML, CSS, Bootstrap, @mediaquery',
        projImg: '/projects/consaltansy.png',
        description: 'A responsive business consultancy website providing services overview and client testimonials.',
        url: 'https://consultancy.example.com'
    },
    {
        title: 'Lakshaya Computer Institute',
        used: 'HTML, CSS, Bootstrap, Swiperjs, AOS, Momento360',
        projImg: '/projects/lakshaya-CI.png',
        description: 'An educational institute website with interactive galleries, animated sections, and 360° views.',
        url: 'https://lakshaya-ci.example.com'
    },
    {
        title: 'PeakTrip',
        used: 'HTML, CSS, @mediaquery',
        projImg: '/projects/travel.png',
        description: 'A travel agency landing page featuring destinations, packages, and responsive design.',
        url: 'https://peaktrip.example.com'
    },
];


const Projects = () => {
    const imageRef = useRef(null);
    const [hoveredImg, setHoveredImg] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [projectView, setProjectView] = useState('grid');
    const [selectedProject, setSelectedProject] = useState(null);

    // ✅ Preload all images
    useEffect(() => {
        const cache = {};
        projects.forEach((project) => {
            const img = new Image();
            img.src = project.projImg;
            img.onload = () => {
                cache[project.projImg] = true;
                setLoadedImages({ ...cache });
            };
        });
    }, []);

    useGSAP(() => {
        gsap.utils.toArray("#project-card").forEach((img) => {
            gsap.fromTo("#container",
                { scale: 0.9 }, // 👈 start normal
                {
                    scale: 1,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: '#project-card',
                        start: "top 80%",   // when image enters viewport
                        end: "bottom 20%",  // until it leaves
                        scrub: true,        // 👈 makes it reverse on scroll up
                    },
                }
            );
        });

        gsap.utils.toArray(".zoom-img").forEach((img) => {
            gsap.fromTo(img,
                { scale: 1 }, // 👈 start normal
                {
                    scale: 1.015,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 80%",   // when image enters viewport
                        end: "bottom 20%",  // until it leaves
                        scrub: true,        // 👈 makes it reverse on scroll up
                    },
                }
            );
        });


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
    }, []);

    const handleMouseMove = (e) => {
        gsap.to(imageRef.current, {
            x: e.clientX + 20,
            y: e.clientY + 20,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseEnter = (imgUrl) => {
        setHoveredImg(imgUrl);
        gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, { opacity: 0, scale: 0.95, duration: 0.3 });
    };

    return (
        <div className="min-h-screen bg-bg dark:bg-bg-dark px-2 md:px-6 py-8 md:py-16 relative">
            <h1 id="heading" className="text-3xl md:text-5xl text-text dark:text-text-dark font-bitcount text-center ">
                Projects
            </h1>

            <div className="flex justify-end mb-6 px-2 md:px-6">
                <Button
                    variant="primary"
                    size='sm'
                    onClick={() => setProjectView(projectView === 'list' ? 'grid' : 'list')}
                    icon={projectView === 'list' ? <Grip className='size-5' /> : <List className='size-5' />}
                />
            </div>

            <div
                className={`grid ${projectView === 'grid' ? 'grid-cols-1 sm:grid-cols-2  gap-6 md:gap-10' : 'flex flex-col'} transition-all duration-500`}
                onMouseMove={handleMouseMove}
                id="container"
            >
                {projects.map((project, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => handleMouseEnter(project.projImg)}
                        onMouseLeave={handleMouseLeave}
                        id="project-card"
                        className={`w-full ${projectView === 'grid' ? 'flex flex-col items-start gap-2 ' : 'flex items-center border-gradient bg-transparent p-4'} justify-between rounded-xl relative group`}
                    >
                        {projectView === 'grid' && (
                            <div className="w-full h-60 md:h-80 lg:h-96 overflow-hidden rounded-3xl border border-border dark:border-border-dark">
                                <img
                                    src={project.projImg}
                                    alt={`${project.title} preview`}
                                    className="zoom-img w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className={`flex flex-col gap-2 z-10 ${projectView === 'grid' && 'px-4'}`}>
                            <h1 className="text-md md:text-xl ">{project.title}</h1>
                            {projectView === 'list' &&
                                <span className="text-xs md:text-sm text-accent dark:text-accent-dark">
                                    {project.used}
                                </span>}
                        </div>
                        <Button
                            className={`${projectView === 'grid' && 'mx-4'}`}
                            size='sm'
                            variant="primary"
                            icon={<Lightbulb className="size-4" />}
                            iconPosition="right"
                            onClick={() => setSelectedProject(project)} 
                        >
                            <span className={projectView === 'list' && 'hidden md:block'}>
                                Read More
                            </span>
                        </Button>
                    </div>
                ))}
            </div>

            {/* Floating Image Preview */}
            <div
                ref={imageRef}
                className="pointer-events-none fixed z-[999] opacity-0 scale-95 w-80 h-50 rounded-lg overflow-hidden shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
                style={{ top: 0, left: 0 }}
            >
                {hoveredImg && (
                    loadedImages[hoveredImg] ? (
                        <img
                            src={hoveredImg}
                            alt="project preview"
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                            <div className="loader border-4 border-t-transparent border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                        </div>
                    )
                )}
            </div>

            {/* Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />

        </div>
    );
};

export default Projects;
