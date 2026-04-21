"use client";

import { motion } from "motion/react";
import { useRef } from "react";

const QUOTES = [
  {
    q: "La mille-feuille es la mejor que probé fuera de París. Crocante, ligera, perfecta.",
    a: "Valentina M.",
    r: "Cliente desde 2014",
  },
  {
    q: "Pedimos la Fresas Rosé para mi casamiento. Todos preguntaron dónde la compramos.",
    a: "Ignacio & Lucía",
    r: "Casamiento 2025",
  },
  {
    q: "Los macarons siempre llegan intactos, frescos y con una caja preciosa.",
    a: "Sol P.",
    r: "Cliente recurrente",
  },
  {
    q: "Atención por WhatsApp impecable. Coordinamos todo en minutos.",
    a: "Federico T.",
    r: "Cliente corporativo",
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-24 md:py-32 bg-ink text-cream overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-cream/50 mb-4">
              <span className="inline-block w-8 h-px bg-gold" />
              Clientes
            </p>
            <h2 className="display text-5xl md:text-7xl leading-[0.95]">
              Cada pedido es
              <br />
              <em className="serif-italic text-gold">una historia.</em>
            </h2>
          </div>
          <p className="hidden md:block text-xs uppercase tracking-[0.3em] text-cream/40">
            ← Arrastrá →
          </p>
        </div>

        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
          dragElastic={0.12}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
        >
          {QUOTES.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="shrink-0 w-[82vw] md:w-[420px] border border-cream/15 rounded-sm p-8 md:p-10 bg-ink/40"
            >
              <span className="display text-6xl text-gold leading-none">“</span>
              <blockquote className="serif-italic text-xl md:text-2xl mt-4 leading-snug">
                {t.q}
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-cream/60">
                <span>{t.a}</span>
                <span>{t.r}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
