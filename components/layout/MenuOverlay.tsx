"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/config/site";
import { buildSimpleWhatsAppUrl } from "@/lib/whatsapp";

const menuItems = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nuestra historia", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Pedido", href: "/carrito" },
];

export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[80] bg-ink text-cream overflow-y-auto"
        >
          <div className="sticky top-0 z-10 h-16 md:h-20 px-5 md:px-10 flex items-center justify-between bg-ink/95 backdrop-blur-sm border-b border-cream/5">
            <span className="display text-lg md:text-2xl">
              <span className="text-gold">✦</span> {SITE.name}
            </span>
            <button
              onClick={onClose}
              data-cursor="link"
              data-cursor-label="Cerrar"
              aria-label="Cerrar menú"
              className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center shrink-0"
            >
              <span className="relative block w-4 h-4">
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-cream rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-cream -rotate-45" />
              </span>
            </button>
          </div>

          <div className="min-h-[calc(100%-4rem)] md:min-h-[calc(100%-5rem)] flex flex-col md:flex-row">
            <div className="flex-1 flex items-center px-6 py-10 md:py-16 md:justify-center">
              <ul className="w-full space-y-1 md:space-y-4">
                {menuItems.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{
                        delay: 0.15 + i * 0.08,
                        duration: 0.8,
                        ease: [0.77, 0, 0.175, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        data-cursor="magnetic"
                        className="display text-[40px] sm:text-5xl md:text-[72px] lg:text-[88px] leading-[1.05] md:leading-[0.95] flex items-baseline gap-3 md:gap-5 hover:text-gold transition-colors duration-500 py-1"
                      >
                        <span className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-cream/40 shrink-0 self-start mt-2 md:mt-5">
                          0{i + 1}
                        </span>
                        <span className="leading-[1.05] md:leading-[0.95]">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
            <motion.aside
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="md:w-[360px] border-t md:border-t-0 md:border-l border-cream/10 px-6 md:px-8 py-8 md:py-10 flex flex-col gap-6 md:gap-8 md:justify-end"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
                  Visitanos
                </p>
                <p className="serif-italic text-base md:text-xl mt-2 leading-snug">
                  {SITE.address}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
                  Horarios
                </p>
                <ul className="mt-2 space-y-1 text-[13px] md:text-sm">
                  {SITE.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between gap-4 text-cream/80"
                    >
                      <span>{h.day}</span>
                      <span>{h.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={buildSimpleWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                data-cursor="magnetic"
                data-cursor-label="WhatsApp"
                className="inline-flex items-center justify-center gap-2 border border-gold text-gold rounded-full h-12 px-6 text-[11px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.3em] hover:bg-gold hover:text-ink transition-colors"
              >
                Escribinos por WhatsApp
              </a>
            </motion.aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
