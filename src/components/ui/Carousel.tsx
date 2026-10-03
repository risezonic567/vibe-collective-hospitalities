"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "@/data/testimonials";

interface CarouselProps {
  items: Testimonial[];
  className?: string;
}

export function Carousel({ items, className = "" }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? items.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === items.length - 1 ? 0 : curr + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      next();
    } else if (distance < -minSwipeDistance) {
      prev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = items[currentIndex];

  return (
    <div
      className={`relative max-w-4xl mx-auto px-4 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Client Testimonials"
    >
      {/* Background Decorative Quote Mark */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full border border-[#b8975a]/30 flex items-center justify-center text-[#b8975a]">
          <Quote className="w-5 h-5 fill-current opacity-80" />
        </div>
      </div>

      {/* Main Quote Content */}
      <div
        className="min-h-[220px] md:min-h-[180px] flex flex-col items-center justify-center text-center transition-opacity duration-300"
        aria-live="polite"
      >
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-normal italic text-[#14202b] leading-relaxed mb-8 max-w-3xl">
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        <div className="space-y-1">
          <p className="text-base sm:text-lg font-medium text-[#1d3347] font-serif">
            {current.author}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[#b8975a] font-sans">
            {current.roleOrEvent} &middot; {current.location}
          </p>
        </div>
      </div>

      {/* Controls: Arrows and Dots */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#e8dfd0]/60 max-w-md mx-auto">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="p-2 rounded-full border border-[#e8dfd0] text-[#1d3347] hover:border-[#b8975a] hover:text-[#b8975a] transition-colors focus-visible:outline-2 focus-visible:outline-[#b8975a] cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial slides">
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-8 h-2 bg-[#b8975a]"
                    : "w-2 h-2 bg-[#cfc2ad] hover:bg-[#b8975a]/60"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="p-2 rounded-full border border-[#e8dfd0] text-[#1d3347] hover:border-[#b8975a] hover:text-[#b8975a] transition-colors focus-visible:outline-2 focus-visible:outline-[#b8975a] cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
