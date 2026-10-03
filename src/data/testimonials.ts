export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  roleOrEvent: string;
  location: string;
  year: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Vibe Collective turned what seemed impossible into pure poetry. Over three days in Udaipur, four hundred international guests felt as though they were living inside an enchanted cinematic dream. Every detail was whisper-quiet perfection.",
    author: "Rhea & Aryaman Singhania",
    roleOrEvent: "3-Day Royal Palace Wedding",
    location: "Udaipur, Rajasthan",
    year: "2025", // TODO: replace with client testimonial year
  },
  {
    id: "t2",
    quote:
      "In the corporate luxury realm, restraint and seamless execution speak louder than excess. Their curation of our global founders’ conclave was effortlessly sophisticated. Our international board was genuinely astounded.",
    author: "Sameer Nambiar",
    roleOrEvent: "Managing Director, Apex Horizons",
    location: "Bengaluru",
    year: "2025", // TODO: replace with client testimonial year
  },
  {
    id: "t3",
    quote:
      "From curating private vintage villa stays to sourcing bespoke tableware and orchestrating Michelin-caliber chefs, Devina and her team elevate hospitality into high art. We wouldn't trust any milestone to anyone else.",
    author: "Dr. Alistair & Natasha Vance",
    roleOrEvent: "25th Silver Jubilee Private Soirée",
    location: "Goa Coast",
    year: "2024", // TODO: replace with client testimonial year
  },
  {
    id: "t4",
    quote:
      "The warmth, the discretion, the exquisite spatial design—they anticipated our guests' wishes before anyone spoke a word. It felt less like event management and more like personal family royalty.",
    author: "Meera & Siddharth Dalmia",
    roleOrEvent: "Contemporary Heritage Wedding",
    location: "Jaipur",
    year: "2024", // TODO: replace with client testimonial year
  },
];
