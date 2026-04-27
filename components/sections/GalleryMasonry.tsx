"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80",
    alt: "Macarons coloridos",
    span: "md:row-span-2",
    h: "h-[48vh] md:h-full",
    parallax: -12,
  },
  {
    src: "https://images.unsplash.com/photo-1568051243858-533a607809a5?auto=format&fit=crop&w=900&q=80",
    alt: "Canelés recién horneados",
    span: "",
    h: "h-[36vh]",
    parallax: 8,
  },
  {
    src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80",
    alt: "Mille-feuille clásico",
    span: "md:col-span-2",
    h: "h-[48vh]",
    parallax: -6,
  },
  {
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
    alt: "Croissant de manteca",
    span: "",
    h: "h-[38vh]",
    parallax: 10,
  },
  {
    src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    alt: "Tarta de chocolate",
    span: "md:row-span-2",
    h: "h-[46vh] md:h-full",
    parallax: -10,
  },
  {
    src: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=900&q=80",
    alt: "Tarta de limón con merengue",
    span: "",
    h: "h-[34vh]",
    parallax: 6,
  },
];

export function GalleryMasonry() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll("[data-parallax]");
    const tweens: gsap.core.Tween[] = [];

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      items.forEach((el) => {
        const amount = Number((el as HTMLElement).dataset.parallax ?? 0);
        const t = gsap.to(el, {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        tweens.push(t);
      });
    });

    return () => {
      tweens.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-cream">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-4">
              <span className="inline-block w-8 h-px bg-gold" />
              Taller
            </p>
            <h2 className="display text-5xl md:text-7xl leading-[0.95]">
              Día a día en
              <br />
              <em className="serif-italic text-rose-deep">la pastelería.</em>
            </h2>
          </div>
          <p className="hidden md:block serif-italic text-lg text-ink/60 max-w-sm capitalize-first">
            Escenas de nuestro obrador en {SITE.neighborhood}, donde cada receta toma forma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[22vh] gap-4 md:gap-6">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              data-parallax={item.parallax}
              className={`relative overflow-hidden rounded-sm ${item.span} ${item.h}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
