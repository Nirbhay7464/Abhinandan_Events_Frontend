"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getRecentEvents, getEventsStats } from "@/lib/api";

type EventType = {
  id: number;
  title: string;
  image: string;
  date: string;
  attendees: number;
  client: string;
  location: string;
  description: string;
};

type StatsType = {
  eventsThisYear: number;
  upcomingEvents: number;
  citiesCovered: number;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [stats, setStats] = useState<StatsType>({
    eventsThisYear: 0,
    upcomingEvents: 0,
    citiesCovered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const eventsData = await getRecentEvents();
        const statsData = await getEventsStats();
        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setStats(statsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFBF7] text-amber-900/40 font-bold tracking-widest uppercase text-xs">
        Curating Portfolio...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] pt-32 pb-32 px-6 relative">

      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50/50 mb-6">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] font-black tracking-[0.3em] text-amber-800 uppercase">
                Portfolio Archive
              </span>
            </div>

            <h1 className="text-6xl md:text-[72px] font-serif text-slate-900 leading-[0.9] tracking-tighter">
              Our <span className="italic font-light text-amber-600">Events</span>
            </h1>

            <p className="mt-6 text-slate-500 max-w-lg font-medium leading-relaxed">
              A curated showcase of extraordinary celebrations crafted with precision, elegance, and vision.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        
        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2.5rem] border border-amber-100 overflow-hidden hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black text-slate-900 tracking-widest uppercase">
                  {event.date}
                </div>
              </div>

              <div className="p-10">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-4">
                  <Users className="w-3.5 h-3.5" />
                  {event.attendees} Guests
                </div>

                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {event.title}
                </h3>

                <p className="text-slate-500 text-sm mb-8 line-clamp-3 font-medium">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  {event.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}