export type EventCategory =
  | "All"
  | "Corporate"
  | "Social"
  | "Celebrations"
  | "Private Dining"
  | "Experiences";

export const eventCategories: EventCategory[] = [
  "All",
  "Corporate",
  "Social",
  "Celebrations",
  "Private Dining",
  "Experiences",
];

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: Exclude<EventCategory, "All">;
  destinationSlug: string;
  blurb: string;
  excerpt: string;
  coverImage: {
    src: string;
    alt: string;
  };
  guests: string;
  location: string;
  description: string[];
  keyFacts: { label: string; value: string }[];
  highlights: string[];
  gallery: string[];
  faqs?: { question: string; answer: string }[];
}

export const eventsData: EventItem[] = [
  {
    id: "evt-1",
    slug: "vanguard-tech-summit-gala",
    title: "The Vanguard Tech Summit & Gala",
    category: "Corporate",
    destinationSlug: "bengaluru-hills",
    blurb: "A 3-day immersive executive retreat blending keynote staging, private dining, and orchestral ambiance.",
    excerpt: "A landmark 3-day executive retreat blending high-technology keynote staging with an open-air orchestral dinner.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
      alt: "The Vanguard Tech Summit & Gala staging in Bengaluru",
    },
    guests: "250 Guests",
    location: "Bengaluru Hills",
    description: [
      "Commissioned by a global technology conglomerate, The Vanguard Summit convened 250 top international venture partners and tech founders for three intensive days of plenary discourse and sensory relaxation.",
      "Vibe Collective converted a secluded botanical estate into a hyper-connected enclave with satellite connectivity, followed each evening by candlelit amphitheater dinners scored by a 16-piece string ensemble.",
    ],
    keyFacts: [
      { label: "Category", value: "Corporate Executive Retreat" },
      { label: "Duration", value: "3 Days & Nights" },
      { label: "Attendance", value: "250 International Delegates" },
      { label: "Destination", value: "Bengaluru Hills" },
    ],
    highlights: [
      "Ultra-low latency private satellite streaming facilities",
      "Curated 7-course farm-to-table culinary choreography",
      "Executive helicopter shuttle service from international terminals",
      "Acoustic amphitheater concert on the concluding night",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    ],
    faqs: [
      {
        question: "Can NDA and discrete security protocols be enforced for corporate conclaves?",
        answer:
          "Yes, we implement complete biometric access badges, private security rings, and strict NDA covenants across all event staff and culinary teams.",
      },
    ],
  },
  {
    id: "evt-2",
    slug: "amber-courtyard-anniversary-soiree",
    title: "Amber Courtyard Anniversary Soirée",
    category: "Celebrations",
    destinationSlug: "jaipur-pink-city",
    blurb: "A 50th jubilee marked by candlelit sandstone arches, classical sitarists, and ancestral culinary heirlooms.",
    excerpt: "An unforgettable golden jubilee celebration framed by 17th-century sandstone fortress ramparts in Jaipur.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80",
      alt: "Torchlit imperial courtyard in Jaipur",
    },
    guests: "180 Guests",
    location: "Jaipur",
    description: [
      "To celebrate half a century of a prominent industrial dynasty, Vibe Collective orchestrated an intimate two-night jubilee inside an exclusive private heritage fort near Jaipur.",
      "Guests arrived through a candlelit gateway flanked by ceremonial brass heralds, leading into an open-air banquet surrounded by thousands of oil diyas and fragrant rose garlands.",
    ],
    keyFacts: [
      { label: "Category", value: "Private Golden Jubilee" },
      { label: "Heritage Setting", value: "Sandstone Fort Courtyard" },
      { label: "Guest List", value: "180 Family & Honored Dignitaries" },
      { label: "Destination", value: "Jaipur Pink City" },
    ],
    highlights: [
      "Ancestral family recipes revived by royal khansamas",
      "Live classical sarangi and sitar virtuoso duets",
      "Bespoke laser projection mapping family lineage onto fort stone",
      "Personalized silver mementos crafted by local jewelers",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519225429457-3c58f0c5b7cb?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "evt-3",
    slug: "cellar-masters-private-dining-series",
    title: "Cellar Masters Private Dining Series",
    category: "Private Dining",
    destinationSlug: "tuscany-lake-como",
    blurb: "An invitation-only seven-course epicurean journey paired with vintage wines in a subterranean vault.",
    excerpt: "An exclusive seven-course epicurean journey paired with vintage grand crus inside a centuries-old subterranean vault.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80",
      alt: "Candlelit subterranean wine vault table setting",
    },
    guests: "30 Guests",
    location: "Tuscany Valley",
    description: [
      "A salon gathering of 30 discerning connoisseurs hosted inside a historic 16th-century Italian wine estate vault. Lit entirely by beeswax candelabras, the evening featured vertical tastings from century-old vintages.",
      "Each course was prepared live by a dual Michelin-starred guest chef, using ingredients harvested that morning across neighboring organic farms.",
    ],
    keyFacts: [
      { label: "Category", value: "Haute Gastronomy Salon" },
      { label: "Sommelier Directorship", value: "Master of Wine Curated" },
      { label: "Scale", value: "Strictly 30 Intimate Seats" },
      { label: "Destination", value: "Tuscany & Lake Como" },
    ],
    highlights: [
      "Seven-course bespoke degustation menu",
      "Rare vintage bottles uncorked from private estate reserves",
      "Subterranean acoustic performance by classical cellist",
      "Hand-etched crystal glassware personalized for each guest",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "evt-4",
    slug: "horizon-art-philanthropy-gala",
    title: "The Horizon Art & Philanthropy Gala",
    category: "Social",
    destinationSlug: "udaipur-mewar",
    blurb: "Black-tie fundraising spectacle featuring custom lighting installations and an open-air acoustic terrace.",
    excerpt: "A black-tie benefit gala featuring kinetic contemporary art installations, live auctions, and palatial terrace views.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      alt: "Spectacular ballroom setup for the Horizon Philanthropy Gala",
    },
    guests: "320 Guests",
    location: "Udaipur",
    description: [
      "Benefiting cultural heritage conservation and fine arts foundations, The Horizon Gala welcomed 320 global patrons in black-tie attire for an evening of philanthropic generosity.",
      "Vibe Collective directed the full evening trajectory—from red carpet arrival pavilions and interactive sculpture installations to an exhilarating live benefit auction that exceeded its fundraising goal by 150%.",
    ],
    keyFacts: [
      { label: "Category", value: "Philanthropic Black-Tie Gala" },
      { label: "Attendees", value: "320 Patrons of the Arts" },
      { label: "Venue Setting", value: "Open-Air Lakeside Palace Terrace" },
      { label: "Destination", value: "Udaipur & Mewar" },
    ],
    highlights: [
      "Sculptural light pavilions designed in collaboration with modern artists",
      "World-class live charity auction with digital bidding integration",
      "Gourmet midnight supper served under starlit palace skies",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "evt-5",
    slug: "himalayan-forest-wellness-sanctuary",
    title: "Himalayan Forest Wellness Sanctuary",
    category: "Experiences",
    destinationSlug: "swiss-alps-retreat",
    blurb: "Curated mindfulness and regenerative hospitality escape in an exclusive mountain estate.",
    excerpt: "A secluded four-day restorative alpine retreat focusing on mindfulness, thermal waters, and restorative cuisine.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80",
      alt: "Mist-shrouded mountain forest retreat pavilion",
    },
    guests: "40 Guests",
    location: "Alpine Highlands",
    description: [
      "Conceived as a restorative escape for overworked visionaries, this 4-day private sanctuary retreat combined sound baths in pine forests, natural geothermal soaking, and Ayurvedic-influenced alpine gastronomy.",
      "Every attendee received a personalized circadian wellness profile, private chalet accommodations, and discrete hospitality that respected silence and introspection.",
    ],
    keyFacts: [
      { label: "Category", value: "Bespoke Wellness & Mindful Retreat" },
      { label: "Duration", value: "4 Days & 3 Nights" },
      { label: "Guest Quorum", value: "40 Exclusive Participants" },
      { label: "Destination", value: "Swiss Alps & St. Moritz" },
    ],
    highlights: [
      "Forest dawn meditations led by master sound therapists",
      "Private thermal plunge pools overlooking snowcapped valleys",
      "Adaptogenic culinary sequences tailored to individual guest biorhythms",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "evt-6",
    slug: "monsoon-terrace-music-cocktail-lounge",
    title: "Monsoon Terrace Music & Cocktail Lounge",
    category: "Social",
    destinationSlug: "south-goa-coast",
    blurb: "Bespoke mixology showcase with live jazz overlooking lush coastal greenery.",
    excerpt: "An open-air evening of avant-garde cocktail artistry and soulful live jazz overlooking coastal coconut groves.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
      alt: "Atmospheric evening cocktail lounge terrace with jazz performers",
    },
    guests: "120 Guests",
    location: "South Goa",
    description: [
      "Celebrating the arrival of the coastal rains, this evening brought together 120 creative leaders on a sprawling colonial terrace. World-champion mixologists crafted botanical cocktails infused with regional spices, paired with live New Orleans and Latin jazz.",
      "The setting featured hanging glass lanterns, vintage cane lounges, and bespoke umbrellas as the twilight sky shifted into deep indigo.",
    ],
    keyFacts: [
      { label: "Category", value: "Curated Cocktail Salon" },
      { label: "Atmosphere", value: "Rain-Kissed Palm Veranda" },
      { label: "Attendance", value: "120 Invited Guests" },
      { label: "Destination", value: "South Goa Coast" },
    ],
    highlights: [
      "Interactive mixology bar highlighting rare small-batch distillers",
      "Live 6-piece Latin jazz ensemble playing until past midnight",
      "Artisanal small-plate pairings inspired by Portuguese Goan heritage",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

export const whatWeHandle = [
  {
    title: "Signature Venues & Private Estates",
    desc: "Unlisted heritage palaces, private estates, cliffside lawns, and contemporary galleries.",
  },
  {
    title: "Gourmet Catering & Mixology",
    desc: "Collaborative multi-course tasting menus, bespoke cocktail programs, and sommeliers.",
  },
  {
    title: "Décor, Lighting & Scenography",
    desc: "Sculptural florals, custom structures, ambient illumination, and bespoke table appointments.",
  },
  {
    title: "Acoustics, AV & Staging",
    desc: "State-of-the-art concert audio, kinetic lighting rigs, laser projection, and live streaming.",
  },
  {
    title: "Guest Concierge & Protocols",
    desc: "Bespoke digital invitations, RSVP white-glove management, and VIP security coordination.",
  },
  {
    title: "Luxury Travel & Executive Charters",
    desc: "Private aviation, helicopter transfers, luxury coach convoys, and personalized chauffeur fleets.",
  },
];

export const eventProcess = [
  {
    step: "01",
    name: "Curation & Briefing",
    detail: "Defining the event's cultural and commercial objective, guest journey, and sensory footprint.",
  },
  {
    step: "02",
    name: "Architectural Staging",
    detail: "Developing 3D floor plans, spatial lighting simulations, and curated menu storyboards.",
  },
  {
    step: "03",
    name: "Technical Choreography",
    detail: "Aligning sound engineers, culinary masters, and production crews under a master timecode.",
  },
  {
    step: "04",
    name: "Flawless Execution",
    detail: "Discrete backstage governance so every transition unfolds with effortless cinematic flow.",
  },
];
