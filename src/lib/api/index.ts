// lib/api/index.ts

import { DUMMY_TESTIMONIALS } from "../dummy-data/testimonials";
import { DUMMY_EVENTS } from "../dummy-data/events";
import {
  DUMMY_PHOTOS,
  DUMMY_VIDEOS,
  DUMMY_GALLERY_STATS,
} from "../dummy-data/gallery";
import {
  DUMMY_SERVICES,
  DUMMY_SERVICE_FEATURES,
} from "../dummy-data/services";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_DOWNLOAD || "";

// =======================
// GENERIC FETCH WITH FALLBACK
// =======================

async function fetchWithFallback<T>(
  endpoint: string,
  fallbackData: T
): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log(`API error for ${endpoint}, using fallback`);
  }

  return fallbackData;
}

// =======================
// TESTIMONIALS
// =======================

export async function getTestimonials() {
  try {
    const res = await fetch(`${API_BASE}/testimonials`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    return data.map((item: any) => ({
      name: item.name,
      content: item.message,
      company: item.role || "Client",
      event: "Event Client",
      rating: 5,
    }));
  } catch {
    return DUMMY_TESTIMONIALS;
  }
}

// =======================
// EVENTS (MEDIA CONNECTED)
// =======================

export async function getRecentEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    if (!Array.isArray(data)) throw new Error();

    return data.map((event: any) => ({
      ...event,
      image: event.image?.startsWith("http")
        ? event.image
        : `${MEDIA_BASE}/${event.image}`,
    }));
  } catch {
    // Fallback to dummy with media server
    return DUMMY_EVENTS.map((event) => ({
      ...event,
      image: `${MEDIA_BASE}/${event.image}`,
    }));
  }
}

// =======================
// EVENTS STATS (FULLY DYNAMIC)
// =======================

export async function getEventsStats() {
  try {
    const events = await getRecentEvents();

    const currentYear = new Date().getFullYear();
    const today = new Date();

    const parsedEvents = events.map((e: any) => ({
      ...e,
      parsedDate: new Date(e.date),
    }));

    const eventsThisYear = parsedEvents.filter(
      (e) =>
        !isNaN(e.parsedDate.getTime()) &&
        e.parsedDate.getFullYear() === currentYear
    ).length;

    const upcomingEvents = parsedEvents.filter(
      (e) =>
        !isNaN(e.parsedDate.getTime()) &&
        e.parsedDate > today
    ).length;

    const cities = new Set(
      parsedEvents.map((e) => e.location).filter(Boolean)
    );

    return {
      eventsThisYear,
      upcomingEvents,
      citiesCovered: cities.size,
    };
  } catch {
    // If something breaks, return safe zeros (no dummy stats)
    return {
      eventsThisYear: 0,
      upcomingEvents: 0,
      citiesCovered: 0,
    };
  }
}

export async function getEventById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error();

    const event = await res.json();

    return {
      ...event,
      image: event.image?.startsWith("http")
        ? event.image
        : `${MEDIA_BASE}/${event.image}`,
    };
  } catch {
    return null;
  }
}

// =======================
// GALLERY
// =======================

export async function getGalleryPhotos() {
  let idCounter = 1;

  const flattened = DUMMY_PHOTOS.flatMap((group: any) =>
    group.items.map((item: any) => ({
      id: idCounter++,
      category: group.category,
      title: item.title,
      image: `${MEDIA_BASE}/${item.image}`,
    }))
  );

  return flattened;
}

// ... (rest of the file remains same)

export async function getGalleryVideos() {
  return DUMMY_VIDEOS.map((video) => {
    // Auto-detect platform if missing
    let platform = video.platform;
    if (!platform) {
      platform = video.url?.includes("instagram.com") ? "instagram" : "youtube";
    }
    
    return {
      ...video,
      platform: platform,
    };
  });
}

// ... (rest of the file remains same)
export async function getGalleryStats() {
  return fetchWithFallback("/gallery/stats", DUMMY_GALLERY_STATS);
}

// =======================
// SERVICES
// =======================

export async function getServices() {
  return fetchWithFallback("/services", DUMMY_SERVICES);
}

export async function getServiceFeatures() {
  return fetchWithFallback(
    "/services/features",
    DUMMY_SERVICE_FEATURES
  );
}

// =======================
// CONTACT
// =======================

export async function submitContactForm(data: any) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      return { success: true, message: "Message sent successfully!" };
    }
  } catch {}

  return {
    success: true,
    message: "Message received! We'll contact you soon.",
  };
}

// =======================
// NEWSLETTER
// =======================

export async function subscribeNewsletter(email: string) {
  try {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      return { success: true, message: "Subscribed successfully!" };
    }
  } catch {}

  return {
    success: true,
    message: "Thank you for subscribing!",
  };
}