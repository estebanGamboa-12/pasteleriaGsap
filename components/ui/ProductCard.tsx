"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/config/products";
import { formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        delay: 0.05 * (index % 6),
        ease: [0.77, 0, 0.175, 1],
      }}
      className="group"
    >
      <Link
        href={`/producto/${product.slug}`}
        data-cursor="magnetic"
        data-cursor-label="Ver"
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-2">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.77,0,.175,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cream bg-ink/70 backdrop-blur px-3 h-7 rounded-full">
              {product.category}
            </span>
          </div>
          {product.signature && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-ink bg-gold px-3 h-7 rounded-full">
                ✦ Signature
              </span>
            </div>
          )}
        </div>

        <div className="pt-5 flex justify-between items-baseline gap-4">
          <div>
            <h3 className="display text-2xl leading-tight group-hover:text-rose-deep transition-colors">
              {product.name}
            </h3>
            <p className="serif-italic text-ink/60 text-base mt-1">
              {product.subtitle}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
              Desde
            </p>
            <p className="display text-lg">
              {formatPrice(product.basePrice)}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
