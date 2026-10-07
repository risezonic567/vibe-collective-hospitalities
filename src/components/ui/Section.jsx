import React from "react";
export function Section({ children, variant = "ivory", className = "", hasDivider = false, ...props }) {
    const variantStyles = {
        ivory: "bg-[#f7f3ec] text-[#14202b]",
        sand: "bg-[#e8dfd0] text-[#14202b]",
        navy: "bg-[#1d3347] text-[#f7f3ec]",
        white: "bg-[#ffffff] text-[#14202b]",
    };
    return (<section data-vine className={`relative py-20 md:py-28 lg:py-32 ${variantStyles[variant]} ${className}`} {...props}>
      {hasDivider && (<div className="absolute top-0 left-0 right-0 gold-divider pointer-events-none" aria-hidden="true"/>)}
      {children}
    </section>);
}
