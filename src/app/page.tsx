import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowDown, ArrowRight, Sparkles, Compass, Castle, Cpu } from "lucide-react";
import { site } from "@/config/site";
import { media } from "@/data/media";
import { stats } from "@/data/stats";
import { testimonials } from "@/data/testimonials";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { CountUp } from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "Where Every Moment Becomes a Memory",
  description:
    "Luxury wedding curation, landmark private events, and bespoke hospitality retreats across royal palaces and global destinations.",
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EventPlanner"],
    name: site.name,
    url: site.url,
    logo: `${site.url}/opengraph-image`,
    description: site.tagline,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address[0],
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560001",
      addressCountry: "IN",
    },
    sameAs: [
      site.socials.instagram,
      site.socials.facebook,
      site.socials.youtube,
      site.socials.linkedin,
    ],
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. Hero Section - Full Viewport */}
      <section className="relative min-h-screen flex items-center justify-center text-[#f7f3ec] bg-[#1d3347] overflow-hidden">
        {/* Background Visual: Video with Poster Fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={media.hero.poster}
            className="w-full h-full object-cover filter brightness-[0.78]"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>

          {/* Fallback Image in case video is unsupported or pending */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={media.hero.poster}
              alt="Luxury palace celebration at dusk"
              fill
              priority
              sizes="100vw"
              className="object-cover filter brightness-75"
            />
          </div>

          {/* Gradients to assure WCAG AA text contrast */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#1d3347] via-[#142433]/70 to-[#142433]/50"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-radial from-transparent via-[#14202b]/40 to-[#14202b]/80"
            aria-hidden="true"
          />
        </div>

        {/* Hero Content */}
        <Container className="relative z-10 text-center pt-28 pb-16">
          <div className="flex justify-center mb-6">
            <Eyebrow light>Hospitality &middot; Events &middot; Weddings</Eyebrow>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-normal leading-[1.05] tracking-tight text-[#f7f3ec] max-w-5xl mx-auto mb-6 drop-shadow-md">
            Where every <span className="italic text-[#cca96a] font-normal">moment</span> becomes a memory.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#e8dfd0] font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Architects of extraordinary celebrations and curated private stays across India&apos;s regal landscapes and world-renowned destinations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              href="/contact"
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Plan with us
            </Button>
            <Button
              href="/journey"
              variant="outline"
              size="lg"
              className="text-[#f7f3ec] border-[#f7f3ec]/80 hover:bg-[#f7f3ec] hover:text-[#1d3347]"
            >
              Our journey
            </Button>
          </div>
        </Container>

        {/* Scroll Down Indicator */}
        <a
          href="#intro"
          aria-label="Scroll down to introduction"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#f7f3ec]/80 hover:text-[#b8975a] transition-colors group cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#b8975a]" />
        </a>
      </section>

      {/* 2. Intro Statement */}
      <Section id="intro" variant="ivory" className="border-b border-[#e8dfd0]">
        <Container size="narrow" className="text-center">
          <div className="flex justify-center mb-6">
            <Eyebrow>The Philosophy</Eyebrow>
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-serif font-normal text-[#14202b] leading-[1.3] tracking-tight">
            We do not merely organize events; we compose living tapestries.
            Where ancient royal hospitality meets contemporary architectural scenography,
            leaving you free to be completely present in your celebration.
          </p>
          <div className="w-20 h-[1px] bg-[#b8975a] mx-auto mt-10 opacity-70" aria-hidden="true" />
        </Container>
      </Section>

      {/* 3. Three Entry Cards */}
      <Section variant="sand" className="py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Curated Portfolios</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#14202b] mt-3">
              Explore Our Realms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Weddings */}
            <Link
              href="/weddings"
              className="group relative h-[480px] sm:h-[540px] rounded-[2px] overflow-hidden border border-[#cfc2ad] shadow-md flex flex-col justify-end p-8 text-[#f7f3ec]"
            >
              <Image
                src={media.home.entryWeddings}
                alt="Luxury wedding table setting"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover-zoom-img filter brightness-[0.82]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#142433] via-[#142433]/40 to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#cca96a] font-sans font-medium">
                  Couture Celebrations
                </span>
                <h3 className="text-3xl font-serif font-medium text-[#f7f3ec]">
                  Weddings
                </h3>
                <p className="text-sm text-[#e8dfd0] font-light leading-relaxed line-clamp-2">
                  Palatial multi-day affairs, romantic coastal vows, and bespoke bridal hospitality.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#b8975a] group-hover:text-[#cca96a] transition-colors font-medium">
                  <span>Explore Weddings</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card 2: Events */}
            <Link
              href="/events"
              className="group relative h-[480px] sm:h-[540px] rounded-[2px] overflow-hidden border border-[#cfc2ad] shadow-md flex flex-col justify-end p-8 text-[#f7f3ec]"
            >
              <Image
                src={media.home.entryEvents}
                alt="High-end gala event"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover-zoom-img filter brightness-[0.82]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#142433] via-[#142433]/40 to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#cca96a] font-sans font-medium">
                  Landmark Gatherings
                </span>
                <h3 className="text-3xl font-serif font-medium text-[#f7f3ec]">
                  Events
                </h3>
                <p className="text-sm text-[#e8dfd0] font-light leading-relaxed line-clamp-2">
                  Corporate summits, silver anniversaries, philanthropy galas, and private dining.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#b8975a] group-hover:text-[#cca96a] transition-colors font-medium">
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Card 3: Journey */}
            <Link
              href="/journey"
              className="group relative h-[480px] sm:h-[540px] rounded-[2px] overflow-hidden border border-[#cfc2ad] shadow-md flex flex-col justify-end p-8 text-[#f7f3ec]"
            >
              <Image
                src={media.home.entryJourney}
                alt="Luxury resort architecture"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover-zoom-img filter brightness-[0.82]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#142433] via-[#142433]/40 to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#cca96a] font-sans font-medium">
                  Our Evolution
                </span>
                <h3 className="text-3xl font-serif font-medium text-[#f7f3ec]">
                  Our Journey
                </h3>
                <p className="text-sm text-[#e8dfd0] font-light leading-relaxed line-clamp-2">
                  A decade of royal heritage, signature milestones, and trusted client discretion.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#b8975a] group-hover:text-[#cca96a] transition-colors font-medium">
                  <span>Explore Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </Section>

      {/* 4. Everything Under One Roof - Four Pillars */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Holistic Excellence</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#14202b] mt-3">
              Everything Under One Roof
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              A singular house uniting visionary creators, production masters, and white-glove concierges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] hover:border-[#b8975a] hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#1d3347] text-[#b8975a] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-3">
                Planning & Direction
              </h3>
              <p className="text-sm text-[#4a5a6a] font-light leading-relaxed">
                Strategic timelines, budgeting transparency, vendor choreography, and discreet executive liaison.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] hover:border-[#b8975a] hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#1d3347] text-[#b8975a] flex items-center justify-center mb-6">
                <Castle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-3">
                Hospitality & Stays
              </h3>
              <p className="text-sm text-[#4a5a6a] font-light leading-relaxed">
                Palace buyouts, guest itinerary design, bespoke gifting suites, and dedicated 24/7 concierges.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] hover:border-[#b8975a] hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#1d3347] text-[#b8975a] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-3">
                Design & Décor
              </h3>
              <p className="text-sm text-[#4a5a6a] font-light leading-relaxed">
                Spatial scenography, sculptural floral installations, bespoke stationery, and lighting scores.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#ffffff] border border-[#e8dfd0] p-8 rounded-[2px] hover:border-[#b8975a] hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#1d3347] text-[#b8975a] flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#1d3347] mb-3">
                Experience & Tech
              </h3>
              <p className="text-sm text-[#4a5a6a] font-light leading-relaxed">
                Architectural projection mapping, world-class sound engineering, dynamic stages, and artist curation.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Stats Strip */}
      <section className="bg-[#1d3347] text-[#f7f3ec] py-20 border-y border-[#b8975a]/30">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            {stats.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#cca96a]">
                  <CountUp end={item.value} suffix={item.suffix} />
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-sans text-[#f7f3ec] font-medium pt-1">
                  {item.label}
                </h3>
                <p className="text-xs text-[#e8dfd0]/70 font-light max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Featured Moments Gallery */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Eyebrow>Visual Chronicles</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#14202b] mt-3">
              Featured Moments
            </h2>
            <p className="text-sm sm:text-base text-[#536474] font-light mt-4">
              Fleeting seconds preserved through timeless architectural artistry and emotive celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.home.moments.map((moment, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#e8dfd0] shadow-sm"
              >
                <Image
                  src={moment.url}
                  alt={`${moment.title} in ${moment.location}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover-zoom-img"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#142433] via-[#142433]/30 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-500 flex flex-col justify-end p-6 text-[#f7f3ec]"
                  aria-hidden="true"
                >
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#cca96a]">
                    {moment.location}
                  </span>
                  <h3 className="text-xl font-serif font-medium text-[#f7f3ec]">
                    {moment.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Testimonials Carousel */}
      <Section variant="sand" className="border-b border-[#cfc2ad]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Patron Words</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#14202b] mt-3">
              Voices of Distinction
            </h2>
          </div>

          <Carousel items={testimonials} />
        </Container>
      </Section>

      {/* 8. Story + Strong CTA Band */}
      <section className="relative py-24 md:py-32 bg-[#1d3347] text-[#f7f3ec] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#b8975a_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden="true"
        />
        <Container size="narrow" className="relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <Eyebrow light>Begin The Dialogue</Eyebrow>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal leading-[1.15] text-[#f7f3ec] mb-8">
            Let&apos;s create something <span className="italic text-[#cca96a]">unforgettable</span>.
          </h2>
          <p className="text-base sm:text-lg text-[#e8dfd0] font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Whether you envision an intimate cliffside gathering, an imperial palace wedding in Rajasthan, or a high-level private summit, our directors are at your service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Initiate Consultation
            </Button>
            <Button
              href="/weddings"
              variant="outline"
              size="lg"
              className="text-[#f7f3ec] border-[#f7f3ec]/80 hover:bg-[#f7f3ec] hover:text-[#1d3347]"
            >
              Discover Weddings
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
