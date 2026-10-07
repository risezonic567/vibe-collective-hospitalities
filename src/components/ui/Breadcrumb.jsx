import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
export function Breadcrumb({ items, className = "", light = false }) {
    return (<nav aria-label="Breadcrumb" className={`text-xs uppercase tracking-[0.2em] font-sans ${light ? "text-[#e8dfd0]/80" : "text-[#536474]"} ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (<li key={index} className="inline-flex items-center gap-2">
              {item.href && !isLast ? (<Link href={item.href} className={`transition-colors ${light
                        ? "hover:text-[#cca96a] text-[#f7f3ec]/90"
                        : "hover:text-[#b8975a] text-[#14202b]"}`}>
                  {item.label}
                </Link>) : (<span className={`${light ? "text-[#cca96a] font-medium" : "text-[#b8975a] font-medium"}`} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>)}

              {!isLast && (<ChevronRight className="w-3 h-3 opacity-60 text-[#b8975a] shrink-0" aria-hidden="true"/>)}
            </li>);
        })}
      </ol>
    </nav>);
}
