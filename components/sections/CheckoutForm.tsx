"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  useCart,
  selectCartTotal,
  selectCartCount,
} from "@/lib/cart-store";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { buildWhatsAppUrl, type CheckoutCustomer } from "@/lib/whatsapp";
import { formatPrice, cn } from "@/lib/utils";

export function CheckoutForm() {
  const items = useCart((s) => s.items);
  const total = useCart(selectCartTotal);
  const count = useCart(selectCartCount);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);

  const [name, setName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryMode, setDeliveryMode] =
    useState<CheckoutCustomer["deliveryMode"]>("retiro");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    items.length > 0 &&
    name.trim().length > 1 &&
    deliveryDate.length > 0 &&
    (deliveryMode === "retiro" || address.trim().length > 3);

  const onSubmit = () => {
    if (!canSubmit) {
      setError("Completa tu nombre, fecha y dirección si eliges envío.");
      return;
    }
    const url = buildWhatsAppUrl(items, {
      name,
      deliveryDate,
      deliveryMode,
      address: deliveryMode === "envio" ? address : undefined,
      notes: notes.trim() || undefined,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (items.length === 0) {
    return (
      <section className="pt-36 md:pt-48 pb-32 text-center px-6">
        <p className="flex items-center gap-3 justify-center text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-6">
          <span className="inline-block w-8 h-px bg-gold" />
          Tu pedido
        </p>
        <h1 className="display text-5xl md:text-7xl leading-[0.95] max-w-2xl mx-auto">
          Todavía no hay
          <br />
          <em className="serif-italic text-rose-deep">dulces en tu canasta.</em>
        </h1>
        <p className="serif-italic text-xl text-ink/65 mt-6 max-w-md mx-auto">
          Date una vuelta por el catálogo y elegí tus favoritos. Coordinamos la entrega por WhatsApp.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <MagneticButton
            as="a"
            href="/catalogo"
            data-cursor-label="Explorar"
            className="h-14 px-8 rounded-full bg-ink text-cream text-xs uppercase tracking-[0.3em] hover:bg-gold-deep"
          >
            Ver catálogo
          </MagneticButton>
          <Link
            href="/"
            data-cursor="link"
            className="h-14 px-8 rounded-full border border-ink text-xs uppercase tracking-[0.3em] inline-flex items-center hover:bg-ink hover:text-cream"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/50 mb-6">
            <span className="inline-block w-8 h-px bg-gold" />
            Finalizá tu pedido
          </p>
          <h1 className="display text-5xl md:text-7xl leading-[0.95]">
            Un último paso y
            <br />
            <em className="serif-italic text-rose-deep">te escribimos.</em>
          </h1>
          <p className="serif-italic text-xl text-ink/65 mt-6 max-w-xl">
            Al confirmar, abrimos WhatsApp con tu pedido ya escrito. Solo tienes que enviarlo.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-4">
              Tu cesta ({count} {count === 1 ? "pieza" : "piezas"})
            </p>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="py-6 flex gap-4 md:gap-6"
                  >
                    <div className="relative w-24 h-28 md:w-28 md:h-32 overflow-hidden rounded-sm bg-cream-2 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-4">
                        <h3 className="display text-2xl md:text-3xl leading-tight">
                          {item.name}
                        </h3>
                        <p className="display text-lg shrink-0">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                      <p className="text-sm text-ink/60 mt-1">
                        {item.sizeLabel} · {item.flavor}
                      </p>
                      <div className="mt-auto pt-4 flex items-center gap-4">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(v) => updateQty(item.id, v)}
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          data-cursor="link"
                          className="text-[11px] uppercase tracking-[0.25em] text-ink/60 hover:text-rose-deep"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="mt-8 flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-[0.3em] text-ink/60">
                Total estimado
              </span>
              <span className="display text-4xl">{formatPrice(total)}</span>
            </div>
            <button
              onClick={clear}
              data-cursor="link"
              className="mt-4 text-[11px] uppercase tracking-[0.3em] text-ink/50 hover:text-ink"
            >
              Vaciar cesta
            </button>
          </div>

          <div className="md:col-span-5 md:sticky md:top-28 bg-cream-2/60 border border-ink/10 rounded-sm p-8 md:p-10">
            <h2 className="display text-3xl mb-6">Datos del pedido</h2>

            <div className="space-y-5">
              <Field
                label="Tu nombre"
                value={name}
                onChange={setName}
                placeholder="María Fernández"
                required
              />
              <Field
                label="Fecha de entrega"
                type="date"
                value={deliveryDate}
                onChange={setDeliveryDate}
                required
              />

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-2">
                  Modalidad
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: "retiro", label: "Recoger en tienda" },
                      { id: "envio", label: "Envío a domicilio" },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setDeliveryMode(m.id)}
                      data-cursor="link"
                      className={cn(
                        "h-12 rounded-full border text-[11px] uppercase tracking-[0.25em] transition-colors",
                        deliveryMode === m.id
                          ? "bg-ink text-cream border-ink"
                          : "border-ink/20 hover:border-ink"
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {deliveryMode === "envio" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <Field
                      label="Dirección de envío"
                      value={address}
                      onChange={setAddress}
                      placeholder="Calle, número, piso, barrio"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-2">
                  Notas (opcional)
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Alergias, personalización, dedicatoria…"
                  className="w-full border border-ink/20 rounded-sm px-4 py-3 text-sm bg-cream focus:outline-none focus:border-ink"
                />
              </div>

              {error && (
                <p className="text-sm text-rose-deep">{error}</p>
              )}

              <MagneticButton
                onClick={onSubmit}
                data-cursor-label="Enviar"
                className={cn(
                  "h-14 w-full rounded-full text-xs uppercase tracking-[0.3em] transition-colors",
                  canSubmit
                    ? "bg-ink text-cream hover:bg-gold-deep"
                    : "bg-ink/30 text-cream/70 pointer-events-none"
                )}
              >
                Pedir por WhatsApp →
              </MagneticButton>

              <p className="text-[11px] text-ink/50 leading-relaxed">
                Te llevamos a WhatsApp con el pedido preparado. Tú confirmas y coordinamos el pago y la entrega por chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-2 block">
        {label}
        {required && <span className="text-rose-deep"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-ink/20 rounded-sm px-4 h-12 text-sm bg-cream focus:outline-none focus:border-ink"
      />
    </label>
  );
}
