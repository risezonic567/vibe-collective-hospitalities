import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function Eyebrow({ children, className = "", light = false }: EyebrowProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase font-sans ${
        light ? "text-[#cca96a]" : "text-[#b8975a]"
      } ${className}`}
    >
      <span className="h-[1px] w-6 bg-[#b8975a] opacity-80" aria-hidden="true" />
      <span>{children}</span>
      <span className="h-[1px] w-6 bg-[#b8975a] opacity-80" aria-hidden="true" />
    </div>
  );
}
