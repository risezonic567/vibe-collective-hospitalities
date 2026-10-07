import React from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { site } from "@/config/site";
import { media } from "@/data/media";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
export const metadata = {
    title: "Contact Our Concierge | Bespoke Consultation",
    description: "Initiate a confidential dialogue with our event directors. Inquire regarding palace weddings, curated estate retreats, and luxury gatherings.",
};
export default function ContactPage() {
    const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello ${site.shortName} Concierge, I would like to schedule a private celebration consultation.`)}`;
    return (<>
      {/* 1. Page Hero */}
      <PageHero eyebrow="Confidential Concierge" title={<>
            Initiate a <span className="italic text-[#cca96a]">Private</span> Dialogue
          </>} description="Whether you have an established blueprint or are taking the first steps into celebrating a milestone, our directors welcome your correspondence." image={media.contact.hero} alt="Atmospheric luxury lounge and concierge reception"/>

      {/* 2. Main Two-Column Contact Section */}
      <Section variant="ivory" className="border-b border-[#e8dfd0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Contact, Office Details, Map Card */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <Eyebrow>Direct Access</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1d3347] mt-3 mb-4">
                  The Concierge Desk
                </h2>
                <p className="text-base text-[#4a5a6a] font-light leading-relaxed">
                  Every inquiry is handled with the utmost discretion and assigned to a senior partner who will personally guide your celebration from inception to farewell.
                </p>
              </div>

              {/* Direct Details Card */}
              <div className="bg-[#ffffff] border border-[#e8dfd0] p-6 sm:p-8 rounded-[2px] shadow-sm space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1d3347] text-[#cca96a] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4"/>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-sans text-[#b8975a] font-medium mb-1">
                      Registered Atelier
                    </h3>
                    <p className="text-sm text-[#14202b] font-light leading-relaxed">
                      {site.address[0]}
                      <br />
                      {site.address[1]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1d3347] text-[#cca96a] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4"/>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-sans text-[#b8975a] font-medium mb-1">
                      Direct Telephony
                    </h3>
                    <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`} className="text-sm text-[#14202b] hover:text-[#b8975a] transition-colors">
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1d3347] text-[#cca96a] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4"/>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-sans text-[#b8975a] font-medium mb-1">
                      Electronic Mail
                    </h3>
                    <a href={`mailto:${site.email}`} className="text-sm text-[#14202b] hover:text-[#b8975a] transition-colors">
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1d3347] text-[#cca96a] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4"/>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-sans text-[#b8975a] font-medium mb-1">
                      Consultation Hours
                    </h3>
                    <p className="text-sm text-[#14202b] font-light leading-relaxed">
                      {site.officeHours}
                    </p>
                  </div>
                </div>

                {/* Instant WhatsApp Button */}
                <div className="pt-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-[2px] bg-[#1d3347] text-[#f7f3ec] border border-[#b8975a] hover:bg-[#142433] hover:text-[#cca96a] transition-all text-xs font-sans uppercase tracking-[0.15em] font-medium">
                    <MessageSquare className="w-4 h-4 text-[#cca96a]"/>
                    <span>WhatsApp Direct Message</span>
                  </a>
                </div>
              </div>

              {/* Styled Map Card Placeholder (No external API key needed) */}
              <div className="bg-[#ffffff] border border-[#e8dfd0] rounded-[2px] overflow-hidden shadow-sm">
                <div className="relative h-48 bg-[#e8dfd0] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1d3347] text-[#cca96a] flex items-center justify-center mb-3 shadow-md">
                    <MapPin className="w-6 h-6 animate-pulse"/>
                  </div>
                  <h3 className="text-base font-serif font-medium text-[#1d3347]">
                    Bengaluru Headquarters & Atelier
                  </h3>
                  <p className="text-xs text-[#536474] font-light mt-1">
                    Level 4, The Grand Pavilion &middot; Private salon visits by prior appointment only
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#536474]">
                  Socials:
                </span>
                <div className="flex items-center gap-3">
                  <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full border border-[#e8dfd0] flex items-center justify-center text-[#1d3347] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all">
                    <InstagramIcon className="w-4 h-4"/>
                  </a>
                  <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-[#e8dfd0] flex items-center justify-center text-[#1d3347] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all">
                    <FacebookIcon className="w-4 h-4"/>
                  </a>
                  <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full border border-[#e8dfd0] flex items-center justify-center text-[#1d3347] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all">
                    <YoutubeIcon className="w-4 h-4"/>
                  </a>
                  <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-[#e8dfd0] flex items-center justify-center text-[#1d3347] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all">
                    <LinkedinIcon className="w-4 h-4"/>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <Eyebrow>Bespoke Inquiries</Eyebrow>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1d3347] mt-2 mb-2">
                  Share Your Celebration Vision
                </h2>
                <p className="text-xs sm:text-sm text-[#536474] font-light">
                  Fields marked with an asterisk (<span className="text-[#b8975a]">*</span>) are essential for our directors to prepare a tailored response.
                </p>
              </div>

              <React.Suspense fallback={<div className="p-12 text-center text-[#536474] font-serif italic">
                    Preparing bespoke enquiry form...
                  </div>}>
                <ContactForm />
              </React.Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>);
}
