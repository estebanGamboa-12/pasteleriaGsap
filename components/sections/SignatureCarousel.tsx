"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/config/products";
import { formatPrice } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SignatureCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const items = PRODUCTS.filter((p) => p.signature || p.featured).slice(0, 6);

  const updateProgress = useCallback(() => {
    const rail = railRef.current;
    const bar = progressRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const ratio = max > 0 ? rail.scrollLeft / max : 0;
    if (bar) bar.style.transform = `scaleX(${ratio})`;
    setCanPrev(rail.scrollLeft > 4);
    setCanNext(rail.scrollLeft < max - 4);
  }, []);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 40 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: step * dir, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const section = sectionRef.current;
    if (!rail || !section) return;

    updateProgress();
    rail.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = rail.querySelectorAll("[data-card]");
      gsap.set(cards, { y: 60, opacity: 0 });

      const tween = gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => tween.play(),
        onEnterBack: () => tween.play(),
        onLeave: () => tween.reverse(),
        onLeaveBack: () => tween.reverse(),
      });
    });

    return () => {
      rail.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      mm.revert();
    };
  }, [updateProgress]);

  return (
    <section
      id="firma"
      ref={sectionRef}
      className="relative bg-cream-2 overflow-hidden"
    >
      <div className="px-6 md:px-10 pt-24 md:pt-32 pb-10 md:pb-14 flex items-end justify-between gap-6 max-w-[1800px] mx-auto">
        <div>
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-4">
            <span className="inline-block w-8 h-px bg-gold" />
            Piezas de firma
          </p>
          <h2 className="display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Los clásicos que
            <br />
            <em className="serif-italic text-rose-deep">nos hicieron famosos.</em>
          </h2>
        </div>
        <p className="hidden md:block serif-italic text-lg text-ink/60 max-w-xs">
          Cada pieza es horneada a mano en lotes pequeños. Deslizá para descubrirlas.
        </p>
      </div>

      <div className="relative pb-16 md:pb-24">
        <div
          ref={railRef}
          className="flex gap-6 md:gap-10 px-6 md:px-10 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 -mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingLeft: "1.5rem", scrollPaddingRight: "1.5rem" }}
        >
          {items.map((p, i) => (
            <Link
              href={`/producto/${p.slug}`}
              key={p.slug}
              data-card
              data-cursor="magnetic"
              data-cursor-label="Ver"
              className="group shrink-0 snap-start w-[75vw] sm:w-[45vw] md:w-[34vw] lg:w-[26vw] xl:w-[22vw]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ink/5">
                <Image
                  src={p.heroImage}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 26vw, (min-width: 768px) 34vw, 75vw"
                  className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.77,0,.175,1)] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-cream bg-ink/70 backdrop-blur px-3 h-7 inline-flex items-center rounded-full">
                    0{i + 1} / {items.length}
                  </span>
                </div>
              </div>
              <div className="pt-5 flex justify-between items-baseline gap-4">
                <div className="min-w-0">
                  <h3 className="display text-2xl md:text-3xl truncate">
                    {p.name}
                  </h3>
                  <p className="serif-italic text-ink/60 truncate">
                    {p.subtitle}
                  </p>
                </div>
                <p className="display text-lg md:text-xl shrink-0">
                  {formatPrice(p.basePrice)}
                </p>
              </div>
            </Link>
          ))}

          <div
            aria-hidden
            className="shrink-0 w-2 md:w-6"
          />
        </div>

        <div className="mx-auto max-w-[1800px] px-6 md:px-10 mt-4 md:mt-8 flex items-center gap-6">
          <div className="flex-1 h-px bg-ink/15 relative overflow-hidden">
            <span
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full origin-left bg-ink"
              style={{ transform: "scaleX(0)", transition: "transform 120ms linear" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              className="w-11 h-11 rounded-full border border-ink/20 text-ink flex items-center justify-center transition-all hover:bg-ink hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink"
              data-cursor="link"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              className="w-11 h-11 rounded-full border border-ink/20 text-ink flex items-center justify-center transition-all hover:bg-ink hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink"
              data-cursor="link"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
