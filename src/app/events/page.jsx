import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { media } from "@/data/media";
import { whatWeHandle, eventProcess } from "@/data/events";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { EventsFilterSection } from "@/components/sections/EventsFilterSection";
export const metadata = {
    title: "Bespoke Events & Corporate Conclaves | Vibe Collective",
    description: "Curated private dining, high-level corporate summits, milestone celebrations, and experiential galas orchestrated with precision.",
};
export default function EventsPage() {
    return (<>
      {/* 1. Page Hero */}
      <PageHero eyebrow="Conclaves & Celebrations" title={<>
            Landmark Gatherings, <span className="italic text-[#cca96a]">Masterfully</span> Staged
          </>} description="From international executive summits and luxury brand showcases to private jubilee banquets, we blend architectural design with discrete, flawless execution." image={media.events.hero} alt="Illuminated luxury ballroom celebration"/>

      {/* 2. Intro + Category Filter Grid */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Curated Repertoire</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Explore Our Portfolio
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Select a category to view past commissions, staging concepts, and guest capacities.
            </p>
          </div>

          <EventsFilterSection />
        </Container>
      </Section>

      {/* 3. "What We Handle" Checklist */}
      <Section variant="sand" className="border-b border-[#cfc2ad]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Complete Stewardship</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              What We Handle
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Our multidisciplinary production house takes total ownership of all technical, creative, and operational deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatWeHandle.map((item) => (<div key={item.title} className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] shadow-sm hover:border-[#b8975a] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1d3347] text-[#cca96a] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4"/>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-medium text-[#1d3347] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5a6a] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>))}
          </div>
        </Container>
      </Section>

      {/* 4. Event Process in Steps */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>The Trajectory</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Our Event Delivery Process
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              A structured lifecycle guaranteeing military precision wrapped in exquisite sensory beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventProcess.map((step) => (<div key={step.step} className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] flex flex-col justify-between hover:border-[#b8975a] transition-colors">
                <div>
                  <span className="font-serif text-3xl font-light text-[#b8975a] block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-3">
                    {step.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a5a6a] font-light leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>))}
          </div>
        </Container>
      </Section>

      {/* 5. Closing CTA */}
      <section className="py-24 bg-[#1d3347] text-[#f7f3ec] text-center">
        <Container size="narrow">
          <Eyebrow light className="mb-4">
            Private Commissions
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#f7f3ec] mb-6">
            Commission a Signature Event
          </h2>
          <p className="text-base text-[#e8dfd0] font-light max-w-xl mx-auto mb-8 leading-relaxed">
            From discreet family milestones to global corporate leadership retreats, let our master directors bring your vision into sharp reality.
          </p>
          <Button href="/contact" variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4"/>}>
            Start Event Enquiry
          </Button>
        </Container>
      </section>
    </>);
}
