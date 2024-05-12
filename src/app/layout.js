'use client';
import './globals.css';
import ReactLenis from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, MotionPathPlugin);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactLenis
          root
          options={{ lerp: 0.04, duration: 0.05, syncTouch: true }}
        >
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}