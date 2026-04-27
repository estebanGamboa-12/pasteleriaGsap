import type { Metadata } from "next";
import { CatalogGrid } from "@/components/sections/CatalogGrid";
import { SplitReveal } from "@/components/ui/SplitReveal";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora nuestras tartas, pasteles, macarons y bocados. Pedidos artesanales directo por WhatsApp.",
};

export default function CatalogoPage() {
  return (
    <>
      <section className="pt-40 md:pt-48 pb-8 md:pb-16 border-b border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-6">
              <span className="inline-block w-8 h-px bg-gold" />
              Catálogo {new Date().getFullYear()}
            </p>
            <SplitReveal
              as="h1"
              className="text-6xl md:text-[9vw] leading-[0.9]"
              trigger="none"
            >
              Elige tu próximo antojo.
            </SplitReveal>
          </div>
          <p className="md:col-span-4 serif-italic text-xl md:text-2xl text-ink/65 md:text-right leading-snug">
            Cada pieza horneada a mano, en lotes pequeños y con ingredientes de temporada.
          </p>
        </div>
      </section>

      <CatalogGrid />
    </>
  );
}
