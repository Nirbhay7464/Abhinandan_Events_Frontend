"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { getRecentEvents, getEventsStats } from "@/lib/api";

// Types remain identical to maintain backend compatibility
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

const RecentEventsPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<EventType[]>([]);
  const [stats, setStats] = useState<StatsType>({
    eventsThisYear: 0,
    upcomingEvents: 0,
    citiesCovered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const eventsData = await getRecentEvents();
      const statsData = await getEventsStats();
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      setStats(statsData || stats);
    } catch (error) {
      console.error("Error loading events data:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    if (events.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  if (loading) {
    return (
      <section className="py-32 px-6 bg-[#FCFBF7]">
        <div className="max-w-7xl mx-auto text-center text-amber-900/40 tracking-widest uppercase text-xs font-bold">
          Archiving Excellence...
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 bg-[#FCFBF7] relative">
      {/* Royal Texture Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50/50 mb-6">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span className="text-[10px] font-black tracking-[0.3em] text-amber-800 uppercase">
                Case Studies
              </span>
            </div>

            <h2 className="text-5xl md:text-[64px] font-serif text-slate-900 mb-6 leading-[0.9] tracking-tighter">
              Recent <span className="italic font-light text-amber-600">Events</span>
            </h2>

            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Discover how we turn ambitious visions into flawlessly executed realities across the globe.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-4 rounded-2xl border border-amber-100 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="p-4 rounded-2xl border border-amber-100 bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* EVENTS GRID */}
        {events.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col bg-white rounded-[2.5rem] border border-amber-100 overflow-hidden hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500"
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
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                       <Users className="w-3.5 h-3.5" />
                       {event.attendees} guests
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 tracking-tight group-hover:text-amber-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-slate-500 text-sm mb-8 line-clamp-2 font-medium">
                    {event.description}
                  </p>

                  <div className="flex justify-between items-center pt-6 border-t border-amber-50">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      {event.location}
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/events"
            className="group inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-600 transition-all duration-500 shadow-2xl shadow-slate-900/20"
          >
            Explore Portfolio
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentEventsPreview;