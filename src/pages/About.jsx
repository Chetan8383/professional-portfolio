import React from 'react';
import Experience from '../components/Experience';
import Skills from '../components/Skills';;
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ResumeCard from '../components/ResumeCard';

const About = () => {
  useGSAP(() => {
    gsap.to('#up-lift', {
      y: -40, // move up
      ease: 'none',
      stagger: 0.15,

      scrollTrigger: {
        trigger: '#up-lift',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  })


  return (
    <section className="p-4 py-10 space-y-10">
      <div className='text-center mb-10' id='up-lift'>
        <h1 className="text-3xl md:text-5xl text-text dark:text-text-dark font-bitcount text-center ">About Me</h1>
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
