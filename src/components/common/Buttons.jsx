import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { NavLink } from "react-router-dom";

const variants = {
    ghost: "text-current hover:bg-current/10",
    primary: "bg-bg-dark/10 dark:bg-bg/10 hover:bg-bg-dark/20 hover:dark:bg-bg/20 !rounded-full border border-border dark:border-border-dark",
    white: "bg-bg dark:bg-bg/10",
    accent: 'bg-accent-dark dark:bg-accent text-text-dark !rounded-full',
    inverse: 'bg-primary-dark dark:bg-primary text-text-dark dark:text-text !rounded-full '
};

const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-xs md:text-sm lg:text-base px-4 py-2",
    lg: "text-base md:text-lg px-6 py-3",
};

const Button = ({
    children,
    to,
    icon,
    iconPosition = "left",
    variant = "ghost",
    size = "md",
    className = "",
    animateIcon = '',
    ...props
}) => {
    const hasText = !!children;

    useGSAP(() => {
        gsap.fromTo(
            "#text",
            { y: 10, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#text",
                    start: "top center",
                    toggleActions: "play none none none",
                },
            }
        );
    });

    const classes = `
        inline-flex items-center transition-all duration-300 cursor-pointer rounded-md  hover:!scale-105
        ${variants[variant]} ${sizes[size]} ${className}
        ${hasText ? "gap-2" : "justify-center w-10 h-10"} 
    `;

    const content = (
        <span className={classes} id="text">
            {icon && iconPosition === "left" && <span className={`icon ${animateIcon}`}>{icon}</span>}
            {hasText && <span>{children}</span>}
            {icon && iconPosition === "right" && <span className={`icon ${animateIcon}`}>{icon}</span>}
        </span>
    );

    return to ? (
        <NavLink to={to} {...props}>
            {content}
        </NavLink>
    ) : (
        <button {...props}>
            {content}
        </button>
    );
};

export default Button;
