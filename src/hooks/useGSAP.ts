
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAP = () => {
  const ctx = useRef<gsap.Context>();

  useEffect(() => {
    ctx.current = gsap.context(() => {});
    return () => ctx.current?.revert();
  }, []);

  return ctx.current;
};

export const fadeIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element, 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, delay, ease: "power2.out" }
  );
};

export const slideUp = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: "power3.out" }
  );
};

export const scaleIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(element,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, delay, ease: "back.out(1.7)" }
  );
};

export const staggerAnimation = (elements: string, delay: number = 0.1) => {
  return gsap.fromTo(elements,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.6, stagger: delay, ease: "power2.out" }
  );
};
