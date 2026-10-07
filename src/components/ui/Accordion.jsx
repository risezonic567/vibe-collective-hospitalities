"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
export function Accordion({ items, className = "" }) {
    const [openIds, setOpenIds] = useState({
        [items[0]?.id || ""]: true, // Open first item by default
    });
    const toggle = (id) => {
        setOpenIds((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleKeyDown = (e, index) => {
        const buttons = document.querySelectorAll("[data-accordion-btn]");
        if (!buttons.length)
            return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextIndex = (index + 1) % buttons.length;
            buttons[nextIndex]?.focus();
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prevIndex = (index - 1 + buttons.length) % buttons.length;
            buttons[prevIndex]?.focus();
        }
        else if (e.key === "Home") {
            e.preventDefault();
            buttons[0]?.focus();
        }
        else if (e.key === "End") {
            e.preventDefault();
            buttons[buttons.length - 1]?.focus();
        }
    };
    return (<div className={`divide-y divide-[#e8dfd0] border-y border-[#e8dfd0] ${className}`}>
      {items.map((item, index) => {
            const isOpen = !!openIds[item.id];
            const headerId = `accordion-header-${item.id}`;
            const panelId = `accordion-panel-${item.id}`;
            return (<div key={item.id} className="py-2">
            <h3>
              <button type="button" id={headerId} data-accordion-btn aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(item.id)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-full py-5 text-left flex items-center justify-between gap-4 text-[#14202b] hover:text-[#b8975a] transition-colors focus-visible:outline-2 focus-visible:outline-[#b8975a] group cursor-pointer">
                <span className="text-lg md:text-xl font-serif font-medium tracking-wide">
                  {item.question}
                </span>
                <span className={`shrink-0 w-8 h-8 rounded-full border border-[#e8dfd0] flex items-center justify-center transition-transform duration-300 group-hover:border-[#b8975a] ${isOpen ? "rotate-180 bg-[#1d3347] text-[#f7f3ec] border-[#1d3347]" : "text-[#1d3347]"}`} aria-hidden="true">
                  <ChevronDown className="w-4 h-4"/>
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={headerId} hidden={!isOpen} className={`transition-all duration-300 ease-in-out pb-6 pt-1 text-[#4a5a6a] text-base leading-relaxed max-w-3xl ${isOpen ? "block" : "hidden"}`}>
              <p>{item.answer}</p>
            </div>
          </div>);
        })}
    </div>);
}
