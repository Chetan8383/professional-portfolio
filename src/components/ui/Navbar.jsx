import Tooltip from '../common/Tooltip';
import { Briefcase, House, NotebookTabs, Projector } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const list = [
    {
        title: 'Home',
        icon: <House className='size-4 lg:size-5 3xl:size-6' />,
    },
    {
        title: 'Projects',
        icon: <Projector className='size-4 lg:size-5 3xl:size-6' />,
    },
    {
        title: 'About',
        icon: <Briefcase className='size-4 lg:size-5 3xl:size-6' />,
    },
    {
        title: 'Contact Me',
        icon: <NotebookTabs className='size-4 lg:size-5 3xl:size-6' />,
    },
];

const Navbar = () => {
    const navRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(navRef.current, {
            scaleX: 0,
            opacity: 0,
            transformOrigin: 'center bottom',
        },
            {
                scaleX: 1,
                opacity: 1,
                delay: 0.6,
                duration: 0.6,
                ease: 'back.out(1.7)',
            }
        );
    }, []);

    const handleScroll = (title) => {
        const section = document.getElementById(title);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            ref={navRef}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-999999 backdrop-blur-lg text-text dark:text-text-dark p-1 rounded-full border border-border dark:border-border-dark origin-bottom scale-x-0"
        >
            <div className="flex gap-2 !text-center">
                {list.map((item, index) => (
                    <div onClick={() => handleScroll(item.title)}
                    key={index}
                        className="flex gap-2 cursor-pointer items-center whitespace-nowrap text-xs bg-primary dark:bg-primary-dark text-text dark:text-text-dark p-2 rounded-full hover:-translate-y-1 hover:scale-105 duration-200 ease-in-out">
                        {item.icon} 
                        <span className='hidden md:block'>{item.title}</span>
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
