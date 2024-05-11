import { useScroll, motion, MotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const text =
  'With a distinguished presence spanning over 5 years in the UAE Real Estate market, Dynasty Real Estate stands as a foremost brokerage firm in Dubai. Our esteemed standing is a testament to our unwavering dedication and the favorable results we consistently deliver to our clients, facilitated by a team of highly skilled, professional, and multilingual real estate agents. While initially excelling in the off-plan, resale, and rental sectors, Dynasty Real Estate has since evolved and broadened its scope.';

export const Para = () => {
  const elem = useRef();
  const { scrollYProgress } = useScroll({
    target: elem,
    offset: ['start .9', 'start .25'],
  });

  const words = text.split(' ');
  return (
    <motion.p
      className="revamp-font-compass text-[16px] text-black flex flex-wrap"
      ref={elem}
    >
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} start={start} end={end} progress={scrollYProgress}>
            {w}
          </Word>
        );
      })}
    </motion.p>
  );
};

const Word = ({ children, start, end, progress }) => {
  const characters = children.split('');
  const amount = end - start;
  const step = amount / children.length;
  return (
    <span className="mx-1 relative">
      {characters.map((c, i) => {
        const s = start + step * i;
        const e = start + step * (i + 1);
        return (
          <Char key={i} start={s} end={e} progress={progress}>
            {c}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({ children, start, end, progress }) => {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [0, 50]);
  const y = useTransform(progress, [start, end], [0, 500]);

  return (
    <span className="relative">
      <span className="absolute z-10 opacity-[.2]">{children}</span>
      <motion.span style={{ opacity, translateX: x, translateY: y }}>
        {children}
      </motion.span>
    </span>
  );
};
