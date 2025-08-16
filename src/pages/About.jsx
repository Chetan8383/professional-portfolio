import React from 'react';
import Experience from '../components/Experience';
import Skills from '../components/Skills';;
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ResumeCard from '../components/ResumeCard';
import SplitText from 'gsap/SplitText';

const About = () => {
  useGSAP(() => {
    gsap.to('#up-lift', {
      y: -40,
      ease: 'none',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '#up-lift',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // New SplitText animation for heading
    const split = new SplitText('#about-heading', { type: 'chars' });

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
        trigger: '#about-heading',
        start: 'top 80%',
        toggleActions: 'play none none none', // play once only
      },
    });
  }, []);


  return (
    <section className="p-4 py-10 space-y-10 ">
      <div className='text-center mb-10' id='up-lift'>
        <h1 id="about-heading" className="text-3xl md:text-5xl text-text dark:text-text-dark font-bitcount text-center">
          About Me
        </h1>

        <p className="text-center text-text-secondary dark:text-text-secondary-dark font-pacifico">
          I’m a passionate developer who loves building clean, functional, and user-friendly web applications.
        </p>
      </div>

      <Skills />
      <div className='flex flex-col md:flex-row gap-6 w-full'>
        <div className='w-full '>
          <Experience />
        </div>

        <div className='w-full md:max-w-1/3 '>
          <ResumeCard />
        </div>
      </div>
    </section>
  );
};

export default About;
