import type { Metadata } from "next";
import Image from "next/image";
import { ProcessScrolly } from "@/components/sections/ProcessScrolly";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Marquee } from "@/components/ui/Marquee";
import { CTAWhatsApp } from "@/components/sections/CTAWhatsApp";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description:
    "Una pastelería parisina, artesanal, horneada a mano en Buenos Aires desde hace más de dos décadas.",
};

const MILESTONES = [
  {
    year: "1999",
    title: "Primer horno en Montmartre",
    body: "Marie abre un pequeño local de barrio donde se horneaban croissants a la madrugada.",
  },
  {
    year: "2006",
    title: "Cruzamos el océano",
    body: "El taller se muda a Buenos Aires. Las recetas se adaptan a frutas y lácteos locales.",
  },
  {
    year: "2014",
    title: "Caja signature",
    body: "Nace la caja de 12 macarons que se vuelve clásica en eventos y regalos corporativos.",
  },
  {
    year: "2023",
    title: "Nuevo taller en Palermo",
    body: "Inauguramos el espacio actual, con vitrina abierta al público y horno de suela.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="pt-36 md:pt-48 pb-16 md:pb-24 paper-grain">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
            <div className="md:col-span-8">
              <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-8">
                <span className="inline-block w-8 h-px bg-gold" />
                La casa · Capítulo 01
              </p>
              <SplitReveal
                as="h1"
                className="text-6xl md:text-[7.5vw] leading-[0.9]"
                trigger="none"
              >
                Una familia obsesionada con el detalle.
              </SplitReveal>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="serif-italic text-xl md:text-2xl text-ink/75 leading-snug">
                Tres generaciones, una misma receta: harina buena, manteca fresca, tiempo de reposo y las manos como herramienta principal.
              </p>
              <div className="flex items-center gap-4 mt-6 text-[11px] uppercase tracking-[0.3em] text-ink/50">
                <span className="inline-block w-6 h-px bg-ink/30" />
                Desde 1999
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-6 md:gap-10 mt-16 md:mt-20 items-stretch">
            <div className="md:col-span-5 md:row-span-2">
              <ImageReveal
                src="https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=1200&q=80"
                alt="Retrato de la pastelera"
                width={900}
                height={1200}
                wrapperClassName="aspect-[3/4] md:aspect-auto md:h-full rounded-sm"
                parallax={-6}
              />
              <figcaption className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-ink/55">
                <span>Marie Laurent</span>
                <span>Fundadora · MMXXVI</span>
              </figcaption>
            </div>

            <figure className="md:col-span-7 relative bg-ink text-cream rounded-sm p-8 md:p-14 overflow-hidden">
              <span className="absolute top-6 left-6 display text-[10rem] md:text-[14rem] leading-[0.7] text-gold/30 select-none pointer-events-none">
                “
              </span>
              <blockquote className="relative serif-italic text-3xl md:text-5xl leading-[1.1]">
                Horneamos las tortas que nos gustaría recibir. Simples, generosas, imposibles de olvidar.
              </blockquote>
              <figcaption className="relative mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-cream/60">
                <span className="inline-block w-10 h-px bg-gold" />
                Marie Laurent · Pastelera jefa
              </figcaption>
            </figure>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  n: "01",
                  t: "Recetas centenarias",
                  d: "Bases clásicas de la tradición parisina, adaptadas con producto local.",
                },
                {
                  n: "02",
                  t: "Lotes pequeños",
                  d: "Horneamos dos veces por día, nunca más de lo que podemos terminar a mano.",
                },
                {
                  n: "03",
                  t: "Ingredientes nobles",
                  d: "Manteca francesa, chocolate belga, frutas de productores locales.",
                },
              ].map((v) => (
                <div
                  key={v.n}
                  className="group border border-ink/10 bg-cream/60 backdrop-blur-sm rounded-sm p-6 md:p-7 flex flex-col gap-4 transition-colors hover:bg-ink hover:text-cream"
                >
                  <span className="display text-4xl text-gold-deep group-hover:text-gold transition-colors">
                    {v.n}
                  </span>
                  <h3 className="display text-xl leading-tight">{v.t}</h3>
                  <p className="serif-italic text-base leading-snug text-ink/70 group-hover:text-cream/70 transition-colors">
                    {v.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-ink/10 bg-cream-2/60 overflow-hidden">
        <Marquee className="py-5" speed={55}>
          <span className="display text-3xl md:text-4xl">Montmartre</span>
          <span className="text-gold text-3xl">✦</span>
          <span className="serif-italic text-3xl md:text-4xl text-ink/70">
            Palermo
          </span>
          <span className="text-gold text-3xl">✦</span>
          <span className="display text-3xl md:text-4xl">Horneado a mano</span>
          <span className="text-gold text-3xl">✦</span>
          <span className="serif-italic text-3xl md:text-4xl text-ink/70">
            lotes de 12
          </span>
          <span className="text-gold text-3xl">✦</span>
          <span className="display text-3xl md:text-4xl">Est. 1999</span>
          <span className="text-gold text-3xl">✦</span>
        </Marquee>
      </div>

      <ProcessScrolly />

      <section className="py-24 md:py-32 bg-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-4">
                Nuestra línea de tiempo
              </p>
              <h2 className="display text-5xl md:text-7xl leading-[0.95]">
                Momentos que nos
                <br />
                <em className="serif-italic text-rose-deep">formaron.</em>
              </h2>
            </div>
          </div>

          <ol className="relative border-l border-ink/20 pl-8 md:pl-14 space-y-12">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[36px] md:-left-[58px] top-2 w-3 h-3 rounded-full bg-gold ring-4 ring-cream" />
                <p className="display text-3xl text-gold-deep">{m.year}</p>
                <h3 className="display text-2xl md:text-3xl mt-2">{m.title}</h3>
                <p className="serif-italic text-lg text-ink/70 mt-2 max-w-xl">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-ink text-cream overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80"
              alt="Detalle de una torta"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4">
              Nuestra filosofía
            </p>
            <SplitReveal as="h2" className="text-5xl md:text-7xl leading-[0.95]">
              Dulce pensado para compartir.
            </SplitReveal>
            <p className="serif-italic text-xl text-cream/80 mt-8 leading-snug">
              No somos una fábrica. Somos un equipo chico que hace lotes chicos. Cada torta se firma en la base y cada caja se arma a mano el día de entrega.
            </p>
          </div>
        </div>
      </section>

      <CTAWhatsApp />
    </>
  );
}
