import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { NavLink } from "react-router-dom";

const variants = {
    ghost: "text-current hover:bg-current/10  ",
};


const sizes = {
  sm: "text-sm px-3 py-1.5",
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
    ...props
}) => {

    useGSAP(() => {
        gsap.fromTo("#text",
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
    })


    const classes = `
    inline-flex items-center gap-2 transition-all duration-200  cursor-pointer 
    rounded-md ${variants[variant]} ${sizes[size]} ${className}
  `;

    const content = (
        <span className={classes} id="text">
            {icon && iconPosition === "left" && <span className="icon">{icon}</span>}
            <span >
                {children}
            </span>
            {icon && iconPosition === "right" && <span className="icon">{icon}</span>}
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
