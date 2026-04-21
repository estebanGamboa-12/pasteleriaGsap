"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  className?: string;
};

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
}: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "inline-flex items-center border border-ink/20 rounded-full h-12",
        className
      )}
    >
      <button
        type="button"
        onClick={dec}
        data-cursor="link"
        aria-label="Disminuir"
        className="w-12 h-12 flex items-center justify-center rounded-l-full hover:bg-ink/5"
      >
        −
      </button>
      <div className="w-10 text-center relative overflow-hidden h-6 flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-sm tabular-nums font-medium"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={inc}
        data-cursor="link"
        aria-label="Aumentar"
        className="w-12 h-12 flex items-center justify-center rounded-r-full hover:bg-ink/5"
      >
        +
      </button>
    </div>
  );
}
