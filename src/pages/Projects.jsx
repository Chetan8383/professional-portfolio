import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronRight, Grip, List } from 'lucide-react';
import Button from '../components/common/Buttons';
import { useGSAP } from '@gsap/react';
import SplitText from 'gsap/SplitText';

const projects = [
    {
        title: 'OtakuMart',
        used: 'ReactJs, TailwindCSS, Zustand, cloudinary, ExpressJs, NodeJs',
        projImg:
            '/projects/otakumart.png',
    },
    {
        title: 'ChatterBox',
        used: 'ReactJs, Tailwind, Daisy UI, lucide, socket.io, bcryptjs, cloudinary, jsonwebtoken, Mongoose, ExpressJs',
        projImg:
            '/projects/chatterbox.png',
    },
    {
        title: 'World Artlas',
        used: 'ReactJs, CSS',
        projImg:
            '/projects/world-Atlas.png',
    },
    {
        title: 'FestLive',
        used: 'HTML, CSS, Bootstrap, @mediaquery',
        projImg:
            '/projects/festival.png',
    },
    {
        title: 'Consaltancy Site',
        used: 'HTML, CSS, Bootstrap, @mediaquery',
        projImg:
            '/projects/consaltansy.png',
    },
    {
        title: 'Lakshaya Computer Institute',
        used: 'HTML, CSS, Bootstrap, Swiperjs, AOS, Momento360',
        projImg:
            '/projects/lakshaya-CI.png',
    },
    {
        title: 'PeakTrip',
        used: 'HTML, CSS, @mediaquery',
        projImg:
            '/projects/travel.png',
    },
];

const Projects = () => {
    const imageRef = useRef(null);
    const [hoveredImg, setHoveredImg] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [projectView, setProjectView] = useState('grid');

    useGSAP(() => {
        gsap.from('#project-card', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: "#container",
                start: 'top 80%',
            }
        });
    }, []);

    const handleMouseMove = (e) => {
        const image = imageRef.current;

        gsap.to(image, {
            x: e.clientX + 20,
            y: e.clientY + 20,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseEnter = (imgUrl) => {
        setHoveredImg(imgUrl);
        setIsImageLoading(true);
        gsap.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
        });
    };

    useGSAP(() => {
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


    return (
        <div className="min-h-screen bg-bg dark:bg-bg-dark px-2 md:px-6 py-8 md:py-16 relative">
            <h1 id="heading" className="text-3xl md:text-5xl text-text dark:text-text-dark font-bitcount text-center mb-10">
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
                className={`grid ${projectView === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col'} transition-all duration-500`}
                onMouseMove={handleMouseMove}
                id="container"
            >
                {projects.map((project, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => handleMouseEnter(project.projImg)}
                        onMouseLeave={handleMouseLeave}
                        id="project-card"
                        className={`w-full ${projectView === 'grid' ? 'flex flex-col items-start gap-2 shadow-md border border-border dark:border-border-dark' : 'flex items-center border-gradient bg-transparent'} justify-between p-4  rounded-xl relative group`}
                    >
                        {projectView === 'grid' && (
                            <img
                                src={project.projImg}
                                alt={`${project.title} preview`}
                                className="w-full h-50 object-cover rounded-md"
                            />
                        )}
                        <div className="flex flex-col gap-2 z-10">
                            <h1 className="text-md md:text-2xl font-bitcount">{project.title}</h1>
                            <span className="text-xs md:text-sm text-accent dark:text-accent-dark">
                                {project.used}
                            </span>
                        </div>

                        <Button size='sm' icon={<ChevronRight className="size-5" />} iconPosition="right" variant="ghost">
                            <span className={projectView === 'list' && 'hidden md:block'}>Read More</span>
                        </Button>
                    </div>
                ))}
            </div>


            {/* Floating Image Preview */}
            <div
                ref={imageRef}
                className="pointer-events-none fixed z-[999] opacity-0 scale-95 w-60 h-50 rounded-lg overflow-hidden shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
                style={{ top: 0, left: 0 }}
            >
                {hoveredImg && (
                    <>
                        {isImageLoading && (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                <div className="loader border-4 border-t-transparent border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                            </div>
                        )}
                        <img
                            src={hoveredImg}
                            alt="project preview"
                            className={`object-cover w-full h-full transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setIsImageLoading(false)}
                        />
                    </>
                )}
            </div>

        </div>
    );
};

export default Projects;
