"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SITE } from "@/config/site";
import { useCart, selectCartCount } from "@/lib/cart-store";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = useCart(selectCartCount);
  const openDrawer = useCart((s) => s.openDrawer);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "backdrop-blur-md bg-cream/75 border-b border-ink/5"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-20 flex items-center justify-between">
          <Link
            href="/"
            data-cursor="link"
            data-cursor-label="Inicio"
            className="display text-2xl md:text-[28px] leading-none flex items-center gap-2"
          >
            <span className="text-gold-deep">✦</span>
            {SITE.name}
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {SITE.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="link"
                className="relative text-[13px] uppercase tracking-[0.25em] text-ink/80 hover:text-ink transition-colors group"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 group-hover:scale-x-100 bg-gold transition-transform duration-500" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={openDrawer}
              data-cursor="link"
              data-cursor-label="Abrir"
              aria-label="Abrir carrito"
              className="relative flex items-center gap-2 px-4 h-10 rounded-full border border-ink/15 hover:border-ink/40 bg-cream/50 transition-colors"
            >
              <CartIcon />
              <span className="text-[11px] uppercase tracking-[0.25em]">
                Pedido
              </span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0, y: -4 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 520, damping: 18 }}
                    className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-rose-deep text-cream text-[10px] flex items-center justify-center font-semibold"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              data-cursor="link"
              data-cursor-label="Menú"
              aria-label="Abrir menú"
              className="md:hidden w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center"
            >
              <span className="block w-4 h-[1.5px] bg-ink before:content-[''] before:absolute before:w-4 before:h-[1.5px] before:bg-ink before:translate-y-[6px] relative" />
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              data-cursor="link"
              data-cursor-label="Menú"
              aria-label="Abrir menú"
              className="hidden md:flex flex-col items-end gap-[4px] px-4 h-10 justify-center"
            >
              <span className="block w-5 h-[1.5px] bg-ink" />
              <span className="block w-3 h-[1.5px] bg-ink" />
            </button>
          </div>
        </div>
      </motion.header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function CartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M3 5h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 9H6" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  );
}
