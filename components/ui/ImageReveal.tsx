"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = Omit<ImageProps, "alt"> & {
  alt: string;
  className?: string;
  wrapperClassName?: string;
  parallax?: number;
};

export function ImageReveal({
  className,
  wrapperClassName,
  parallax = 0,
  alt,
  ...imageProps
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const mask = maskRef.current;
    const imgWrap = imgRef.current;
    if (!wrapper || !mask || !imgWrap) return;

    gsap.set(mask, { scaleX: 1, transformOrigin: "right center" });
    gsap.set(imgWrap, { scale: 1.2 });

    const tl = gsap.timeline({ paused: true });
    tl.to(mask, {
      scaleX: 0,
      duration: 1.2,
      ease: "expo.inOut",
    }).to(
      imgWrap,
      { scale: 1, duration: 1.4, ease: "expo.out" },
      "-=1.2"
    );

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top 88%",
      end: "bottom 12%",
      onEnter: () => tl.play(),
      onEnterBack: () => tl.play(),
      onLeave: () => tl.reverse(),
      onLeaveBack: () => tl.reverse(),
    });

    let parallaxTween: gsap.core.Tween | undefined;
    if (parallax !== 0) {
      parallaxTween = gsap.to(imgWrap, {
        yPercent: parallax,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      st.kill();
      tl.kill();
      parallaxTween?.kill();
    };
  }, [parallax]);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative overflow-hidden", wrapperClassName)}
    >
      <div ref={imgRef} className="relative w-full h-full">
        <Image
          {...imageProps}
          alt={alt}
          className={cn("object-cover", className)}
        />
      </div>
      <div
        ref={maskRef}
        className="absolute inset-0 bg-cream origin-right"
        aria-hidden
      />
    </div>
  );
}
