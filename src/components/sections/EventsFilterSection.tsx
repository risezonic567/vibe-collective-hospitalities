"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { eventCategories, EventCategory } from "@/data/events";
import { getEvents } from "@/lib/content";
import { ArrowUpRight, MapPin, Users } from "lucide-react";

export function EventsFilterSection() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All");
  const allEvents = getEvents();

  const filteredEvents =
    selectedCategory === "All"
      ? allEvents
      : allEvents.filter((item) => item.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
        {eventCategories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              data-filter-btn={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-[2px] text-xs font-sans tracking-[0.15em] uppercase transition-all duration-300 border cursor-pointer ${
                isSelected
                  ? "bg-[#1d3347] text-[#f7f3ec] border-[#1d3347] shadow-sm font-medium"
                  : "bg-transparent text-[#14202b] border-[#e8dfd0] hover:border-[#b8975a] hover:bg-[#ffffff]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Filtered Grid - Whole card is a Link */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-testid="events-grid"
      >
        {filteredEvents.map((item) => (
          <Link
            key={item.slug}
            href={`/events/${item.slug}`}
            data-testid="event-card"
            data-category={item.category}
            className="group bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden flex flex-col hover:border-[#b8975a] hover:shadow-lg transition-all duration-500 focus-visible:outline-2 focus-visible:outline-[#b8975a]"
          >
            {/* Image container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd0]">
              <Image
                src={item.coverImage.src}
                alt={item.coverImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hover-zoom-img"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-[#1d3347]/90 text-[#b8975a] text-[10px] font-sans uppercase tracking-[0.2em] font-medium backdrop-blur-sm rounded-[2px]">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-[#536474] mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#b8975a]" aria-hidden="true" />
                    {item.location}
                  </span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#b8975a]" aria-hidden="true" />
                    {item.guests}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#1d3347] mb-3 group-hover:text-[#b8975a] transition-colors leading-snug">
                  {item.title}
                </h2>

                <p className="text-sm text-[#4a5a6a] font-light leading-relaxed mb-6">
                  {item.blurb}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e8dfd0] flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.15em] uppercase text-[#1d3347] font-medium group-hover:text-[#b8975a] transition-colors">
                  <span>Explore Event</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16 text-[#536474]">
          <p className="font-serif text-xl italic mb-2">No celebrations found in this category.</p>
          <p className="text-sm">Please select another category or contact our concierge.</p>
        </div>
      )}
    </div>
  );
}
