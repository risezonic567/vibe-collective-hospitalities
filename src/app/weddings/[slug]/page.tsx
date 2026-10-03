import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Users, Clock } from "lucide-react";
import {
  getWeddings,
  getWeddingBySlug,
  getWeddingSlugs,
  getDestinationBySlug,
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
  const slugs = getWeddingSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWeddingBySlug(slug);

  if (!item) {
    return {
      title: "Wedding Celebration Not Found",
    };
  }

  const url = `${site.url}/weddings/${item.slug}`;

  return {
    title: item.title,
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

export default async function WeddingDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getWeddingBySlug(slug);

  if (!item) {
    notFound();
  }

  const allWeddings = getWeddings();
  const { prev, next } = getPrevNext(allWeddings, slug);
  const related = getRelated(allWeddings, item, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    coverImage: r.coverImage,
    subtitle: r.location,
  }));

  const destination = getDestinationBySlug(item.destinationSlug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Weddings", href: "/weddings" },
    { label: item.title },
  ];

  return (
    <>
      {/* Wedding Detail Hero with Cover Image & Single H1 */}
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

          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#b8975a] text-[#14202b] text-[10px] font-sans uppercase tracking-[0.2em] font-bold rounded-[2px]">
              Couture Celebration
            </span>
            {destination && (
              <Link
                href={`/destinations/${destination.slug}`}
                className="px-3 py-1 bg-[#142433]/80 border border-[#b8975a]/50 text-[#cca96a] text-[10px] font-sans uppercase tracking-[0.2em] rounded-[2px] hover:bg-[#b8975a] hover:text-[#14202b] transition-colors"
              >
                {destination.title}
              </Link>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal leading-[1.1] tracking-tight text-[#f7f3ec] mb-6 drop-shadow-sm">
            {item.title}
          </h1>

          <div className="w-16 h-[1px] bg-[#b8975a] mx-auto mb-6 opacity-80" aria-hidden="true" />

          <p className="text-base sm:text-lg text-[#e8dfd0] font-light max-w-2xl mx-auto leading-relaxed">
            {item.excerpt}
          </p>
        </Container>
      </section>

      {/* Narrative & Wedding Dossier */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Story Column */}
            <div className="lg:col-span-8 space-y-6">
              <Eyebrow>The Celebration Chronicle</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347]">
                The Union & Architectural Staging
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
                  Bespoke Celebration Highlights
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

              {/* Destination Chip */}
              {destination && (
                <div className="pt-6 border-t border-[#e8dfd0]">
                  <p className="text-xs uppercase tracking-[0.2em] font-sans text-[#536474] mb-2">
                    Hosted In Destination
                  </p>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffffff] border border-[#b8975a]/50 text-xs font-sans uppercase tracking-[0.15em] text-[#1d3347] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all rounded-[2px]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#b8975a]" />
                    <span>Explore {destination.title}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Wedding Key Facts Card */}
            <div className="lg:col-span-4 bg-[#ffffff] border border-[#e8dfd0] p-6 sm:p-8 rounded-[2px] shadow-sm space-y-6">
              <h3 className="text-xs font-sans uppercase tracking-[0.25em] text-[#b8975a] font-medium border-b border-[#e8dfd0] pb-3">
                Wedding Dossier
              </h3>
              <dl className="space-y-4">
                <div className="flex flex-col">
                  <dt className="text-xs text-[#536474] uppercase tracking-wider font-sans">
                    Guest Quorum
                  </dt>
                  <dd className="font-serif text-lg text-[#1d3347] font-medium flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#b8975a]" />
                    {item.guests}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs text-[#536474] uppercase tracking-wider font-sans">
                    Duration
                  </dt>
                  <dd className="font-serif text-lg text-[#1d3347] font-medium flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#b8975a]" />
                    {item.duration}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs text-[#536474] uppercase tracking-wider font-sans">
                    Location
                  </dt>
                  <dd className="font-serif text-lg text-[#1d3347] font-medium flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#b8975a]" />
                    {item.location}
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

          {/* Gallery */}
          {item.gallery && item.gallery.length > 0 && (
            <div className="pt-16 mt-16 border-t border-[#e8dfd0]">
              <div className="text-center max-w-xl mx-auto mb-10">
                <Eyebrow>Visual Symphony</Eyebrow>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mt-2">
                  Memories & Details
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
                      alt={`${item.title} wedding gallery image ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover hover-zoom-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs if present */}
          {item.faqs && item.faqs.length > 0 && (
            <div className="pt-16 mt-16 border-t border-[#e8dfd0] max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <Eyebrow>Bridal Inquiries</Eyebrow>
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
            basePath="/weddings"
            collectionLabel="Celebration"
          />
        </Container>
      </Section>

      {/* Related Weddings */}
      <DetailRelatedSection
        items={related}
        basePath="/weddings"
        title="Other Couture Weddings"
        eyebrow="Related Celebrations"
      />

      {/* CTA Band */}
      <DetailCTA
        title="Begin Directing Your Wedding"
        description="Every wedding at Vibe Collective is custom curated. Schedule an introductory conversation with our Founder and Lead Director."
        type="Wedding"
        refSlug={item.slug}
      />
    </>
  );
}
