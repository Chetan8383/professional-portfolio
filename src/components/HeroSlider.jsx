import { Globe, MoveUpRight } from 'lucide-react';
import React, { useState } from 'react';

const images = [
    'https://images.unsplash.com/photo-1683009686716-ac2096a5a73b?q=80&w=1170&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682688759157-57988e10ffa8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1753231445664-984412ff405b?q=80&w=1171&auto=format&fit=crop',
];

const HeroSlider = () => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => setSlide((prev) => (prev + 1) % images.length);

    return (
        <div className="bg-accent w-full h-90 rounded-3xl overflow-hidden relative">
            <img src={images[slide]} alt="hero" className="w-full h-full object-cover" />

            {/* globe icon */}
            <span className="absolute right-2 top-2 bg-bg dark:bg-bg-dark text-text dark:text-text-dark p-2 w-10 h-10 rounded-full flex items-center justify-center">
                <Globe className="size-5" />
            </span>

            {/* thumbnails + arrow */}
            <div className="absolute left-2 bottom-2 bg-bg dark:bg-bg-dark p-2 flex flex-col gap-2 duration rounded-3xl select-none">
                {images.map((src, i) => (
                    <span
                        key={i}
                        onClick={() => setSlide(i)}
                        className="cursor-pointer"
                    >
                        <img
                            src={src}
                            className={`w-10 h-10 rounded-full overflow-hidden duration-300 ${slide === i ? 'ring-2 ring-primary' : ''
                                }`}
                            alt={`thumb-${i}`}
                        />
                    </span>
                ))}

                {/* arrow to advance */}
                <span
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-primary cursor-pointer"
                >
                    <MoveUpRight className="text-text size-5" />
                </span>
            </div>
        </div>
    );
};

export default HeroSlider;
