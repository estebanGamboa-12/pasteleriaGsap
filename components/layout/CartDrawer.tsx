"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  useCart,
  selectCartCount,
  selectCartTotal,
} from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.closeDrawer);
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const count = useCart(selectCartCount);
  const total = useCart(selectCartTotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
            className="fixed right-0 top-0 z-[75] h-full w-full sm:w-[440px] bg-cream shadow-2xl flex flex-col"
          >
            <div className="px-6 md:px-8 py-6 flex items-center justify-between border-b border-ink/10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
                  Tu pedido
                </p>
                <p className="display text-2xl mt-1">
                  {count} {count === 1 ? "pieza" : "piezas"}
                </p>
              </div>
              <button
                onClick={close}
                data-cursor="link"
                data-cursor-label="Cerrar"
                aria-label="Cerrar carrito"
                className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center hover:bg-ink hover:text-cream transition-colors"
              >
                <span className="relative block w-4 h-4">
                  <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-current rotate-45" />
                  <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-current -rotate-45" />
                </span>
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto no-scrollbar"
              data-lenis-prevent
            >
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-10 text-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-gold/40 text-gold flex items-center justify-center text-xl">
                    ✦
                  </div>
                  <p className="serif-italic text-xl">
                    Todavía no agregaste dulces a tu pedido.
                  </p>
                  <Link
                    href="/catalogo"
                    onClick={close}
                    data-cursor="magnetic"
                    className="inline-flex items-center gap-2 border border-ink rounded-full px-6 h-11 text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-cream transition-colors"
                  >
                    Ver catálogo
                  </Link>
                </div>
              ) : (
                <ul className="p-6 md:p-8 space-y-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
                        className="flex gap-4"
                      >
                        <div className="relative w-20 h-24 rounded-md overflow-hidden bg-cream-2 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between gap-2">
                            <p className="display text-lg leading-tight">
                              {item.name}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              data-cursor="link"
                              className="text-[10px] uppercase tracking-[0.2em] text-ink/50 hover:text-rose-deep"
                              aria-label="Quitar"
                            >
                              Quitar
                            </button>
                          </div>
                          <p className="text-xs text-ink/60 mt-1">
                            {item.sizeLabel} · {item.flavor}
                          </p>
                          <div className="mt-auto pt-3 flex items-center justify-between">
                            <div className="flex items-center border border-ink/15 rounded-full h-9">
                              <button
                                onClick={() =>
                                  updateQty(item.id, item.quantity - 1)
                                }
                                data-cursor="link"
                                aria-label="Menos"
                                className="w-9 h-9 flex items-center justify-center hover:bg-ink/5 rounded-l-full"
                              >
                                −
                              </button>
                              <span className="w-7 text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQty(item.id, item.quantity + 1)
                                }
                                data-cursor="link"
                                aria-label="Más"
                                className="w-9 h-9 flex items-center justify-center hover:bg-ink/5 rounded-r-full"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-sm font-medium">
                              {formatPrice(item.unitPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 p-6 md:p-8 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-ink/60">
                    Subtotal
                  </span>
                  <span className="display text-2xl">
                    {formatPrice(total)}
                  </span>
                </div>
                <Link
                  href="/carrito"
                  onClick={close}
                  data-cursor="magnetic"
                  data-cursor-label="Pedir"
                  className="block text-center bg-ink text-cream rounded-full h-12 leading-[48px] text-xs uppercase tracking-[0.3em] hover:bg-gold-deep transition-colors"
                >
                  Continuar al pedido
                </Link>
                <p className="text-[11px] text-ink/50 text-center">
                  Coordinamos la entrega al finalizar por WhatsApp.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
