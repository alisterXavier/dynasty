'use client';
import './globals.css';
import ReactLenis from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Footer, Navbar } from './page';

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, MotionPathPlugin);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactLenis
          root
          options={{ lerp: 0.4, duration: 0.05, syncTouch: true }}
        >
          <Navbar />
          {children}
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
