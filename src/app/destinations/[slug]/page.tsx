import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, ArrowUpRight } from "lucide-react";
import {
  getDestinations,
  getDestinationBySlug,
  getDestinationSlugs,
  getWeddingsByDestination,
  getEventsByDestination,
  getPrevNext,
  getRelated,
} from "@/lib/content";
import { site } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Accordion } from "@/components/ui/Accordion";
import {
  DetailPrevNext,
  DetailRelatedSection,
  DetailCTA,
} from "@/components/ui/DetailNav";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getDestinationBySlug(slug);

  if (!item) {
    return {
      title: "Destination Not Found",
    };
  }

  const url = `${site.url}/destinations/${item.slug}`;

  return {
    title: `${item.title} | Luxury Destination Portfolio`,
    description: item.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${item.title} | ${site.name}`,
      description: item.excerpt,
      url,
      images: [
        {
          url: item.coverImage.src,
          alt: item.coverImage.alt,
        },
      ],
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getDestinationBySlug(slug);

  if (!item) {
    notFound();
  }

  const allDestinations = getDestinations();
  const { prev, next } = getPrevNext(allDestinations, slug);
  const related = getRelated(allDestinations, item, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    coverImage: r.coverImage,
    subtitle: r.region,
  }));

  const hostedWeddings = getWeddingsByDestination(item.slug);
  const hostedEvents = getEventsByDestination(item.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: item.title },
  ];

  return (
    <>
      {/* Destination Hero with Cover Image & Single H1 */}
      <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center justify-center bg-[#1d3347] text-[#f7f3ec] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={item.coverImage.src}
            alt={item.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-90"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#142433]/85 via-[#1d3347]/75 to-[#1d3347]"
            aria-hidden="true"
          />
        </div>

        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <Breadcrumb items={breadcrumbs} light />
          </div>

          <div className="flex justify-center mb-3">
            <span className="px-3 py-1 bg-[#b8975a] text-[#14202b] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-[2px]">
              {item.region}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal leading-[1.1] tracking-tight text-[#f7f3ec] mb-4 drop-shadow-sm">
            {item.title}
          </h1>

          <p className="text-sm sm:text-base italic text-[#cca96a] font-serif mb-6">
            {item.tagline}
          </p>

          <div className="w-16 h-[1px] bg-[#b8975a] mx-auto mb-6 opacity-80" aria-hidden="true" />

          <p className="text-base sm:text-lg text-[#e8dfd0] font-light max-w-2xl mx-auto leading-relaxed">
            {item.excerpt}
          </p>
        </Container>
      </section>

      {/* Main Narrative & Destination Dossier */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Story Column */}
            <div className="lg:col-span-8 space-y-6">
              <Eyebrow>Terroir & Atmosphere</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347]">
                Setting & Curated Possibilities
              </h2>
              {item.description.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg text-[#4a5a6a] font-light leading-relaxed"
                >
                  {p}
                </p>
              ))}

              {/* Highlights */}
              <div className="pt-6">
                <h3 className="text-lg font-serif font-medium text-[#1d3347] mb-4">
                  Signature Terroir Highlights
                </h3>
                <ul className="space-y-3">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#4a5a6a] font-light"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b8975a] mt-2 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Facts Card */}
            <div className="lg:col-span-4 bg-[#ffffff] border border-[#e8dfd0] p-6 sm:p-8 rounded-[2px] shadow-sm space-y-6">
              <h3 className="text-xs font-sans uppercase tracking-[0.25em] text-[#b8975a] font-medium border-b border-[#e8dfd0] pb-3">
                Destination Dossier
              </h3>
              <dl className="space-y-4">
                <div className="flex flex-col">
                  <dt className="text-xs text-[#536474] uppercase tracking-wider font-sans">
                    Region
                  </dt>
                  <dd className="font-serif text-lg text-[#1d3347] font-medium flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#b8975a]" />
                    {item.region}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs text-[#536474] uppercase tracking-wider font-sans">
                    Ideal Celebration Form
                  </dt>
                  <dd className="font-serif text-base text-[#1d3347] font-medium">
                    {item.idealFor}
                  </dd>
                </div>
                {item.keyFacts.map((fact, i) => (
                  <div key={i} className="flex flex-col">
                    <dt className="text-xs text-[#536474] uppercase tracking-wider font-sans">
                      {fact.label}
                    </dt>
                    <dd className="font-serif text-lg text-[#1d3347] font-medium">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Celebrations & Events Hosted in this Destination */}
          {(hostedWeddings.length > 0 || hostedEvents.length > 0) && (
            <div className="pt-16 mt-16 border-t border-[#e8dfd0]">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <Eyebrow>Curated Commissions Here</Eyebrow>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mt-2">
                  Celebrations Staged in {item.title}
                </h3>
                <p className="text-sm text-[#536474] font-light mt-2">
                  Explore previous weddings and gatherings orchestrated in this setting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hostedWeddings.map((w) => (
                  <Link
                    key={w.slug}
                    href={`/weddings/${w.slug}`}
                    className="group bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden flex flex-col hover:border-[#b8975a] hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd0]">
                      <Image
                        src={w.coverImage.src}
                        alt={w.coverImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover hover-zoom-img"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-[#1d3347]/90 text-[#cca96a] text-[9px] font-sans uppercase tracking-[0.2em] rounded-[2px]">
                          Wedding
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-xl font-medium text-[#1d3347] mb-2 group-hover:text-[#b8975a] transition-colors leading-snug">
                          {w.title}
                        </h4>
                        <p className="text-xs text-[#4a5a6a] font-light line-clamp-2">
                          {w.excerpt}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#e8dfd0] flex items-center justify-between text-xs font-sans tracking-[0.15em] uppercase text-[#1d3347] group-hover:text-[#b8975a] font-medium">
                        <span>View Wedding</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                ))}

                {hostedEvents.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/events/${e.slug}`}
                    className="group bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden flex flex-col hover:border-[#b8975a] hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd0]">
                      <Image
                        src={e.coverImage.src}
                        alt={e.coverImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover hover-zoom-img"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 bg-[#1d3347]/90 text-[#cca96a] text-[9px] font-sans uppercase tracking-[0.2em] rounded-[2px]">
                          {e.category} Event
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-xl font-medium text-[#1d3347] mb-2 group-hover:text-[#b8975a] transition-colors leading-snug">
                          {e.title}
                        </h4>
                        <p className="text-xs text-[#4a5a6a] font-light line-clamp-2">
                          {e.excerpt}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#e8dfd0] flex items-center justify-between text-xs font-sans tracking-[0.15em] uppercase text-[#1d3347] group-hover:text-[#b8975a] font-medium">
                        <span>View Event</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {item.gallery && item.gallery.length > 0 && (
            <div className="pt-16 mt-16 border-t border-[#e8dfd0]">
              <div className="text-center max-w-xl mx-auto mb-10">
                <Eyebrow>Terroir Imagery</Eyebrow>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mt-2">
                  Atmosphere & Estates
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {item.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#e8dfd0] group"
                  >
                    <Image
                      src={img}
                      alt={`${item.title} landscape ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover hover-zoom-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {item.faqs && item.faqs.length > 0 && (
            <div className="pt-16 mt-16 border-t border-[#e8dfd0] max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Eyebrow>Destination Practicalities</Eyebrow>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mt-2">
                  Frequently Answered Questions
                </h3>
              </div>
              <Accordion
                items={item.faqs.map((f, i) => ({
                  id: `faq-${i}`,
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </div>
          )}

          {/* Prev / Next Navigation */}
          <DetailPrevNext
            prev={prev}
            next={next}
            basePath="/destinations"
            collectionLabel="Destination"
          />
        </Container>
      </Section>

      {/* Related Destinations */}
      <DetailRelatedSection
        items={related}
        basePath="/destinations"
        title="Other Revered Terroirs"
        eyebrow="Alternative Settings"
      />

      {/* CTA Band */}
      <DetailCTA
        title={`Curate a Gathering in ${item.title}`}
        description="Our directorship team is on hand to arrange site inspections, buyout negotiations, and tailored proposals."
        type="Hospitality"
        refSlug={item.slug}
      />
    </>
  );
}
