// src/components/ProjectModal.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, CircleArrowOutUpRight, X } from "lucide-react";
import Button from "./common/Buttons";

const ProjectModal = ({ project, onClose }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
            // Animate overlay and modal in
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );

            gsap.fromTo(
                modalRef.current,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [project]);

    if (!project) return null;

    const handleClose = () => {
        // Animate out before closing
        gsap.to(modalRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            ease: "power2.in",
            onComplete: onClose,
        });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
        });
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-999999"
        >
            <div
                ref={modalRef}
                className="relative bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full p-2 shadow-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute -top-8 right-0 text-text-dark dark:text-text-dark hover:text-text dark:hover:text-text-dark cursor-pointer"
                >
                    <X className="size-6" />
                </button>

                {/* Modal Content */}
                <img
                    src={project.projImg}
                    alt={project.title}
                    className="w-full h-fit object-cover rounded-lg border border-border dark:border-border-dark"
                />
                <div className="p-2">
                    <h2 className="text-2xl font-semibold font-bitcount text-accent">{project.title}</h2>
                    <p className="text-xs md:text-sm text-text dark:text-text-dark ">
                        <span className="font-semibold text-accent">Technologies:</span> {project.used}
                    </p>
                    <p className="text-xs md:text-sm">
                        <span className="font-semibold text-accent">Description:</span> {project.description}
                    </p>

                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            className="mt-4 !font-light"
                            size="sm"
                            variant="inverse"
                            icon={<CircleArrowOutUpRight className="size-4" />}
                            iconPosition="right"
                            animateIcon="animate-pulse"
                        >
                            Visit Site
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
