import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import InertiaPlugin from 'gsap/InertiaPlugin';
import Tooltip from './common/Tooltip';

gsap.registerPlugin(Draggable, InertiaPlugin);

const skills = [
  { name: 'React.js', img: '/skills/react.png' },
  { name: 'Tailwind CSS', img: '/skills/tailwind.png' },
  { name: 'MongoDB', img: '/skills/mongo-db.png' },
  { name: 'Express.js', img: '/skills/expressjs.png' },
  { name: 'BootStrap', img: '/skills/bootstrap.png' },
  { name: 'Node.js', img: '/skills/nodejs.png' },
  { name: 'jwt', img: '/skills/jwt.png' },
  { name: 'HTML', img: '/skills/html.png' },
  { name: 'CSS', img: '/skills/css.png' },
  { name: 'Javascript', img: '/skills/javascript.png' },
];

const Skills = () => {
  const boxRef = useRef(null);

  useGSAP(() => {
    const container = boxRef.current;
    const chips = Array.from(container.querySelectorAll('.skill-chip'));
    const padding = 8;

    // Initial random layout
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

    // Floating animation
    const floatChip = (chip) => {
      const randomX = `+=${gsap.utils.random(-30, 30)}`;
      const randomY = `+=${gsap.utils.random(-30, 30)}`;
      const randomRot = gsap.utils.random(-8, 8);

      gsap.to(chip, {
        x: randomX,
        y: randomY,
        rotation: randomRot,
        duration: gsap.utils.random(3, 6),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    };

    chips.forEach((chip) => {
      floatChip(chip);

      // Make them draggable
      Draggable.create(chip, {
        type: 'x,y',
        bounds: container,
        inertia: true,
        onPress() {
          gsap.killTweensOf(chip); // stop floating while dragging
          gsap.to(chip, { scale: 1.06, duration: 0.15 });
          gsap.set(chip, { zIndex: 9999 });
        },
        onRelease() {
          gsap.to(chip, { scale: 1, duration: 0.15 });
          floatChip(chip); // resume floating
        }
      });
    });

    // Re-apply bounds on resize
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
    <div className="p-2 md:p-4 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl text-text dark:text-text-dark font-bitcount">Skills</h1>

      <div
        ref={boxRef}
        className="relative h-64 rounded-xl border border-border dark:border-border-dark 
                   bg-bg dark:bg-bg-dark overflow-hidden shadow-md"
      >
        {skills.map((s, i) => (
          <span
            key={i}
            className="skill-chip absolute cursor-grab active:cursor-grabbing select-none 
                       text-white rounded-full text-sm font-medium shadow-md flex items-center gap-2"
          >
            <Tooltip text={s.name}>
              <img
                src={s.img}
                alt={s.name}
                className="w-15 h-15 object-contain p-1 dark:bg-bg bg-bg-dark rounded-full"
              />
            </Tooltip>
          </span>
        ))}
      </div>

      <div className='w-45 p-2'></div>
    </div>
  );
};

export default Skills;
