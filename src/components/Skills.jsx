import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import InertiaPlugin from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const skills = [
  { name: 'React.js', color: 'bg-blue-500' },
  { name: 'Tailwind CSS', color: 'bg-cyan-500' },
  { name: 'MongoDB', color: 'bg-green-600' },
  { name: 'Express.js', color: 'bg-gray-700' },
  { name: 'Node.js', color: 'bg-green-500' },
  { name: 'Formik', color: 'bg-purple-500' },
  { name: 'Yup', color: 'bg-pink-500' },
  { name: 'Zustand', color: 'bg-orange-500' },
];

const Skills = () => {
  const boxRef = useRef(null);

  useGSAP(() => {
    const container = boxRef.current;
    const chips = Array.from(container.querySelectorAll('.skill-chip'));
    const padding = 8;

    const layout = () => {
      const { width: cw, height: ch } = container.getBoundingClientRect();
      chips.forEach((chip, i) => {
        const bw = chip.offsetWidth;
        const bh = chip.offsetHeight;
        const maxX = cw - bw - padding * 2;
        const maxY = ch - bh - padding * 2;
        const x = gsap.utils.random(padding, maxX);
        const y = gsap.utils.random(padding, maxY);
        gsap.set(chip, { x, y, zIndex: i + 1 });
      });
    };

    layout();

    chips.forEach((chip) => {
      Draggable.create(chip, {
        type: 'x,y',
        bounds: container,
        inertia: true, // allows flinging
        onPress() {
          gsap.to(chip, { scale: 1.06, duration: 0.15 });
          gsap.set(chip, { zIndex: 9999 });
        },
        onRelease() {
          gsap.to(chip, { scale: 1, duration: 0.15 });
        }
      });
    });

    const ro = new ResizeObserver(() => {
      chips.forEach((chip) => {
        const drag = Draggable.get(chip);
        if (drag) drag.applyBounds(container);
      });
    });
    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-text dark:text-text-dark">Technology</h1>

      <div
        ref={boxRef}
        className="relative h-64 rounded-xl border border-border dark:border-border-dark 
                   bg-gray-50 dark:bg-gray-900 shadow-inner overflow-hidden"
      >
        {skills.map((s, i) => (
          <span
            key={i}
            className={`skill-chip absolute cursor-grab active:cursor-grabbing select-none 
                        ${s.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md`}
          >
            {s.name}
          </span>
        ))}
      </div>

      <p className="text-xs text-text-secondary dark:text-text-secondary-dark">
        Tip: grab a chip and fling it — it’ll float with momentum.
      </p>
    </div>
  );
};

export default Skills;
