"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { CATEGORIES, PRODUCTS, type ProductCategory } from "@/config/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

type Filter = "all" | ProductCategory;

export function CatalogGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === filter),
    [filter]
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "Todo" },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-12 md:py-16">
      <div className="sticky top-20 z-30 -mx-6 md:-mx-10 px-6 md:px-10 py-4 mb-10 bg-cream/85 backdrop-blur border-y border-ink/10">
        <LayoutGroup id="filters">
          <nav className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                data-cursor="link"
                className={cn(
                  "relative px-5 h-10 rounded-full text-[11px] uppercase tracking-[0.3em] transition-colors",
                  filter === f.id
                    ? "text-cream"
                    : "text-ink/70 hover:text-ink"
                )}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="filter-active"
                    className="absolute inset-0 bg-ink rounded-full"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </nav>
        </LayoutGroup>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-y-20"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="serif-italic text-2xl text-ink/60 text-center py-20">
          Por ahora no hay piezas en esta categoría.
        </p>
      )}
    </section>
  );
}
