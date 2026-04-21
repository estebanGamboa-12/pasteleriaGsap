"use client";

import { SplitReveal } from "@/components/ui/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { buildSimpleWhatsAppUrl } from "@/lib/whatsapp";
import { Marquee } from "@/components/ui/Marquee";

export function CTAWhatsApp() {
  return (
    <section className="relative bg-gold text-ink overflow-hidden">
      <Marquee className="py-4 border-b border-ink/20" speed={40}>
        <span className="display text-[8vw] md:text-[4vw]">Pedí por WhatsApp</span>
        <span className="display text-[8vw] md:text-[4vw]">✦</span>
        <span className="display text-[8vw] md:text-[4vw] serif-italic">
          retirá en el local
        </span>
        <span className="display text-[8vw] md:text-[4vw]">✦</span>
        <span className="display text-[8vw] md:text-[4vw]">
          envíos a CABA
        </span>
        <span className="display text-[8vw] md:text-[4vw]">✦</span>
      </Marquee>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-40 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] mb-6">
            Pedidos personalizados
          </p>
          <SplitReveal
            as="h2"
            className="text-6xl md:text-8xl leading-[0.9]"
          >
            ¿Listos para endulzar el momento?
          </SplitReveal>
        </div>
        <div className="space-y-8">
          <p className="serif-italic text-xl md:text-2xl max-w-md leading-snug">
            Armá tu pedido navegando el catálogo o escribinos directo. Coordinamos
            sabor, tamaño, decoración y entrega por WhatsApp en minutos.
          </p>
          <div className="flex flex-wrap gap-4">
            <MagneticButton
              as="a"
              href={buildSimpleWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              data-cursor-label="WhatsApp"
              className="h-14 px-8 rounded-full bg-ink text-cream text-xs uppercase tracking-[0.3em] hover:bg-ink-soft"
            >
              Escribir por WhatsApp
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/catalogo"
              data-cursor-label="Explorar"
              className="h-14 px-8 rounded-full border border-ink text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-cream"
            >
              Armar pedido
            </MagneticButton>
          </div>
        </div>
      </div>

      <Marquee className="py-4 border-t border-ink/20" speed={40}>
        <span className="display text-[8vw] md:text-[4vw] serif-italic">
          horneado hoy
        </span>
        <span className="display text-[8vw] md:text-[4vw]">✦</span>
        <span className="display text-[8vw] md:text-[4vw]">
          Maison Dulce
        </span>
        <span className="display text-[8vw] md:text-[4vw]">✦</span>
        <span className="display text-[8vw] md:text-[4vw] serif-italic">
          artesanal
        </span>
        <span className="display text-[8vw] md:text-[4vw]">✦</span>
      </Marquee>
    </section>
  );
}
