"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { SITE } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { value: 25, suffix: "+", label: "Años horneando" },
  { value: 12, suffix: "k", label: "Tartas servidas" },
  { value: 72, suffix: "h", label: "De fermentación" },
  { value: 100, suffix: "%", label: "Hecho a mano" },
];

export function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);
  const secondaryImgRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      if (mainImgRef.current) {
        gsap.to(mainImgRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (secondaryImgRef.current) {
        gsap.to(secondaryImgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (sealRef.current) {
        gsap.to(sealRef.current, {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      const stats = statsRef.current?.querySelectorAll("[data-stat]");
      stats?.forEach((el) => {
        const target = Number((el as HTMLElement).dataset.stat ?? 0);
        const obj = { v: 0 };
        const node = el.querySelector(".stat-value");
        const runCount = () => {
          gsap.killTweensOf(obj);
          obj.v = 0;
          if (node) node.textContent = "0";
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              if (node) node.textContent = String(Math.round(obj.v));
            },
          });
        };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: runCount,
          onEnterBack: runCount,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream overflow-hidden"
    >
      <div className="border-y border-ink/10 bg-cream-2/60">
        <Marquee className="py-5" speed={50}>
          <span className="display text-3xl md:text-4xl">{SITE.shortName}</span>
          <span className="text-gold text-3xl">✦</span>
          <span className="serif-italic text-3xl md:text-4xl text-ink/70 capitalize">
            {SITE.city}
          </span>
          <span className="text-gold text-3xl">✦</span>
          <span className="display text-3xl md:text-4xl">desde {SITE.foundedYear}</span>
          <span className="text-gold text-3xl">✦</span>
          <span className="serif-italic text-3xl md:text-4xl text-ink/70">
            hecho a mano
          </span>
          <span className="text-gold text-3xl">✦</span>
          <span className="display text-3xl md:text-4xl">lotes pequeños</span>
          <span className="text-gold text-3xl">✦</span>
        </Marquee>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-10 py-24 md:py-40">
        <p className="absolute left-4 md:left-10 top-28 md:top-44 text-[10px] uppercase tracking-[0.5em] text-ink/40 origin-top-left -rotate-90 translate-y-6 hidden md:block">
          ✦ Nuestra esencia · Est. {SITE.foundedYear}
        </p>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-6 relative">
            <div ref={mainImgRef} className="relative">
              <ImageReveal
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80"
                alt="Pastelera amasando hojaldre sobre mármol"
                width={900}
                height={1200}
                wrapperClassName="aspect-[3/4] rounded-sm"
              />
            </div>

            <div
              ref={secondaryImgRef}
              className="absolute -right-4 md:-right-16 -bottom-10 md:-bottom-20 w-[45%] md:w-[55%] z-10"
            >
              <ImageReveal
                src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80"
                alt="Éclairs recién pintados a mano"
                width={700}
                height={900}
                wrapperClassName="aspect-[4/5] rounded-sm shadow-[0_40px_80px_-20px_rgba(43,31,26,0.35)]"
              />
            </div>

            <div
              ref={sealRef}
              className="absolute -left-4 -top-8 md:-left-12 md:-top-12 w-24 h-24 md:w-32 md:h-32 rounded-full border border-gold flex items-center justify-center bg-cream/90 backdrop-blur-sm"
              aria-hidden
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <defs>
                  <path
                    id="about-seal-path"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text className="fill-ink text-[11px] uppercase tracking-[0.3em]">
                  <textPath href="#about-seal-path">
                    · {SITE.name} · {SITE.city}
                  </textPath>
                </text>
              </svg>
              <span className="text-gold text-xl">✦</span>
            </div>
          </div>

          <div className="md:col-span-6 md:pl-6 md:pt-10">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-6">
              <span className="inline-block w-8 h-px bg-gold" />
              Nuestra esencia
            </p>
            <SplitReveal
              as="h2"
              className="text-5xl md:text-7xl leading-[0.95]"
            >
              Un gesto artesanal en cada bocado.
            </SplitReveal>

            <p className="serif-italic text-xl md:text-2xl text-ink/70 mt-8 leading-snug">
              Pasamos nuestras mañanas entre harinas finas, mantequilla y frutas de temporada.
              Cada tarta sale del horno con el mismo cuidado con el que se hornearía para la familia.
            </p>

            <p className="text-ink/60 mt-6 leading-relaxed max-w-xl">
              Creamos cada receta con técnica y paciencia desde hace más de dos décadas.
              Seguimos honrando la misma base: masa laminada a 72 horas, chocolate premium
              y decoraciones hechas a mano.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <svg
                width="90"
                height="44"
                viewBox="0 0 90 44"
                fill="none"
                className="text-ink"
                aria-hidden
              >
                <path
                  d="M3 30 C 8 20, 14 8, 22 12 C 28 14, 24 28, 32 30 C 40 32, 44 16, 54 20 C 60 22, 58 34, 68 30 C 76 27, 82 18, 86 12"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div>
                <p className="serif-italic text-lg">El obrador</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
                  Pastelería artesanal
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href="/nosotros"
                data-cursor-label="Historia"
                className="h-12 px-6 rounded-full bg-ink text-cream text-xs uppercase tracking-[0.3em] hover:bg-gold-deep transition-colors"
              >
                Conocé la historia
              </MagneticButton>
              <Link
                href="/catalogo"
                data-cursor="link"
                className="h-12 px-6 rounded-full border border-ink/20 text-xs uppercase tracking-[0.3em] inline-flex items-center hover:border-ink"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-28 md:mt-40 border-t border-ink/15 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              data-stat={s.value}
              className="group border-l border-ink/10 first:border-l-0 md:first:border-l md:border-l pl-6 md:pl-8 first:pl-0 md:first:pl-8"
            >
              <p className="display text-5xl md:text-6xl leading-none flex items-baseline gap-1">
                <span className="stat-value">0</span>
                <span className="text-gold text-4xl md:text-5xl">{s.suffix}</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-ink/55 mt-3">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
