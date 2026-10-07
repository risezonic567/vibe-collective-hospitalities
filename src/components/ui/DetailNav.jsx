import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
export function DetailPrevNext({ prev, next, basePath, collectionLabel, }) {
    if (!prev && !next)
        return null;
    return (<div className="py-12 border-t border-[#e8dfd0] my-8">
      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6">
        {/* Previous */}
        <div className="flex-1">
          {prev ? (<Link href={`${basePath}/${prev.slug}`} className="group flex flex-col p-6 rounded-[2px] border border-[#e8dfd0] hover:border-[#b8975a] bg-[#ffffff] transition-all h-full">
              <span className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] text-[#536474] group-hover:text-[#b8975a] transition-colors mb-2">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"/>
                Previous {collectionLabel}
              </span>
              <span className="font-serif text-lg sm:text-xl font-medium text-[#1d3347] group-hover:text-[#b8975a] transition-colors line-clamp-1">
                {prev.title}
              </span>
            </Link>) : (<div className="hidden sm:block h-full"/>)}
        </div>

        {/* Next */}
        <div className="flex-1">
          {next ? (<Link href={`${basePath}/${next.slug}`} className="group flex flex-col items-end text-right p-6 rounded-[2px] border border-[#e8dfd0] hover:border-[#b8975a] bg-[#ffffff] transition-all h-full">
              <span className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.25em] text-[#536474] group-hover:text-[#b8975a] transition-colors mb-2">
                Next {collectionLabel}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
              </span>
              <span className="font-serif text-lg sm:text-xl font-medium text-[#1d3347] group-hover:text-[#b8975a] transition-colors line-clamp-1">
                {next.title}
              </span>
            </Link>) : (<div className="hidden sm:block h-full"/>)}
        </div>
      </div>
    </div>);
}
export function DetailRelatedSection({ items, basePath, title = "Curated Continuations", eyebrow = "Discover More", }) {
    if (!items || items.length === 0)
        return null;
    return (<section className="py-20 md:py-28 bg-[#fdfbf7] border-t border-[#e8dfd0]">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1d3347] mt-3">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (<Link key={item.slug} href={`${basePath}/${item.slug}`} className="group bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden flex flex-col hover:border-[#b8975a] hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd0]">
                <Image src={item.coverImage.src} alt={item.coverImage.alt || item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover hover-zoom-img"/>
                {item.subtitle && (<div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#1d3347]/90 text-[#cca96a] text-[10px] font-sans uppercase tracking-[0.2em] backdrop-blur-sm rounded-[2px]">
                      {item.subtitle}
                    </span>
                  </div>)}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#1d3347] mb-2 group-hover:text-[#b8975a] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a5a6a] font-light leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#e8dfd0] flex items-center justify-between text-xs font-sans tracking-[0.15em] uppercase text-[#1d3347] group-hover:text-[#b8975a] font-medium transition-colors">
                  <span>Explore Detail</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                </div>
              </div>
            </Link>))}
        </div>
      </Container>
    </section>);
}
export function DetailCTA({ title = "Orchestrate Your Vision", description = "Connect directly with our master directors to reserve dates, discuss spatial requirements, and begin tailored curation.", type, refSlug, }) {
    const contactHref = `/contact?type=${encodeURIComponent(type)}&ref=${encodeURIComponent(refSlug)}`;
    return (<section className="py-20 md:py-28 bg-[#1d3347] text-[#f7f3ec] text-center border-t border-[#b8975a]/30">
      <Container size="narrow">
        <Eyebrow light className="mb-4">
          Private Inquiry
        </Eyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#f7f3ec] mb-6">
          {title}
        </h2>
        <p className="text-base text-[#e8dfd0] font-light max-w-xl mx-auto mb-8 leading-relaxed">
          {description}
        </p>
        <Link href={contactHref} className="inline-flex items-center justify-center px-8 py-4 bg-[#b8975a] text-[#14202b] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:bg-[#cca96a] transition-all rounded-[2px] group">
          <span>Enquire Regarding This Celebration</span>
          <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform"/>
        </Link>
      </Container>
    </section>);
}
