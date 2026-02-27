"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoModal({ video, onClose }: any) {
  if (!video || !video.url) return null;

  const getEmbedUrl = (url: string, platform: string) => {
    if (!url) return null;

    // ================= YOUTUBE =================
    if (platform === "youtube") {
      const ytRegex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

      const match = url.match(ytRegex);
      const videoId = match?.[1];

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      }
      return null;
    }

    // ================= INSTAGRAM =================
    if (platform === "instagram") {
      // Remove trailing slashes and query params, then add /embed
      const cleanUrl = url.split("?")[0].replace(/\/$/, "");
      return `${cleanUrl}/embed`;
    }

    return null;
  };

  const embedUrl = getEmbedUrl(video.url, video.platform);
  const isInstagram = video.platform === "instagram";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative overflow-hidden shadow-2xl transition-all ${
            isInstagram
              ? "w-full max-w-[400px] h-[min(90vh,750px)] bg-white rounded-xl" 
              : "w-full max-w-5xl aspect-video bg-black rounded-2xl"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-3 right-3 z-[1000] p-2 rounded-full transition-colors ${
              isInstagram 
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200" 
                : "bg-black/50 text-white hover:text-amber-500"
            }`}
          >
            <X size={20} />
          </button>

          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              scrolling="no"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center font-serif italic ${
              isInstagram ? "text-slate-900" : "text-white"
            }`}>
              Unable to load cinematic preview.
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}