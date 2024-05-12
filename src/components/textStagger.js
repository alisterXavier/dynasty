const { useEffect, useState } = require('react');
import gsap from 'gsap';
import SplitType from 'split-type';

export const StaggerText = ({ children }) => {
  const [isLoaded, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLoaded) {
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
            trigger: '.abt-section',
            start: '60% bottom',
          },
        }
      );
    }
    setIsLoading(true);
  }, [isLoaded]);

  return children;
};
export const StaggerPara = ({ children }) => {
  const [isLoaded, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLoaded) {
      const ourPara = new SplitType('.stagger-para');
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
            trigger: '.abt-section',
            start: '60% bottom',
          },
        },
        0.5
      );
    }
    setIsLoading(true);
  }, [isLoaded]);

  return children;
};
