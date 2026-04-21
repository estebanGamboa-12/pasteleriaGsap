"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState<string>("");
  const [variant, setVariant] = useState<"default" | "link" | "magnetic">(
    "default"
  );

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });
    const rxTo = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const ryTo = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [data-cursor], input, textarea, select"
      ) as HTMLElement | null;

      if (interactive) {
        const cursorHint = interactive.dataset.cursor;
        if (cursorHint === "magnetic") {
          setVariant("magnetic");
          setLabel(interactive.dataset.cursorLabel ?? "");
        } else {
          setVariant("link");
          setLabel(interactive.dataset.cursorLabel ?? "");
        }
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  useEffect(() => {
    if (!ringRef.current) return;
    const size =
      variant === "magnetic" ? 96 : variant === "link" ? 56 : 28;
    gsap.to(ringRef.current, {
      width: size,
      height: size,
      backgroundColor:
        variant === "magnetic"
          ? "rgba(201,168,106,0.18)"
          : variant === "link"
          ? "rgba(232,160,184,0.18)"
          : "rgba(43,31,26,0.0)",
      borderColor:
        variant === "default" ? "rgba(43,31,26,0.5)" : "rgba(43,31,26,0)",
      duration: 0.35,
      ease: "power3.out",
    });
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        opacity: label ? 1 : 0,
        duration: 0.25,
      });
    }
  }, [variant, label]);

  return (
    <>
      <div
        ref={ringRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[90] -translate-x-1/2 -translate-y-1/2",
          "rounded-full border mix-blend-difference",
          "hidden md:flex items-center justify-center"
        )}
        style={{ width: 28, height: 28 }}
      >
        <span
          ref={labelRef}
          className="text-[10px] uppercase tracking-[0.2em] text-ink font-medium opacity-0 whitespace-nowrap"
        >
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[91] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink hidden md:block"
        style={{ width: 6, height: 6 }}
      />
    </>
  );
}
