import { destinationsData } from "@/data/destinations";
import { journeyMilestonesData } from "@/data/journey";
import { eventsData } from "@/data/events";
import { weddingCelebrationsData } from "@/data/weddings";
// --- Journey Helpers ---
export function getJourneyItems() {
    return journeyMilestonesData;
}
export function getJourneySlugs() {
    return journeyMilestonesData.map((item) => item.slug);
}
export function getJourneyItemBySlug(slug) {
    return journeyMilestonesData.find((item) => item.slug === slug);
}
// --- Events Helpers ---
export function getEvents() {
    return eventsData;
}
export function getEventSlugs() {
    return eventsData.map((item) => item.slug);
}
export function getEventBySlug(slug) {
    return eventsData.find((item) => item.slug === slug);
}
export function getEventsByDestination(destinationSlug) {
    return eventsData.filter((item) => item.destinationSlug === destinationSlug);
}
// --- Weddings Helpers ---
export function getWeddings() {
    return weddingCelebrationsData;
}
export function getWeddingSlugs() {
    return weddingCelebrationsData.map((item) => item.slug);
}
export function getWeddingBySlug(slug) {
    return weddingCelebrationsData.find((item) => item.slug === slug);
}
export function getWeddingsByDestination(destinationSlug) {
    return weddingCelebrationsData.filter((item) => item.destinationSlug === destinationSlug);
}
// --- Destinations Helpers ---
export function getDestinations() {
    return destinationsData;
}
export function getDestinationSlugs() {
    return destinationsData.map((item) => item.slug);
}
export function getDestinationBySlug(slug) {
    return destinationsData.find((item) => item.slug === slug);
}
// --- Universal Prev/Next Helper ---
export function getPrevNext(items, currentSlug) {
    const index = items.findIndex((item) => item.slug === currentSlug);
    if (index === -1) {
        return { prev: null, next: null };
    }
    const prev = index > 0 ? items[index - 1] : null;
    const next = index < items.length - 1 ? items[index + 1] : null;
    return { prev, next };
}
// --- Universal Related Items Helper (Never returns current item, up to count items) ---
export function getRelated(items, currentItem, count = 3) {
    // Exclude current item
    const candidates = items.filter((item) => item.slug !== currentItem.slug);
    // Score candidates: same destinationSlug or category gets priority
    const scored = candidates.map((item) => {
        let score = 0;
        if (currentItem.destinationSlug &&
            item.destinationSlug &&
            item.destinationSlug === currentItem.destinationSlug) {
            score += 2;
        }
        if (currentItem.category &&
            item.category &&
            item.category === currentItem.category) {
            score += 1;
        }
        return { item, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, count).map((s) => s.item);
}
