import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import { getDestinations } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sanctuaries & Destinations | Royal Palaces, Coasts & Alpine Lodges",
  description:
    "Explore our portfolio of world-renowned destinations, from royal Rajasthan palace buyouts and coastal Goa manors to Tuscan hills and Swiss chalets.",
};

export default function DestinationsIndexPage() {
  const destinations = getDestinations();

  return (
    <>
      {/* 1. Page Hero with single H1 */}
      <PageHero
        eyebrow="Sanctuaries & Terroirs"
        title={
          <>
            Iconic Settings for <span className="italic text-[#cca96a]">Unforgettable</span> Gatherings
          </>
        }
        description="Our privileged portfolio of heritage palace buyouts, serene private coastal compounds, and romantic European vineyard estates."
        image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80"
        alt="Panoramic view of royal palace and estate gardens"
      />

      {/* 2. Destinations Grid */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Global Atelier Portfolio</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Curated Destinations
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Each setting offers established local artisan networks, verified production riders, and discrete private buyouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden flex flex-col hover:border-[#b8975a] hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd0]">
                  <Image
                    src={dest.coverImage.src}
                    alt={dest.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover-zoom-img"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#1d3347]/90 text-[#cca96a] text-[10px] font-sans uppercase tracking-[0.2em] backdrop-blur-sm rounded-[2px]">
                      {dest.region}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#b8975a] uppercase tracking-wider font-sans font-medium mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dest.region}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-medium text-[#1d3347] mb-2 group-hover:text-[#b8975a] transition-colors leading-snug">
                      {dest.title}
                    </h3>

                    <p className="text-xs italic text-[#536474] mb-3">
                      {dest.tagline}
                    </p>

                    <p className="text-sm text-[#4a5a6a] font-light leading-relaxed mb-4">
                      {dest.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e8dfd0] flex items-center justify-between text-xs font-sans tracking-[0.15em] uppercase text-[#1d3347] group-hover:text-[#b8975a] font-medium transition-colors">
                    <span>Explore Destination</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. Closing CTA */}
      <section className="py-24 bg-[#1d3347] text-[#f7f3ec] text-center">
        <Container size="narrow">
          <Eyebrow light className="mb-4">
            Private Scouting
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#f7f3ec] mb-6">
            Seeking an Unlisted Sanctuary?
          </h2>
          <p className="text-base text-[#e8dfd0] font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Beyond our established destinations, our directors coordinate confidential scouting for unlisted private estates, private islands, and ancestral manors globally.
          </p>
          <Button
            href="/contact?type=Hospitality&ref=private-scouting"
            variant="gold"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Inquire for Private Scouting
          </Button>
        </Container>
      </section>
    </>
  );
}
