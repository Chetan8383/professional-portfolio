import React from 'react';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';

const About = () => {
  return (
    <section className="p-4 py-10 space-y-8">
      <div className='text-center mb-10'>
        <h1 className="text-3xl md:text-5xl text-text dark:text-text-dark font-bitcount text-center ">About Me</h1>
        <p className="text-center text-text-secondary dark:text-text-secondary-dark font-pacifico">
          I’m a passionate developer who loves building clean, functional, and user-friendly web applications.
        </p>
      </div>

      {/* Experience */}
      <Experience />

      {/* Skills */}
      <Skills />

      {/* Education */}
      <Education />
    </section>
  );
};

export default About;
