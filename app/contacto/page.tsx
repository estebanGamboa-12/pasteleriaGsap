import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/config/site";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { buildSimpleWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Visítanos en nuestra tienda o escríbenos por WhatsApp.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="pt-36 md:pt-48 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-8">
              <span className="inline-block w-8 h-px bg-gold" />
              Contacto
            </p>
            <SplitReveal
              as="h1"
              className="text-6xl md:text-[9vw] leading-[0.9]"
              trigger="none"
            >
              Ven a saludar.
            </SplitReveal>
            <p className="serif-italic text-xl md:text-2xl text-ink/70 mt-8 max-w-xl leading-snug capitalize-first">
              Nos encontrarás en nuestra tienda de {SITE.neighborhood}, con vitrina abierta al público.
              O pide por WhatsApp y coordinamos la entrega.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href={buildSimpleWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                data-cursor-label="WhatsApp"
                className="h-14 px-8 rounded-full bg-ink text-cream text-xs uppercase tracking-[0.3em] hover:bg-gold-deep"
              >
                Escríbenos por WhatsApp
              </MagneticButton>
              <MagneticButton
                as="a"
                href={`mailto:${SITE.email}`}
                data-cursor-label="Email"
                className="h-14 px-8 rounded-full border border-ink text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-cream"
              >
                Enviar un email
              </MagneticButton>
            </div>
          </div>
          <div className="md:col-span-5">
            <ImageReveal
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80"
              alt="Vitrina de la pastelería"
              width={900}
              height={1100}
              wrapperClassName="aspect-[4/5] rounded-sm"
              parallax={-6}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream-2/60 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-3 gap-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
              Dirección
            </p>
            <p className="serif-italic text-2xl leading-snug">{SITE.address}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
              Contacto
            </p>
            <p className="serif-italic text-xl">{SITE.whatsappPhone}</p>
            <p className="serif-italic text-xl">{SITE.email}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
              Horarios
            </p>
            <ul className="space-y-1 text-base">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-ink/70">{h.day}</span>
                  <span className="serif-italic">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative py-0 bg-ink">
        <div className="relative w-full h-[60vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?auto=format&fit=crop&w=1800&q=80"
            alt="Mapa ilustrativo del barrio"
            fill
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
          <div className="absolute inset-0 flex items-center justify-center text-cream text-center px-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">
                Visítanos
              </p>
              <h2 className="display text-5xl md:text-7xl leading-[0.95] capitalize">
                {SITE.neighborhood}, {SITE.city}
              </h2>
              <p className="serif-italic text-xl text-cream/70 mt-4">
                A pocos pasos del centro de tu ciudad.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
