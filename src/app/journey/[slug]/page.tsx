import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import {
  getJourneyItems,
  getJourneyItemBySlug,
  getJourneySlugs,
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
  const slugs = getJourneySlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getJourneyItemBySlug(slug);

  if (!item) {
    return {
      title: "Milestone Not Found",
    };
  }

  const url = `${site.url}/journey/${item.slug}`;

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

export default async function JourneyDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getJourneyItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const allItems = getJourneyItems();
  const { prev, next } = getPrevNext(allItems, slug);
  const related = getRelated(allItems, item, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    coverImage: r.coverImage,
    subtitle: `${r.year} Milestone`,
  }));

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Journey", href: "/journey" },
    { label: item.title },
  ];

  return (
    <>
      {/* Detail Page Hero with Item Cover Image and Single H1 */}
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
            <Eyebrow light>{item.year} Heritage Milestone</Eyebrow>
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

      {/* Main Narrative & Key Facts Section */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-8 space-y-6">
              <Eyebrow>Chapter Narrative</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347]">
                The Chronicle of {item.year}
              </h2>
              {item.description.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg text-[#4a5a6a] font-light leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              {/* Highlights List */}
              <div className="pt-6">
                <h3 className="text-lg font-serif font-medium text-[#1d3347] mb-4">
                  Signature Chapter Achievements
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

            {/* Right Key Facts Card */}
            <div className="lg:col-span-4 bg-[#ffffff] border border-[#e8dfd0] p-6 sm:p-8 rounded-[2px] shadow-sm space-y-6">
              <h3 className="text-xs font-sans uppercase tracking-[0.25em] text-[#b8975a] font-medium border-b border-[#e8dfd0] pb-3">
                Milestone Dossier
              </h3>
              <dl className="space-y-4">
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

          {/* Gallery if present */}
          {item.gallery && item.gallery.length > 0 && (
            <div className="pt-16 mt-16 border-t border-[#e8dfd0]">
              <div className="text-center max-w-xl mx-auto mb-10">
                <Eyebrow>Visual Archive</Eyebrow>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mt-2">
                  Captured Atmosphere
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
                      alt={`${item.title} visual archive ${idx + 1}`}
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
                <Eyebrow>Historical Context</Eyebrow>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mt-2">
                  Curiosities Addressed
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
            basePath="/journey"
            collectionLabel="Milestone"
          />
        </Container>
      </Section>

      {/* Related Items */}
      <DetailRelatedSection
        items={related}
        basePath="/journey"
        title="Other Milestones in Our Evolution"
        eyebrow="The Continuum"
      />

      {/* CTA Band */}
      <DetailCTA
        title="Be Part of Our Next Chapter"
        description="Whether you are planning a landmark family milestone or a confidential corporate summit, our directors await your brief."
        type="Hospitality"
        refSlug={item.slug}
      />
    </>
  );
}
