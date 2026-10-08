import React from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { ParallaxImage } from "./ParallaxImage";
export function PageHero({ eyebrow, title, description, image, alt, }) {
    return (<section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center justify-center bg-[#1d3347] text-[#f7f3ec] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
      {/* Background Image with Cinematic Overlay */}
    <div className="absolute inset-0 z-0">
  <ParallaxImage src={image} alt={alt} className="object-cover object-center"/>
  <div className="absolute inset-0 bg-gradient-to-b from-[#142433]/60 via-[#1d3347]/30 to-[#1d3347]/70" aria-hidden="true"/> 
   <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#12212e]/30" aria-hidden="true"/>
</div>
      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-4">
          <Eyebrow light>{eyebrow}</Eyebrow>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.08] tracking-tight text-[#f7f3ec] mb-6 drop-shadow-sm">
          {title}
        </h1>

        <div className="w-16 h-[1px] bg-[#b8975a] mx-auto mb-6 opacity-80" aria-hidden="true"/>

        <p className="text-base sm:text-lg md:text-xl text-[#e8dfd0] font-light max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </Container>
    </section>)
}
