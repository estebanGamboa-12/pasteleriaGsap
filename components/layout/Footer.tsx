"use client";

import Link from "next/link";
import { SITE } from "@/config/site";
import { buildSimpleWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-ink text-cream overflow-hidden">
      <div className="relative w-full overflow-hidden py-14 border-b border-cream/10">
        <div className="marquee-track flex whitespace-nowrap text-[14vw] md:text-[9vw] leading-none display text-cream/80">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex items-center gap-10 pr-10">
              <span>Pastelería</span>
              <span className="text-gold">✦</span>
              <span className="serif-italic">artesanal</span>
              <span className="text-gold">✦</span>
              <span>{SITE.name}</span>
              <span className="text-gold">✦</span>
              <span className="serif-italic">de tu ciudad</span>
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="display text-4xl md:text-5xl leading-tight">
            Dulces a medida,
            <br />
            <span className="serif-italic text-gold">horneados con amor.</span>
          </p>
          <a
            href={buildSimpleWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            data-cursor="magnetic"
            data-cursor-label="WhatsApp"
            className="inline-flex mt-8 items-center gap-3 border border-cream/30 rounded-full px-6 h-12 text-xs uppercase tracking-[0.3em] hover:bg-cream hover:text-ink transition-colors"
          >
            Pedir por WhatsApp
            <span>→</span>
          </a>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-4">
            Explorar
          </p>
          <ul className="space-y-2">
            {SITE.nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  data-cursor="link"
                  className="text-lg serif-italic hover:text-gold transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40 mb-4">
            Contacto
          </p>
          <address className="not-italic space-y-2 text-sm text-cream/80">
            <p>{SITE.address}</p>
            <p>{SITE.whatsappPhone}</p>
            <p>{SITE.email}</p>
          </address>
          <div className="mt-6 flex gap-4 text-xs uppercase tracking-[0.3em]">
            <a
              href={SITE.social.instagram}
              data-cursor="link"
              className="hover:text-gold"
            >
              Instagram
            </a>
            <a
              href={SITE.social.tiktok}
              data-cursor="link"
              className="hover:text-gold"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 px-6 md:px-10 flex flex-col md:flex-row justify-between gap-2 text-[11px] uppercase tracking-[0.3em] text-cream/40">
        <p>© {year} {SITE.name}. Todos los derechos reservados.</p>
        <p className="capitalize">Horneado con amor en {SITE.city}</p>
      </div>
    </footer>
  );
}
