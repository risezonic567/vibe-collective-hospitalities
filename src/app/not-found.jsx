import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
export default function NotFound() {
    return (<section className="min-h-[80vh] flex items-center justify-center bg-[#1d3347] text-[#f7f3ec] py-24">
      <Container size="narrow" className="text-center">
        <Eyebrow light className="mb-4">
          Error 404 &middot; Page Not Found
        </Eyebrow>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[#f7f3ec] mb-6">
          The Path Has <span className="italic text-[#cca96a]">Dissolved</span>
        </h1>
        <div className="w-16 h-[1px] bg-[#b8975a] mx-auto mb-6 opacity-70" aria-hidden="true"/>
        <p className="text-base sm:text-lg text-[#e8dfd0] font-light max-w-lg mx-auto leading-relaxed mb-10">
          The sanctuary or corridor you are seeking appears to have moved, or is preserved for private access only.
        </p>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-[#b8975a] text-[#14202b] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#cca96a] transition-all rounded-[2px]">
          Return to Sanctuary (Home)
        </Link>
      </Container>
    </section>);
}
