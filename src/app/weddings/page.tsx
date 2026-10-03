import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Castle,
  Sparkles,
  HeartHandshake,
  Music,
  Plane,
} from "lucide-react";
import { media } from "@/data/media";
import { weddingData } from "@/data/weddings";
import { getDestinations, getWeddings } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Destination Weddings & Regal Celebrations | Vibe Collective",
  description:
    "Palatial destination wedding planning, romantic spatial scenography, and royal hospitality curated across India and international estates.",
};

const serviceIcons: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6" />,
  Castle: <Castle className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
  Plane: <Plane className="w-6 h-6" />,
};

export default function WeddingsPage() {
  const destinations = getDestinations();
  const celebrations = getWeddings();

  return (
    <>
      {/* 1. Romantic Page Hero */}
      <PageHero
        eyebrow="Couture Destination Weddings"
        title={
          <>
            Where Sacred Vows Meet <span className="italic text-[#cca96a]">Poetic</span> Grandeur
          </>
        }
        description="Crafting transcendent wedding celebrations across royal palaces, historic forts, and secluded private coastal manors."
        image={media.weddings.hero}
        alt="Romantic evening wedding table setup with candles and florals"
      />

      {/* 2. Philosophy Intro */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container size="narrow" className="text-center">
          <div className="flex justify-center mb-6">
            <Eyebrow>The Bridal Philosophy</Eyebrow>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mb-6">
            {weddingData.philosophy.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#4a5a6a] font-light leading-relaxed max-w-2xl mx-auto">
            {weddingData.philosophy.body}
          </p>
          <div className="w-20 h-[1px] bg-[#b8975a] mx-auto mt-10 opacity-70" aria-hidden="true" />
        </Container>
      </Section>

      {/* 3. Featured Couture Celebrations (Slug Cards) */}
      <Section variant="sand" className="border-b border-[#cfc2ad]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Realized Masterpieces</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Couture Wedding Chapters
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Explore bespoke commissions staged across royal lake palaces, sandstone forts, and Mediterranean estates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {celebrations.map((item) => (
              <Link
                key={item.slug}
                href={`/weddings/${item.slug}`}
                className="group bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden flex flex-col hover:border-[#b8975a] hover:shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#b8975a]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd0]">
                  <Image
                    src={item.coverImage.src}
                    alt={item.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover-zoom-img"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#1d3347]/90 text-[#cca96a] text-[10px] font-sans uppercase tracking-[0.2em] backdrop-blur-sm rounded-[2px]">
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#1d3347] mb-2 group-hover:text-[#b8975a] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4a5a6a] font-light leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e8dfd0] flex items-center justify-between text-xs font-sans tracking-[0.15em] uppercase text-[#1d3347] group-hover:text-[#b8975a] font-medium transition-colors">
                    <span>Explore Celebration</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Services (6 pillars) */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Comprehensive Stewardship</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Our Curated Wedding Services
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              From the initial scouting of unlisted private estates to the morning-after farewell champagne brunch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddingData.services.map((service) => (
              <div
                key={service.id}
                className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] shadow-sm hover:border-[#b8975a] hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#1d3347] text-[#cca96a] flex items-center justify-center mb-6">
                  {serviceIcons[service.icon] || <Sparkles className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-[#4a5a6a] font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Destination Highlights - Every card links to /destinations/[slug] */}
      <Section variant="sand" className="border-b border-[#cfc2ad]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>Sanctuaries & Palaces</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Iconic Wedding Destinations
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Privileged partnerships across the most revered heritage properties in Rajasthan, coastal sanctuaries, and Mediterranean villas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden flex flex-col hover:border-[#b8975a] hover:shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#b8975a]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd0]">
                  <Image
                    src={dest.coverImage.src}
                    alt={dest.coverImage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover hover-zoom-img"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#1d3347]/90 text-[#cca96a] text-[10px] font-sans uppercase tracking-[0.2em] backdrop-blur-sm rounded-[2px]">
                      {dest.region}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-1 group-hover:text-[#b8975a] transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-xs italic text-[#536474] mb-3">
                      {dest.tagline}
                    </p>
                    <p className="text-xs text-[#b8975a] font-sans uppercase tracking-[0.15em] font-medium">
                      Ideal for: {dest.idealFor}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#e8dfd0] flex items-center justify-between text-xs font-sans tracking-[0.15em] uppercase text-[#1d3347] group-hover:text-[#b8975a] font-medium">
                    <span>View Destination</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#1d3347] text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#1d3347] hover:bg-[#1d3347] hover:text-[#f7f3ec] transition-all rounded-[2px]"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* 6. Signature Packages (3 tiers) */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Tailored Directorship</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Signature Wedding Frameworks
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Each commission is entirely bespoke; these tiers illustrate our scope and depth of engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {weddingData.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-[#ffffff] rounded-[2px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  pkg.isPopular
                    ? "border-2 border-[#b8975a] shadow-xl lg:-translate-y-2"
                    : "border border-[#e8dfd0] shadow-sm hover:border-[#b8975a]"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#b8975a] text-[#14202b] text-[10px] font-sans uppercase tracking-[0.25em] font-bold rounded-[2px] shadow-sm">
                    Most Requested Framework
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-serif font-medium text-[#1d3347] mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#536474] font-light mb-4">
                    {pkg.tagline}
                  </p>

                  <div className="py-4 border-y border-[#e8dfd0] mb-6">
                    <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#b8975a] block mb-1">
                      Directorship Scope
                    </span>
                    <span className="text-2xl font-serif text-[#1d3347]">
                      {pkg.pricing}
                    </span>
                    <span className="text-xs text-[#536474] block mt-1">
                      ({pkg.highlight})
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#4a5a6a] font-light">
                        <Check className="w-4 h-4 text-[#b8975a] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  href={`/contact?type=Wedding&ref=${pkg.id}`}
                  variant={pkg.isPopular ? "gold" : "primary"}
                  className="w-full text-center"
                >
                  Enquire for {pkg.name}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Wedding Visual Gallery */}
      <Section variant="sand" className="border-b border-[#cfc2ad]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Visual Symphony</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Glimpses of Vows & Feasts
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {media.weddings.gallery.map((imgUrl, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#e8dfd0] shadow-xs"
              >
                <Image
                  src={imgUrl}
                  alt={`Vibe Collective luxury wedding celebration ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover hover-zoom-img"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. FAQ Accordion */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>Inquiries & Clarity</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1d3347] mt-3">
              Frequently Addressed Curiosities
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Answers to help you understand our engagement process, transparency, and operational rigor.
            </p>
          </div>

          <Accordion items={weddingData.faqs} />
        </Container>
      </Section>

      {/* 9. Strong Closing CTA */}
      <section className="py-24 bg-[#1d3347] text-[#f7f3ec] text-center">
        <Container size="narrow">
          <Eyebrow light className="mb-4">
            Your Wedding Chapter
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#f7f3ec] mb-6">
            Begin Orchestrating Your Legacy
          </h2>
          <p className="text-base text-[#e8dfd0] font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Reserve a confidential consultation with our Founder and Lead Wedding Director to explore dates, venues, and creative possibilities.
          </p>
          <Button
            href="/contact?type=Wedding&ref=general-wedding-enquiry"
            variant="gold"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Request Private Consultation
          </Button>
        </Container>
      </section>
    </>
  );
}
