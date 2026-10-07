import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/config/site";
import { Container } from "../ui/Container";
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from "../ui/SocialIcons";
export function Footer() {
    const currentYear = new Date().getFullYear();
    return (<footer className="bg-[#1d3347] text-[#f7f3ec] border-t border-[#b8975a]/25 pt-20 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 pb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex select-none" aria-label="Vibe Collective Hospitality - Home">
              <Image
                src="/logo/vibe-collective-footer-logo.png"
                alt=""
                width={1150}
                height={860}
                className="h-[103px] w-[138px] object-contain transition-opacity hover:opacity-85"
              />
            </Link>
            <p className="text-md font-serif italic text-[#e8dfd0] max-w-xs leading-relaxed">
              {site.tagline}
            </p>
            <p className="text-sm text-[#e8dfd0]/80 font-light leading-relaxed">
              Composing bespoke celebrations, palatial weddings, and private estate hospitality across India and world-renowned destinations.
            </p>
          </div>


          <div className="space-y-4">
            <h4 className="text-xs font-medium tracking-[0.25em] uppercase text-[#b8975a] font-sans">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {site.nav.map((item) => (<li key={item.href}>
                  <Link href={item.href} className="text-md font-sans tracking-wide text-[#f7f3ec]/80 hover:text-[#cca96a] transition-colors inline-block py-0.5">
                    {item.label}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium tracking-[0.25em] uppercase text-[#b8975a] font-sans">
              Concierge Desk
            </h4>
            <div className="space-y-3 text-md text-[#f7f3ec]/85 font-light">
              <p className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#b8975a] shrink-0 mt-1" aria-hidden="true"/>
                <span>
                  {site.address[0]}
                  <br />
                  {site.address[1]}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#b8975a] shrink-0" aria-hidden="true"/>
                <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-[#cca96a] transition-colors">
                  {site.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#b8975a] shrink-0" aria-hidden="true"/>
                <a href={`mailto:${site.email}`} className="hover:text-[#cca96a] transition-colors">
                  {site.email}
                </a>
              </p>
            </div>
            <p className="text-xs text-[#b8975a] pt-1">
              Hours: {site.officeHours}
            </p>
          </div>

          {/* Socials & Privileges Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium tracking-[0.25em] uppercase text-[#b8975a] font-sans">
              Connect With Us
            </h4>
            <p className="text-md text-[#e8dfd0]/80 leading-relaxed font-light">
              Follow our visual journals, private salon previews, and celebratory chronicles.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow Vibe Collective on Instagram" className="w-10 h-10 rounded-full border border-[#b8975a]/40 flex items-center justify-center text-[#f7f3ec] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all duration-300">
                <InstagramIcon className="w-4 h-4"/>
              </a>
              <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Follow Vibe Collective on Facebook" className="w-10 h-10 rounded-full border border-[#b8975a]/40 flex items-center justify-center text-[#f7f3ec] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all duration-300">
                <FacebookIcon className="w-4 h-4"/>
              </a>
              <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="Follow Vibe Collective on YouTube" className="w-10 h-10 rounded-full border border-[#b8975a]/40 flex items-center justify-center text-[#f7f3ec] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all duration-300">
                <YoutubeIcon className="w-4 h-4"/>
              </a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Connect with Vibe Collective on LinkedIn" className="w-10 h-10 rounded-full border border-[#b8975a]/40 flex items-center justify-center text-[#f7f3ec] hover:border-[#b8975a] hover:bg-[#b8975a] hover:text-[#14202b] transition-all duration-300">
                <LinkedinIcon className="w-4 h-4"/>
              </a>
            </div>
          </div>
        </div>

        {/* Thin Gold Divider */}
        <div className="gold-divider mb-8" aria-hidden="true"/>

        {/* Copyright & Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#e8dfd0]/70 font-light">
          <p>© {currentYear} Vibe Collective Hospitality. All rights reserved.</p>
          <p className="text-[12px] tracking-widest uppercase text-[#b8975a]/80">
            <Link href="/destinations" className="text-[#cca96a] hover:text-[#f7f3ec] underline-offset-4 hover:underline transition-colors">
              Destinations Portfolio
            </Link>
            {" "}&middot; Curated Hospitality &middot; Heritage Weddings &middot; Private Celebrations
          </p>
        </div>
      </Container>
    </footer>);
}
