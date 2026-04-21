"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  trigger?: "self" | "none";
};

export function SplitReveal({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.07,
  duration = 0.9,
  trigger = "self",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll(".word > span");
    if (!words.length) return;

    gsap.set(words, { yPercent: 110 });

    const tween = gsap.to(words, {
      yPercent: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out",
      paused: true,
    });

    let st: ScrollTrigger | undefined;
    if (trigger === "self") {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        end: "bottom 12%",
        onEnter: () => tween.play(),
        onEnterBack: () => tween.play(),
        onLeave: () => tween.reverse(),
        onLeaveBack: () => tween.reverse(),
      });
    } else {
      tween.play();
    }

    return () => {
      st?.kill();
      tween.kill();
    };
  }, [children, delay, stagger, duration, trigger]);

  return (
    <Tag
      ref={ref as never}
      className={cn("display", className)}
      aria-label={children}
    >
      {children.split(" ").map((w, i) => (
        <span
          key={i}
          className="word inline-block overflow-hidden align-top mr-[0.25em]"
        >
          <span className="inline-block">{w}</span>
        </span>
      ))}
    </Tag>
  );
}
