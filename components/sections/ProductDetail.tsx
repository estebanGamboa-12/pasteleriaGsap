"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCart } from "@/lib/cart-store";
import { productPrice, PRODUCTS, type Product } from "@/config/products";
import { formatPrice, cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductDetail({ product }: { product: Product }) {
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [flavor, setFlavor] = useState(product.flavors[0]);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCart((s) => s.addItem);

  const price = useMemo(
    () => productPrice(product, sizeId),
    [product, sizeId]
  );
  const selectedSize = product.sizes.find((s) => s.id === sizeId)!;

  const heroRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const img = mainImgRef.current;
    if (!hero || !img) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const t = gsap.to(img, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      return () => t.kill();
    });
    return () => mm.revert();
  }, []);

  const related = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => p.slug !== product.slug && p.category === product.category
      ).slice(0, 3),
    [product]
  );

  const handleAdd = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        image: product.heroImage,
        sizeId,
        sizeLabel: selectedSize.label,
        flavor,
        unitPrice: price,
      },
      qty
    );
  };

  const gallery = product.gallery.length ? product.gallery : [product.heroImage];

  return (
    <>
      <section
        ref={heroRef}
        className="relative pt-28 md:pt-32 pb-16 md:pb-24 bg-cream overflow-hidden"
      >
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-8">
            <Link href="/catalogo" data-cursor="link" className="hover:text-ink">
              Catálogo
            </Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-7">
              <div
                ref={mainImgRef}
                className="relative aspect-[4/5] rounded-sm overflow-hidden bg-cream-2"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={gallery[activeImage]}
                      alt={product.name}
                      fill
                      priority
                      sizes="(min-width: 768px) 56vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                {product.signature && (
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-ink bg-gold px-3 h-7 rounded-full">
                      ✦ Signature
                    </span>
                  </div>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 flex gap-3">
                  {gallery.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setActiveImage(i)}
                      data-cursor="link"
                      className={cn(
                        "relative w-20 h-24 overflow-hidden rounded-sm transition-all",
                        activeImage === i
                          ? "ring-2 ring-gold"
                          : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-5 md:pt-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold-deep">
                {product.category}
              </p>
              <h1 className="display text-6xl md:text-7xl leading-[0.95] mt-3">
                {product.name}
              </h1>
              <p className="serif-italic text-xl md:text-2xl text-ink/70 mt-4">
                {product.subtitle}
              </p>

              <div className="mt-8 flex items-baseline gap-4 border-t border-b border-ink/10 py-6">
                <p className="display text-4xl">{formatPrice(price)}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-ink/50">
                  {selectedSize.serves}
                </p>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
                    Tamaño
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSizeId(s.id)}
                        data-cursor="link"
                        className={cn(
                          "px-4 h-11 rounded-full border text-xs uppercase tracking-[0.25em] transition-colors",
                          sizeId === s.id
                            ? "bg-ink text-cream border-ink"
                            : "border-ink/20 hover:border-ink"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
                    Sabor
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFlavor(f)}
                        data-cursor="link"
                        className={cn(
                          "px-4 h-11 rounded-full border text-xs uppercase tracking-[0.2em] transition-colors",
                          flavor === f
                            ? "bg-rose-deep text-cream border-rose-deep"
                            : "border-ink/20 hover:border-ink"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
                    Cantidad
                  </p>
                  <QuantityStepper value={qty} onChange={setQty} />
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <MagneticButton
                  onClick={handleAdd}
                  data-cursor-label="Añadir"
                  className="h-14 flex-1 rounded-full bg-ink text-cream text-xs uppercase tracking-[0.3em] hover:bg-gold-deep transition-colors"
                >
                  Añadir al pedido — {formatPrice(price * qty)}
                </MagneticButton>
              </div>

              <div className="mt-12 space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
                    Sobre la pieza
                  </p>
                  <p className="text-ink/75 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
                    Ingredientes
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing) => (
                      <li
                        key={ing}
                        className="text-xs uppercase tracking-[0.2em] px-3 h-7 inline-flex items-center border border-ink/15 rounded-full"
                      >
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-24 md:py-32 border-t border-ink/10 bg-cream-2/40">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="flex items-end justify-between mb-10">
              <h2 className="display text-4xl md:text-5xl leading-[0.95]">
                También te puede gustar
              </h2>
              <Link
                href="/catalogo"
                data-cursor="link"
                className="text-xs uppercase tracking-[0.3em] border-b border-ink pb-1"
              >
                Ver todo
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {related.map((p, i) => (
                <RelatedCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function RelatedCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      data-cursor="magnetic"
      data-cursor-label="Ver"
      className="group block"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.7, delay: index * 0.08 }}
        className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-2"
      >
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 30vw, 45vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.77,0,.175,1)] group-hover:scale-105"
        />
      </motion.div>
      <div className="pt-4 flex justify-between items-baseline">
        <div>
          <h3 className="display text-2xl">{product.name}</h3>
          <p className="serif-italic text-ink/60">{product.subtitle}</p>
        </div>
        <p className="display text-lg">{formatPrice(product.basePrice)}</p>
      </div>
    </Link>
  );
}
