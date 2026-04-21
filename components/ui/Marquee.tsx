"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function Marquee({ children, className, speed = 28 }: Props) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className="marquee-track flex whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center gap-10 pr-10">{children}</div>
        <div className="flex items-center gap-10 pr-10" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
