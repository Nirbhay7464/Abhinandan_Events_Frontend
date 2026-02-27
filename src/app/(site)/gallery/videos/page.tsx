"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, PlayCircle, Video as VideoIcon, Sparkles, Clock, MonitorPlay, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { getGalleryVideos } from "@/lib/api";
import VideoModal from "@/components/VideoModal";
import { getVideoThumbnail } from "@/lib/utils/getVideoThumbnail";

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getGalleryVideos();
        setVideos(data || []);
      } catch (e) {
        console.error("Error loading videos:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const youtubeVideos = videos.filter((v) => v.platform === "youtube");
  const instagramReels = videos.filter((v) => v.platform === "instagram");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] text-slate-900 pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24 space-y-6">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-amber-700 transition-colors text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Collections
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-6xl md:text-8xl font-serif tracking-tighter leading-none mb-6">
                Cinematic <br />
                <span className="text-amber-600 italic font-light">Stories.</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed border-l-2 border-amber-200 pl-6">
                Moving pictures that capture the soul and rhythm of our most prestigious celebrations.
              </p>
            </motion.div>
            
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-amber-100 shadow-sm">
                <MonitorPlay className="text-amber-600" size={20} />
                <div className="h-8 w-px bg-amber-100" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Premium Productions
                </span>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: YOUTUBE FILMS --- */}
        {youtubeVideos.length > 0 && (
          <section className="mb-40">
            <div className="flex items-center gap-4 mb-12">
              <Youtube className="text-amber-600" size={20} />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Cinematic Films</h2>
              <div className="h-px flex-1 bg-amber-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {youtubeVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group block cursor-pointer"
                >
                  <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-xl transition-all duration-500 group-hover:shadow-amber-900/20 group-hover:-translate-y-2">
                    <img
                      src={getVideoThumbnail(video)!}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 group-hover:opacity-70"
                      alt={video.title}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl flex items-center justify-center group-hover:bg-amber-600 group-hover:scale-110 transition-all duration-500">
                            <PlayCircle className="w-10 h-10 text-amber-600 group-hover:text-white" />
                        </div>
                    </div>
                    <div className="absolute bottom-6 right-6 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm flex items-center gap-2 border border-white/10">
                      <Clock size={10} className="text-amber-400" />
                      <span className="text-[10px] font-bold text-white tracking-widest">{video.duration}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3 px-2">
                    <h4 className="text-3xl md:text-4xl font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-slate-400 text-sm font-medium italic">Official Trailer — {video.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* --- SECTION 2: INSTAGRAM REELS --- */}
        {instagramReels.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <Instagram className="text-amber-600" size={20} />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Social Stories</h2>
              <div className="h-px flex-1 bg-amber-100" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {instagramReels.map((video, index) => (
                <motion.div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-slate-900 shadow-lg group-hover:-translate-y-2 transition-all duration-500">
                    <img
                      src={getVideoThumbnail(video)!}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                      alt={video.title}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <PlayCircle className="w-12 h-12 text-white/90 group-hover:scale-125 transition-transform" />
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <h4 className="font-serif text-lg text-slate-900 group-hover:text-amber-700 transition-colors">{video.title}</h4>
                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">{video.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {videos.length === 0 && (
          <div className="py-40 text-center">
            <VideoIcon className="w-12 h-12 text-amber-200 mx-auto mb-6" />
            <p className="text-slate-400 font-serif italic text-xl">The cinematic archive is currently being updated...</p>
          </div>
        )}

        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      </div>
    </main>
  );
}