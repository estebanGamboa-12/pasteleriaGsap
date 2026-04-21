"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    eyebrow: "Paso 01",
    title: "La harina",
    body: "Seleccionamos harinas francesas de grano fino. El trigo se tamiza dos veces para lograr masas más aireadas.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "Paso 02",
    title: "La mezcla",
    body: "Todo se amasa a mano en superficie de mármol, a temperatura controlada. El movimiento es parte de la receta.",
    image:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "Paso 03",
    title: "El reposo",
    body: "Fermentación lenta de 72 horas en frío. La masa descansa hasta lograr un alveolado irregular y aromático.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "Paso 04",
    title: "El horno",
    body: "Horneamos en hornos de suela a 200°C. El calor seco dora la superficie y potencia la manteca francesa.",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "Paso 05",
    title: "El terminado",
    body: "Glaseados, cremas y decoraciones se aplican a mano, pieza por pieza. Nunca dos tortas son idénticas.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80",
  },
];

export function ProcessScrolly() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.08 });
      });

      stepsRef.current.forEach((stepEl, i) => {
        if (!stepEl) return;
        ScrollTrigger.create({
          trigger: stepEl,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => activate(i),
          onEnterBack: () => activate(i),
        });
      });

      function activate(idx: number) {
        imagesRef.current.forEach((img, i) => {
          if (!img) return;
          gsap.to(img, {
            opacity: i === idx ? 1 : 0,
            scale: i === idx ? 1 : 1.08,
            duration: 1,
            ease: "power3.out",
          });
        });
        if (counterRef.current) {
          gsap.to(counterRef.current, {
            duration: 0.4,
            ease: "power2.out",
            onStart: () => {
              if (counterRef.current)
                counterRef.current.textContent = `0${idx + 1}`;
            },
          });
        }
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream-2/60 border-y border-ink/10"
    >
      <div className="mx-auto max-w-[1600px] grid md:grid-cols-12 gap-0">
        <div className="md:col-span-6 md:sticky md:top-0 md:h-screen">
          <div className="relative w-full h-[60vh] md:h-full overflow-hidden">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  imagesRef.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/20" />
              </div>
            ))}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-cream flex items-center gap-4">
              <span
                ref={counterRef}
                className="display text-6xl md:text-8xl leading-none"
              >
                01
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-cream/70 max-w-[9ch]">
                de 0{STEPS.length}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 px-6 md:px-14 py-12 md:py-0">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                stepsRef.current[i] = el;
              }}
              className="min-h-[70vh] md:min-h-screen flex flex-col justify-center py-16 border-b border-ink/10 last:border-b-0"
            >
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold-deep mb-4">
                {s.eyebrow}
              </p>
              <h3 className="display text-5xl md:text-7xl leading-[0.95] mb-6">
                {s.title}
              </h3>
              <p className="serif-italic text-xl md:text-2xl text-ink/75 max-w-md leading-snug">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
