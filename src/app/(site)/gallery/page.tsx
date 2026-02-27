"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, PlayCircle, Camera, Video as VideoIcon, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { getGalleryPhotos, getGalleryVideos } from "@/lib/api";
import VideoModal from "@/components/VideoModal";
import { getVideoThumbnail } from "@/lib/utils/getVideoThumbnail";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, v] = await Promise.all([
          getGalleryPhotos(),
          getGalleryVideos(),
        ]);
        setPhotos(p || []);
        setVideos(v || []);
      } catch (e) {
        console.error("Error loading gallery:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter videos by platform
  const youtubeVideos = videos.filter(v => v.platform === "youtube");
  const instagramReels = videos.filter(v => v.platform === "instagram");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] text-slate-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-700 mb-6 transition-colors text-[10px] font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Atelier
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mb-3 tracking-tight">
            The <span className="text-amber-600 italic">Archive</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-lg font-medium">
            A vibrant collection of our most celebrated moments and cinematic stories.
          </p>
        </div>

        {/* 1. PHOTOS SECTION */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <Camera className="text-amber-600" size={18} />
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Captured Moments</h2>
            <div className="h-[1px] flex-1 bg-amber-100" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ y: -10 }}
                className="group relative aspect-[4/5] rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <img src={photo.image} className="w-full h-full object-cover" alt={photo.title} />
                <div className="absolute inset-x-4 bottom-4 p-5 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-amber-700 text-[9px] font-black uppercase tracking-widest block mb-1">{photo.category}</span>
                  <h3 className="text-base font-serif text-slate-900">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. YOUTUBE SECTION (Horizontal) */}
        {youtubeVideos.length > 0 && (
          <section className="mb-32">
            <div className="flex items-center gap-4 mb-10">
              <Youtube className="text-red-600" size={18} />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Cinematic Films</h2>
              <div className="h-[1px] flex-1 bg-red-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {youtubeVideos.map((video) => (
                <motion.div 
                  key={video.id}
                  onClick={() => setSelectedVideo(video)} 
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-200 shadow-lg">
                    <img 
                      src={getVideoThumbnail(video) || ""}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={video.title}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center group-hover:bg-amber-600 transition-all duration-300">
                        <PlayCircle className="w-8 h-8 text-amber-600 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 px-2">
                    <h4 className="text-xl font-serif text-slate-900 group-hover:text-amber-700 transition-colors">{video.title}</h4>
                    
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* 3. INSTAGRAM SECTION (Vertical) */}
        {instagramReels.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-10">
              <Instagram className="text-pink-600" size={18} />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Short Stories & Reels</h2>
              <div className="h-[1px] flex-1 bg-pink-50" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {instagramReels.map((video) => (
                <motion.div 
                  key={video.id}
                  onClick={() => setSelectedVideo(video)} 
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-200 shadow-md">
                    <img 
                      src={getVideoThumbnail(video) || ""}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={video.title}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="w-10 h-10 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className="text-sm font-serif text-slate-900 truncate px-2">{video.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </main>
  );
}