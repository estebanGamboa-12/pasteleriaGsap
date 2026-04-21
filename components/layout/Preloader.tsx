"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE } from "@/config/site";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const curtain = curtainRef.current;
    if (!container || !curtain) return;

    document.body.style.overflow = "hidden";

    const words = brandRef.current?.querySelectorAll(".pl-word > span");
    const counterObj = { value: 0 };

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = "";
        if (container) container.style.display = "none";
      },
    });

    if (tagRef.current) {
      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4 },
        0
      );
    }
    if (accentRef.current) {
      tl.fromTo(
        accentRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.5, ease: "back.out(2)" },
        0.05
      );
    }

    if (words) {
      tl.fromTo(
        words,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, stagger: 0.08 },
        0.1
      );
    }

    tl.to(
      counterObj,
      {
        value: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(
              Math.round(counterObj.value)
            ).padStart(3, "0");
          }
        },
      },
      0.15
    );

    tl.fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
      0.15
    );

    tl.to(
      [tagRef.current, counterRef.current, barRef.current, accentRef.current],
      {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      },
      "+=0.15"
    );
    if (words) {
      tl.to(
        words,
        {
          yPercent: -110,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.inOut",
        },
        "-=0.35"
      );
    }

    tl.to(
      curtain,
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "expo.inOut",
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  const words = SITE.name.split(" ");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-ink text-cream overflow-hidden"
        style={{ clipPath: "inset(0 0 0% 0)" }}
      >
        <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-3">
          <span
            ref={accentRef}
            className="inline-block w-2 h-2 rounded-full bg-gold origin-center"
            style={{ transform: "scale(0)" }}
          />
          <p
            ref={tagRef}
            className="text-[10px] uppercase tracking-[0.4em] text-cream/60"
          >
            {SITE.tagline}
          </p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            ref={brandRef}
            className="display text-[18vw] md:text-[13vw] leading-[0.9] text-center flex flex-wrap gap-x-6 justify-center"
          >
            {words.map((w, i) => (
              <span key={i} className="pl-word overflow-hidden inline-block">
                <span className="inline-block translate-y-full">
                  {i === words.length - 1 ? (
                    <em className="serif-italic text-gold">{w}</em>
                  ) : (
                    w
                  )}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-10 md:right-10 flex items-end justify-between">
          <div className="flex items-baseline gap-3">
            <span
              ref={counterRef}
              className="display text-4xl md:text-5xl text-cream tabular-nums"
            >
              000
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-cream/50">
              / 100
            </span>
          </div>
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.4em] text-cream/50">
            Buenos Aires · MMXXVI
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cream/10 overflow-hidden">
          <span
            ref={barRef}
            className="absolute inset-0 bg-gold origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
