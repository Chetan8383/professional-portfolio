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

    gsap.to('#up-lift', {
      y: -40, // move up
      ease: 'none',
      stagger: 0.15,

      scrollTrigger: {
        trigger: '#up-lift',
        start: 'top bottom',   // when bottom of viewport hits
        end: 'bottom top',     // when top of viewport leaves
        scrub: true,           // smooth follow
      }
    });

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
    <div
      id="up-lift"
      className="space-y-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8"
    >
      {/* LEFT SIDE - Skills Section */}
      <div className="flex-1">
        <div className="device-mock-up">
          <div className="relative mx-auto border-border dark:border-gray bg-bg dark:bg-bg-dark border-4 rounded-t-xl h-[172px] max-w-full md:h-[294px] md:max-w-[512px]">
            <div
              ref={boxRef}
              className="rounded-xl overflow-hidden h-[140px] md:h-[262px] relative"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h2 className="text-lg md:text-2xl select-none text-gray drop-shadow-lg">
                  What Crafts a Website
                </h2>
              </div>

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
                      className="w-10 md:w-12 h-10 md:h-12 object-contain p-1 dark:bg-bg bg-border rounded-full"
                    />
                  </Tooltip>
                </span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto bg-border dark:bg-gray rounded-b-xl h-4 max-w-full md:h-[42px] md:max-w-[512px]">
            <h1 className="text-sm md:text-2xl text-text dark:text-text-dark font-bitcount text-center">
              Skills
            </h1>
          </div>
          <div className="relative mx-auto bg-border dark:bg-gray rounded-b-xl h-10 max-w-[83px] md:h-20 md:max-w-[142px]"></div>
        </div>
      </div>

      {/* RIGHT SIDE - Your Custom Content */}
      <div className="flex-1 flex items-center justify-center">
        {/* Replace this with whatever you want */}
        <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg w-full h-full flex items-center justify-center">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            TODO
          </p>
        </div>
      </div>
    </div>
  );

};

export default Skills;
