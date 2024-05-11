import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  image,
  icon,
}) => {
  return (
    <div
      className={cn(
        'row-span-1 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-[#13131a] border border-transparent justify-between flex flex-col space-y-4 cursor-pointer',
        className
      )}
    >
      <figure className="relative w-[100%] h-[70%]">
        <Image src={image} fill sizes="100%" alt="" />
      </figure>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};

export const HoverEffect = ({items, className}) => {
  let [hoveredIndex, setHoveredIndex] = useState();

  return (
    <div
      className={cn(
        'grid grid-cols-2  py-10',
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[var(--bg2)] block  rounded-sm"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.para}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        'rounded-sm h-full w-full p-4 overflow-hidden bg-offwhite border group-hover:border-slate-400 relative z-20',
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({className, children}) => {
  return (
    <h4 className={cn('text-black revamp-font font-bold tracking-wide mt-4', className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({className, children}) => {
  return (
    <p
      className={cn(
        'mt-8 text-black tracking-wide leading-relaxed text-sm revamp-font-titi',
        className
      )}
    >
      {children}
    </p>
  );
};
