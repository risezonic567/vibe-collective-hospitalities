"use client";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getJourneyItems } from "@/lib/content";
import { JourneyVine } from "@/components/sections/JourneyVine";
export function TimelineSection() {
    const containerRef = useRef(null);
    const [bloomedMarkers, setBloomedMarkers] = useState(() => new Set());
    const handleFlowersOpen = useCallback((ids) => {
        setBloomedMarkers((current) => {
            const next = new Set(current);
            ids.forEach((id) => next.add(id));
            return next;
        });
    }, []);
    const milestones = getJourneyItems();
    return (<div ref={containerRef} className="relative py-12">
      <JourneyVine containerRef={containerRef} onFlowersOpen={handleFlowersOpen} />

      <div className="relative z-[1] space-y-16 md:space-y-24">
        {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (<div key={item.slug} data-timeline-step className="relative flex flex-col md:flex-row items-center">
              {/* Center Dot Indicator */}
              <div data-timeline-marker={item.slug} className={`journey-timeline-marker absolute left-6 md:left-1/2 top-0 md:top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1d3347] border-2 border-[#b8975a] z-10 shadow-sm ${bloomedMarkers.has(item.slug) ? "journey-marker-bloomed" : ""}`} aria-hidden="true"/>

              {/* Text Column */}
              <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isEven
                    ? "md:pr-16 md:text-right"
                    : "md:order-2 md:pl-16 md:text-left"}`}>
                <Link href={`/journey/${item.slug}`} className="group inline-block text-left md:text-inherit">
                  <span className="inline-block text-xs font-sans tracking-[0.25em] uppercase text-[#b8975a] font-medium mb-2">
                    {item.year} Milestone
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] group-hover:text-[#b8975a] transition-colors mb-4 flex items-center gap-2 md:inline-flex">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#b8975a]"/>
                  </h3>
                  <p className="text-sm sm:text-base text-[#4a5a6a] font-light leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.2em] text-[#1d3347] group-hover:text-[#b8975a] font-medium">
                    <span>Explore Chapter</span>
                    <ArrowUpRight className="w-3.5 h-3.5"/>
                  </span>
                </Link>
              </div>

              {/* Image / Card Column (Whole card clickable to /journey/[slug]) */}
              <div className={`w-full md:w-1/2 pl-14 md:pl-0 mt-6 md:mt-0 ${isEven ? "md:order-2 md:pl-16" : "md:order-1 md:pr-16"}`}>
                <Link href={`/journey/${item.slug}`} className="block relative aspect-[16/10] rounded-[2px] overflow-hidden border border-[#e8dfd0] shadow-md group focus-visible:outline-2 focus-visible:outline-[#b8975a]" aria-label={`Explore ${item.title}`}>
                  <Image src={item.coverImage.src} alt={item.coverImage.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover-zoom-img"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142433]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" aria-hidden="true"/>
                  <div className="absolute bottom-4 right-4 bg-[#1d3347]/90 text-[#cca96a] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4"/>
                  </div>
                </Link>
              </div>
            </div>);
        })}
      </div>
    </div>);
}
