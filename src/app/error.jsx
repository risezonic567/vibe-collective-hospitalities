"use client";
import React, { useEffect } from "react";
import { Container } from "@/components/ui/Container";
export default function ErrorBoundary({ error, reset, }) {
    useEffect(() => {
        console.error("Application error boundary captured:", error);
    }, [error]);
    return (<section className="min-h-[75vh] flex items-center justify-center bg-[#1d3347] text-[#f7f3ec] py-24">
      <Container size="narrow" className="text-center">
        <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#f7f3ec] mb-4">
          An Interruption in <span className="italic text-[#cca96a]">Harmony</span>
        </h2>
        <p className="text-sm sm:text-base text-[#e8dfd0] font-light max-w-md mx-auto mb-8 leading-relaxed">
          We encountered an unexpected technical nuance. Please attempt to refresh this chapter or contact our concierge desk.
        </p>
        <button type="button" onClick={() => reset()} className="inline-flex items-center justify-center px-8 py-4 bg-[#b8975a] text-[#14202b] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#cca96a] transition-all rounded-[2px] cursor-pointer">
          Re-attempt Composition
        </button>
      </Container>
    </section>);
}
