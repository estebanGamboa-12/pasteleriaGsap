"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  strength?: number;
  "data-cursor-label"?: string;
};

export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  target,
  rel,
  strength = 0.35,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.6, ease: "power3.out" });
    gsap.to(innerRef.current, {
      x: x * 0.5,
      y: y * 0.5,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.to(innerRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const common = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    "data-cursor": "magnetic",
    "data-cursor-label": rest["data-cursor-label"] ?? "Click",
    className: cn(
      "relative inline-flex items-center justify-center will-change-transform",
      className
    ),
  } as const;

  const inner = (
    <span ref={innerRef} className="inline-flex items-center gap-2">
      {children}
    </span>
  );

  if (as === "a" && href) {
    return (
      <a {...common} href={href} target={target} rel={rel}>
        {inner}
      </a>
    );
  }
  return <button {...common}>{inner}</button>;
}
