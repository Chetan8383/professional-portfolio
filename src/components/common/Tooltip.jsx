import React, { useEffect, useRef } from 'react';
import gsap from "gsap";


const Tooltip = ({ children, text, position = "top", arrow = true }) => {
    const tooltipRef = useRef(null);

    const positionClasses = {
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2",
    };

    const arrowClasses = {
        top: "left-1/2 -translate-x-1/2 top-full border-t-bg-dark dark:border-t-bg",
        bottom: "left-1/2 -translate-x-1/2 bottom-full border-b-bg-dark dark:border-b-bg",
        left: "top-1/2 -translate-y-1/2 left-full border-l-bg-dark dark:border-l-bg",
        right: "top-1/2 -translate-y-1/2 right-full border-r-bg-dark dark:border-r-bg",
    };

    useEffect(() => {
        gsap.set(tooltipRef.current, { opacity: 0, y: 5 });
    }, []);

    const handleMouseEnter = () => {
        gsap.fromTo(tooltipRef.current, {
            opacity: 0,
            y: 5,
            duration: 0.1,
            zoom: 0,
        }, {
            opacity: 1,
            y: -5,
            zoom: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
        });
    };

    return (
        <div className="relative group inline-block cursor-pointer"
            onMouseEnter={handleMouseEnter}
        >
            {children}
            <div
                ref={tooltipRef}
                className={`absolute z-9999 hidden group-hover:block bg-bg-dark dark:bg-bg text-text-dark dark:text-text font-pacifico
          text-xs rounded px-2 py-1 shadow-md transition-opacity duration-200
          ${positionClasses[position]} max-w-[200px] break-words whitespace-normal`}
                style={{ pointerEvents: 'none' }}
            >
                {text}
                {arrow && (
                    <div
                        className={`absolute w-0 h-0 border-8 border-transparent ${arrowClasses[position]}`}
                    />
                )}
            </div>
        </div>
    );
};

export default Tooltip;
