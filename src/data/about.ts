export interface ValueItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  number: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
}

export const aboutData = {
  mission: {
    headline: "Hospitality as an art of memory and meaning.",
    statement:
      "At Vibe Collective, we believe the greatest luxury is not excess, but intention. We compose atmospheres where architecture, culinary nuance, and heartfelt human grace converge to give people unforgettable moments in time.",
  },
  vision: {
    headline: "Redefining bespoke celebrations across the globe.",
    statement:
      "To remain the premier benchmark in bespoke celebration design and curated private hospitality—distinguished by discretion, architectural scenography, and uncompromising craftsmanship.",
  },
  values: [
    {
      id: "v1",
      number: "01",
      title: "Radical Intentionality",
      subtitle: "Every detail has a soul",
      description:
        "Nothing in our spaces is accidental. From the temperature of linen to the subtle shift in candlelight as dusk descends, every nuance is composed with purpose.",
    },
    {
      id: "v2",
      number: "02",
      title: "Quiet Sophistication",
      subtitle: "The luxury of restraint",
      description:
        "True luxury whispers. We celebrate clean architectural silhouettes, organic textures, and understated grandeur that allows human connection to shine brightest.",
    },
    {
      id: "v3",
      number: "03",
      title: "Empathetic Concierge",
      subtitle: "Intuitive hospitality",
      description:
        "We listen deeply to the unspoken rhythms of our hosts and guests, offering anticipatory service that feels like grace rather than protocol.",
    },
    {
      id: "v4",
      number: "04",
      title: "Artisanal Provenance",
      subtitle: "Rooted in authentic craft",
      description:
        "We champion local heritage, indigenous master craftsmen, sustainable floral sourcing, and regional culinary treasures reinterpreted through modern gastronomy.",
    },
  ] as ValueItem[],
  howWeWork: [
    {
      step: "01",
      title: "Discovery & Resonance",
      subtitle: "Unearthing the narrative",
      description:
        "We begin with unhurried dialogue to understand your ethos, aesthetic aspirations, guest demographics, and the emotional resonance you desire to evoke.",
    },
    {
      step: "02",
      title: "Spatial & Sensory Scenography",
      subtitle: "Blueprint of imagination",
      description:
        "Our design studio produces architectural renders, tactile moodboards, lighting scores, and culinary sequences tailored exclusively to the setting.",
    },
    {
      step: "03",
      title: "Logistical Symphony",
      subtitle: "Invisible, flawless rigor",
      description:
        "From private charter charters and heritage permits to vendor choreography and hospitality concierges, our operations team ensures effortless precision.",
    },
    {
      step: "04",
      title: "Immersion & Hospitality",
      subtitle: "Living the celebration",
      description:
        "On the day of your event, you are entirely present as our seasoned directors govern every second, allowing you and your guests to simply be mesmerized.",
    },
  ] as ProcessStep[],
};
