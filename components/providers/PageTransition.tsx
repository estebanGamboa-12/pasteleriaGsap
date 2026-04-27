"use client";

import { AnimatePresence, motion } from "motion/react";
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
    gsap.delayedCall(0.06, () => ScrollTrigger.refresh(true));
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
        className="min-h-[calc(100vh-5rem)]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
