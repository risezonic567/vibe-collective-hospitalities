import { destinationsData, DestinationItem } from "@/data/destinations";
import { journeyMilestonesData, JourneyItem } from "@/data/journey";
import { eventsData, EventItem } from "@/data/events";
import { weddingCelebrationsData, WeddingItem } from "@/data/weddings";

// --- Journey Helpers ---
export function getJourneyItems(): JourneyItem[] {
  return journeyMilestonesData;
}

export function getJourneySlugs(): string[] {
  return journeyMilestonesData.map((item) => item.slug);
}

export function getJourneyItemBySlug(slug: string): JourneyItem | undefined {
  return journeyMilestonesData.find((item) => item.slug === slug);
}

// --- Events Helpers ---
export function getEvents(): EventItem[] {
  return eventsData;
}

export function getEventSlugs(): string[] {
  return eventsData.map((item) => item.slug);
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return eventsData.find((item) => item.slug === slug);
}

export function getEventsByDestination(destinationSlug: string): EventItem[] {
  return eventsData.filter((item) => item.destinationSlug === destinationSlug);
}

// --- Weddings Helpers ---
export function getWeddings(): WeddingItem[] {
  return weddingCelebrationsData;
}

export function getWeddingSlugs(): string[] {
  return weddingCelebrationsData.map((item) => item.slug);
}

export function getWeddingBySlug(slug: string): WeddingItem | undefined {
  return weddingCelebrationsData.find((item) => item.slug === slug);
}

export function getWeddingsByDestination(destinationSlug: string): WeddingItem[] {
  return weddingCelebrationsData.filter(
    (item) => item.destinationSlug === destinationSlug
  );
}

// --- Destinations Helpers ---
export function getDestinations(): DestinationItem[] {
  return destinationsData;
}

export function getDestinationSlugs(): string[] {
  return destinationsData.map((item) => item.slug);
}

export function getDestinationBySlug(slug: string): DestinationItem | undefined {
  return destinationsData.find((item) => item.slug === slug);
}

// --- Universal Prev/Next Helper ---
export function getPrevNext<T extends { slug: string }>(
  items: T[],
  currentSlug: string
): { prev: T | null; next: T | null } {
  const index = items.findIndex((item) => item.slug === currentSlug);
  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index > 0 ? items[index - 1] : null;
  const next = index < items.length - 1 ? items[index + 1] : null;

  return { prev, next };
}

// --- Universal Related Items Helper (Never returns current item, up to count items) ---
export function getRelated<
  T extends { slug: string; destinationSlug?: string; category?: string }
>(items: T[], currentItem: T, count = 3): T[] {
  // Exclude current item
  const candidates = items.filter((item) => item.slug !== currentItem.slug);

  // Score candidates: same destinationSlug or category gets priority
  const scored = candidates.map((item) => {
    let score = 0;
    if (
      currentItem.destinationSlug &&
      item.destinationSlug &&
      item.destinationSlug === currentItem.destinationSlug
    ) {
      score += 2;
    }
    if (
      currentItem.category &&
      item.category &&
      item.category === currentItem.category
    ) {
      score += 1;
    }
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.item);
}
