import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Tooltip from "../components/common/Tooltip";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ThemeToggle = () => {
    const [dark, setDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme !== null) {
            return savedTheme === 'dark';
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);


    const switchRef = useRef(null);
    const sunRef = useRef(null);
    const moonRef = useRef(null)
    const switchContainerRef = useRef(null);

    // Initial load animation for switch from bottom-right
    useGSAP(() => {
        gsap.from(switchContainerRef.current, {
            opacity: 1,
            y: 50,
            x: 50,
            delay: 1,
            duration: 0.6,
            repeat: -1,
            yoyo: true,
            ease: "power3.out",
        });
    }, []);

    useGSAP(() => {
        document.documentElement.classList.toggle("dark", dark);

        // Animate toggle knob
        gsap.fromTo(
            switchRef.current,
            { y: dark ? -20 : 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );

        // Rotate icons
        gsap.fromTo(
            dark ? moonRef.current : sunRef.current,
            { rotate: -360, opacity: 0, },
            { rotate: 360, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
    }, [dark]);


    const handleToggle = () => {
        const toggleSound = new Audio("/sounds/toggle.mp3");
        toggleSound.play();
        setDark(!dark);
    };

    return (
        <label useRef={switchContainerRef} className="inline-flex flex-col items-center gap-2 cursor-pointer fixed right-5 bottom-5 z-999">
            <Sun ref={sunRef} className=" text-accent-dark dark:text-text-dark size-4" />
            <Tooltip text={dark ? 'Switch to LightMode' : 'Switch to darkMode'} position="left">

                <input
                    className="peer hidden"
                    id="toggle"
                    type="checkbox"
                    checked={dark}
                    onChange={handleToggle}
                />

                <div
                    ref={switchRef}
                    className="relative w-[27px] h-[63px] bg-bg-dark/10  peer-checked:bg-bg/10 rounded-full 
        after:absolute after:content-[''] after:w-[21px] after:h-[21px]
        peer-checked:after:from-bg-dark peer-checked:after:to-bg-dark
        after:rounded-full after:left-[3px] after:top-[3px] active:after:h-[24px]
        peer-checked:after:top-[60px] peer-checked:after:translate-y-[-100%]
        shadow-lg duration-300 after:duration-300 after:shadow-md after:bg-primary dark:after:bg-primary-dark"
                ></div>

            </Tooltip>
            <Moon ref={moonRef} className="text-text dark:text-accent size-4" />
        </label>
    );
};

export default ThemeToggle;
