'use client';
import './globals.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import { Footer } from './page';
import Navbar from '../components/navbar';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin, MotionPathPlugin);
ScrollTrigger.addEventListener('refresh', function () {
  if (document.body.getAttribute('style') === '') {
    document.body.removeAttribute('style');
  }
});
export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // supabase.auth.onAuthStateChange((event, auth) => {
    //   if (event === 'SIGNED_IN') {
    //     router.push('/admin/list');
    //   } else {
    //     router.push('/admin');
    //   }
    // });
  }, [router]);

  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
