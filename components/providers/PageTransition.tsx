"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const variants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const delayed = gsap.delayedCall(0.06, () => {
      try {
        ScrollTrigger.refresh(true);
      } catch {
        // Evita romper el render de ruta si GSAP no esta listo.
      }
    });

    return () => {
      delayed.kill();
    };
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="initial"
      animate="enter"
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100vh-5rem)]"
    >
      {children}
    </motion.div>
  );
}
