"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const image = imageRef.current;
    if (!section || !title || !image) return;

    const words = title.querySelectorAll<HTMLSpanElement>(".hero-word > span");
    const preloaded =
      typeof window !== "undefined" &&
      sessionStorage.getItem("demo:preloaded") === "1";

    gsap.set(words, { yPercent: 110 });
    gsap.set([".hero-eyebrow", ".hero-sub", ".hero-cta"], { opacity: 0, y: 16 });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(words, { yPercent: 0 });
      gsap.set([".hero-eyebrow", ".hero-sub", ".hero-cta"], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const tl = gsap.timeline({ delay: preloaded ? 0.1 : 0.9 });
    tl.to(
      words,
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      },
      0
    );
    tl.to(
      ".hero-eyebrow",
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.7"
    );
    tl.to(
      ".hero-sub",
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );
    tl.to(
      ".hero-cta",
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      "-=0.5"
    );

    const parallax = gsap.to(image, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
    };
  }, []);

  const headline = ["Dulces", "que", "despiertan", "recuerdos."];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-32 pb-16 paper-grain"
    >
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-rose-soft/60 blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-gold/15 blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-7 pt-10 md:pt-24 relative z-10">
          <p className="hero-eyebrow flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-8 opacity-0">
            <span className="inline-block w-8 h-px bg-gold" />
            {SITE.tagline}
          </p>

          <h1
            ref={titleRef}
            className="display text-[14vw] md:text-[9vw] leading-[0.9] tracking-[-0.02em]"
          >
            {headline.map((w, i) => (
              <span
                key={i}
                className="hero-word inline-block overflow-hidden align-top mr-[0.15em]"
              >
                <span className="inline-block">
                  {i === 2 ? <em className="serif-italic text-rose-deep">{w}</em> : w}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-8 md:mt-14 grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <p className="hero-sub opacity-0 serif-italic text-xl md:text-2xl text-ink/75 max-w-xl">
              Pastelería artesanal en el corazón de {SITE.city}.
              Horneado cada mañana con ingredientes de temporada y pedidos directos por WhatsApp.
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href="/catalogo"
                data-cursor-label="Explorar"
                className="hero-cta opacity-0 h-14 px-8 rounded-full bg-ink text-cream text-xs uppercase tracking-[0.3em] hover:bg-gold-deep transition-colors"
              >
                Ver el catálogo
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/nosotros"
                data-cursor-label="Historia"
                className="hero-cta opacity-0 h-14 px-8 rounded-full border border-ink text-ink text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-cream transition-colors"
              >
                Nuestra historia
              </MagneticButton>
            </div>
          </div>
        </div>

        <div
          ref={imageRef}
          className="md:col-span-5 relative aspect-[3/4] md:aspect-auto md:h-[78vh]"
        >
          <div className="absolute inset-0 rounded-sm overflow-hidden shadow-[0_40px_80px_-20px_rgba(43,31,26,0.25)]">
            <Image
              src="https://images.unsplash.com/photo-1551404973-761c83cd8339?auto=format&fit=crop&w=1400&q=80"
              alt="Torta de frutillas y crema chantilly sobre base de mármol"
              fill
              priority
              sizes="(min-width: 768px) 42vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 md:-left-14 w-32 h-32 md:w-44 md:h-44 rounded-full bg-gold text-ink flex flex-col items-center justify-center text-center p-4 shadow-lg rotate-[-6deg]">
            <span className="text-[9px] uppercase tracking-[0.3em]">Desde</span>
            <span className="display text-3xl leading-none mt-1">{SITE.foundedYear}</span>
            <span className="serif-italic text-[11px] mt-1">
              horneando a mano
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 md:mt-24 mx-auto max-w-[1600px] px-6 md:px-10 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-ink/50">
        <Link
          href="#firma"
          data-cursor="link"
          className="flex items-center gap-3 group"
        >
          <span className="inline-block w-0.5 h-10 bg-ink/30 relative overflow-hidden">
            <span className="absolute inset-0 bg-ink translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-700" />
          </span>
          Sigue bajando
        </Link>
        <span>{new Date().getFullYear()} · {SITE.city}</span>
      </div>
    </section>
  );
}
