import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  { degree: "Bachelor of Computer Applications", duration: '2023 - Pursuing', university: 'IGNOU DELHI RC-1' },
  { degree: 'Diploma In Web Development', duration: '2022 - 2024', university: 'Lakshaya Computer Institute' },
  { degree: "High School", duration: 'Complete - 2023', university: 'kendriya vidyalaya No. - 4' },
];

const Education = () => {
  useGSAP(() => {
    gsap.utils.toArray('#education-card').forEach((card) => {
      gsap.from(card, {
        x: 200,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        }
      });
    });
  }, []);

  return (
    <section className="space-y-4 overflow-hidden py-3" id="education-section">
      <h2 className="text-4xl font-bold font-pacifico tracking-widest">Education</h2>

      {education.map((ed, index) => (
        <div
          key={index}
          id="education-card"
          className="bg-bg dark:bg-bg-dark border border-border dark:border-border-dark p-4 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold">{ed.degree}</h3>
          <p>{ed.university}</p>
          <small className="font-bitcount">{ed.duration}</small>
        </div>
      ))}
    </section>
  );
};

export default Education;
