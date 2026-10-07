import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { media } from "@/data/media";
import { aboutData } from "@/data/about";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
export const metadata = {
    title: "About Our House | Heritage, Craftsmanship & Vision",
    description: "Learn about Vibe Collective Hospitality, our bespoke directorship philosophy, artisanal values, and leadership team crafting timeless memories.",
};
export default function AboutPage() {
    return (<>
      {/* 1. Page Hero */}
      <PageHero eyebrow="Our Heritage & Philosophy" title={<>
            Composing Elegance with <span className="italic text-[#cca96a]">Reverence</span>
          </>} description="Founded on the conviction that bespoke hospitality is an enduring art form — where every celebration is tailored with quiet distinction and poetic intention." image={media.about.hero} alt="Refined luxury pavilion architecture"/>

      {/* 2. Our Story Section */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Imagery */}
            <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden border border-[#e8dfd0] shadow-md group">
              <Image src={media.about.story} alt="Architectural heritage resort detail" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover hover-zoom-img"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#142433]/70 via-transparent to-transparent" aria-hidden="true"/>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#1d3347]/90 backdrop-blur-sm border border-[#b8975a]/30 text-[#f7f3ec] rounded-[2px]">
                <p className="font-serif italic text-base sm:text-lg">
                  &ldquo;A celebration should feel like an heirloom: precious, authentic, and unmistakably yours.&rdquo;
                </p>
                <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#cca96a] mt-2">
                  Devina Roy &middot; Founder
                </p>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <Eyebrow>The Genesis</Eyebrow>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] leading-tight">
                Born From a Passion for Timeless Atmosphere
              </h2>
              <p className="text-base text-[#4a5a6a] font-light leading-relaxed">
                Vibe Collective Hospitality was founded over a decade ago in response to a growing standardization in luxury events. We observed grand budgets poured into repetitive formulas that lacked warmth, intimacy, and architectural reverence.
              </p>
              <p className="text-base text-[#4a5a6a] font-light leading-relaxed">
                We set out to assemble a bespoke atelier—bringing together classical interior architects, master florists, discrete private butlers, and visionary culinary directors under one unified standard of excellence.
              </p>
              <p className="text-base text-[#4a5a6a] font-light leading-relaxed">
                Today, our commissions span royal palace buyouts in Mewar, tranquil private island gatherings, and executive global assemblies where our hosts are celebrated not for excess, but for exquisite taste.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Mission & Vision */}
      <Section variant="sand" className="border-b border-[#cfc2ad]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#ffffff] border border-[#e8dfd0] p-8 sm:p-10 rounded-[2px] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#b8975a] font-medium block mb-3">
                  Our Mission
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mb-4">
                  {aboutData.mission.headline}
                </h3>
                <p className="text-sm sm:text-base text-[#4a5a6a] font-light leading-relaxed">
                  {aboutData.mission.statement}
                </p>
              </div>
            </div>

            <div className="bg-[#ffffff] border border-[#e8dfd0] p-8 sm:p-10 rounded-[2px] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#b8975a] font-medium block mb-3">
                  Our Vision
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mb-4">
                  {aboutData.vision.headline}
                </h3>
                <p className="text-sm sm:text-base text-[#4a5a6a] font-light leading-relaxed">
                  {aboutData.vision.statement}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Values (4 cards) */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Core Principles</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              The Tenets of Our Atelier
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              The unchanging convictions that guide every decision, from initial concept to the farewell toast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.values.map((v) => (<div key={v.id} className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] hover:border-[#b8975a] hover:shadow-md transition-all duration-300">
                <span className="text-3xl font-serif font-light text-[#b8975a] block mb-4">
                  {v.number}
                </span>
                <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-2">
                  {v.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.15em] text-[#b8975a] font-sans mb-4">
                  {v.subtitle}
                </p>
                <p className="text-sm text-[#4a5a6a] font-light leading-relaxed">
                  {v.description}
                </p>
              </div>))}
          </div>
        </Container>
      </Section>

      {/* 5. How We Work (4 numbered steps) */}
      <Section variant="sand" className="border-b border-[#cfc2ad]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>The Methodology</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              How We Work
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              A disciplined four-phase approach bridging visionary creative direction and flawless precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.howWeWork.map((step) => (<div key={step.step} className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#1d3347] text-[#cca96a] flex items-center justify-center font-serif text-lg font-medium mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#b8975a] font-sans mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-sm text-[#4a5a6a] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>))}
          </div>
        </Container>
      </Section>

      {/* 6. Leadership & Team Grid */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>The Directors</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Leadership & Curators
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Seasoned pioneers in spatial architecture, international diplomacy, gastronomy, and white-glove hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {media.about.team.map((person) => (<div key={person.name} className="bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden group hover:border-[#b8975a] hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e8dfd0]">
                  <Image src={person.image} alt={person.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover hover-zoom-img"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142433]/70 via-transparent to-transparent opacity-60" aria-hidden="true"/>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-1">
                      {person.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#b8975a] font-sans font-medium mb-3">
                      {person.role}
                    </p>
                    <p className="text-xs text-[#536474] font-light leading-relaxed">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </div>))}
          </div>
        </Container>
      </Section>

      {/* 7. Closing CTA */}
      <section className="py-24 bg-[#1d3347] text-[#f7f3ec] text-center">
        <Container size="narrow">
          <Eyebrow light className="mb-4">
            Curate With Us
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#f7f3ec] mb-6">
            Experience the Art of Immersive Hospitality
          </h2>
          <p className="text-base text-[#e8dfd0] font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Our directors accept a strictly limited number of commissions each calendar year to ensure unwavering personal attention.
          </p>
          <Button href="/contact" variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4"/>}>
            Initiate Conversation
          </Button>
        </Container>
      </section>
    </>);
}
