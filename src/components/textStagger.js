const { useEffect, useState, useRef } = require('react');
import gsap from 'gsap';
import SplitType from 'split-type';

export const StaggerText = ({ text, start, className, parent }) => {
  const [isLoaded, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && text) {
      const ourText = new SplitType('.stagger-text');
      const chars = ourText.chars;
      gsap.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.01,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: parent,
            start: start,
          },
        }
      );
    } else setIsLoading(true);
  }, [isLoaded, parent, start, text]);

  return <p className={className}>{text}</p>;
};

export const StaggerPara = ({ text, parent, start, className }) => {
  const [isLoaded, setIsLoading] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (ref.current && isLoaded && text && parent) {
      const ourPara = new SplitType(ref.current);
      gsap.fromTo(
        ourPara.lines,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.01,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: parent,
            start: start,
          },
        },
        0.5
      );
    } else setIsLoading(true);
  }, [isLoaded, parent, start, text]);

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
};
