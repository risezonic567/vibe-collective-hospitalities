import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { media } from "@/data/media";
import { operatingRegions, journeyMetrics } from "@/data/journey";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TimelineSection } from "@/components/sections/TimelineSection";
export const metadata = {
    title: "Our Journey & Milestones | A Decade of Timeless Celebrations",
    description: "Follow the chronological evolution of Vibe Collective Hospitality, our global destinations, operating regions, and signature milestones.",
};
export default function JourneyPage() {
    return (<>
      {/* 1. Page Hero */}
      <PageHero eyebrow="Chronicle of Excellence" title={<>
            A Decade of <span className="italic text-[#cca96a]">Atmosphere</span> & Craft
          </>} description="From intimate beginnings to orchestrating palatial royal weddings and global retreats, our story is defined by relentless passion for the art of hospitality." image={media.journey.hero} alt="Panoramic view of historic royal estate grounds"/>

      {/* 2. Timeline Section */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Chronological Milestones</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              The Path We Have Walked
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Each milestone represents an elevation of our standard and a deeper devotion to our patrons.
            </p>
          </div>

          <TimelineSection />
        </Container>
      </Section>

      {/* 3. Where We Operate Strip (Cities as elegant chips) */}
      <Section variant="sand" className="border-b border-[#cfc2ad]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>Global Destinations</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Where We Operate
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Our seasoned production teams maintain verified local artisan networks and private estate partnerships across premier destinations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {operatingRegions.map((region) => (<div key={region.city} className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-[2px] bg-[#ffffff] border border-[#e8dfd0] hover:border-[#b8975a] shadow-xs transition-all duration-300">
                <MapPin className="w-3.5 h-3.5 text-[#b8975a] group-hover:scale-110 transition-transform"/>
                <span className="font-serif text-base font-medium text-[#1d3347]">
                  {region.city}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#536474]">
                  ({region.tag})
                </span>
              </div>))}
          </div>
        </Container>
      </Section>

      {/* 4. Numbers that Tell the Story */}
      <section className="bg-[#1d3347] text-[#f7f3ec] py-24 border-y border-[#b8975a]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow light>Our Measure</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#f7f3ec] mt-3">
              Numbers That Tell The Story
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {journeyMetrics.map((metric) => (<div key={metric.label} className="p-6 rounded-[2px] bg-[#142433]/50 border border-[#b8975a]/20">
                <div className="text-3xl sm:text-5xl font-serif text-[#cca96a] font-normal mb-2">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] font-sans text-[#e8dfd0] font-light">
                  {metric.label}
                </div>
              </div>))}
          </div>
        </Container>
      </section>

      {/* 5. Closing CTA */}
      <Section variant="ivory">
        <Container size="narrow" className="text-center">
          <Eyebrow>Be Part of Our Next Chapter</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-4 mb-6">
            Your Milestone Deserves a Masterpiece
          </h2>
          <p className="text-base text-[#4a5a6a] font-light max-w-xl mx-auto leading-relaxed mb-8">
            Tell us about your upcoming date or vision, and let our directors craft a proposal worthy of your legacy.
          </p>
          <Button href="/contact" variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4"/>}>
            Connect With A Director
          </Button>
        </Container>
      </Section>
    </>);
}
