"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote, Users, Star, X, Sparkles } from "lucide-react";
import { getTestimonials } from "@/lib/api";

type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  message: string;
  rating: number;
};

const TestimonialsPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
  });

  /* ================= LOAD TESTIMONIALS ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTestimonials();

        const normalized: Testimonial[] = data.map((item: any, index: number) => ({
          id: item.id ?? index + 1,
          name: item.name,
          role: item.company || item.role || null,
          message: item.content || item.message,
          rating: item.rating ?? 5,
        }));

        setTestimonials(normalized);
      } catch (error) {
        console.error("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500); // Increased slightly for better mobile reading
    return () => clearInterval(interval);
  }, [testimonials]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.log("Submit failed (backend might be offline)");
    }
    setShowForm(false);
    setFormData({ name: "", role: "", message: "", rating: 5 });
    alert("Thanks! Your review will appear after admin approval.");
  };

  if (loading) return <div className="h-96 bg-[#FCFBF7]" />;

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 md:py-32 px-6 bg-[#FCFBF7] relative overflow-hidden">
      {/* Background decoration - scaled for mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-amber-200/20 blur-[80px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-200 bg-white mb-6 md:mb-8 shadow-sm">
            <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5 text-amber-600" />
            <span className="text-[9px] md:text-[10px] text-amber-800 font-black tracking-[0.3em] md:tracking-[0.4em] uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-[64px] font-serif text-slate-900 leading-[1.1] md:leading-[0.9] tracking-tighter">
            Kind Words from <br />
            <span className="italic font-light text-amber-600">Our Patrons</span>
          </h2>
        </div>

        {/* CARD */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative min-h-[420px] md:min-h-[380px] flex items-center">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] bg-white border border-amber-100 shadow-[0_20px_60px_-15px_rgba(180,150,100,0.15)] text-center"
                >
                  {/* Icon scaled for mobile */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-slate-900 text-amber-400 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl rotate-3">
                    <Quote className="w-6 h-6 md:w-7 md:h-7 fill-amber-400" />
                  </div>

                  <p className="text-lg md:text-2xl text-slate-800 mb-8 md:mb-10 leading-relaxed font-serif italic tracking-tight">
                    “{current.message}”
                  </p>

                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= current.rating ? "text-amber-500 fill-amber-500" : "text-amber-100"}
                        />
                      ))}
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                        {current.name}
                      </h4>
                      <p className="text-amber-600 font-bold text-[8px] md:text-[9px] uppercase tracking-widest mt-1">
                        {current.role || "Distinguished Guest"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 md:gap-3 mt-10 md:mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-1 md:h-1.5 transition-all duration-500 rounded-full overflow-hidden bg-amber-100"
                style={{ width: currentIndex === index ? "32px" : "8px" }}
              >
                {currentIndex === index && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    className="absolute inset-0 bg-slate-900"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 md:px-10 py-4 md:py-5 bg-slate-900 text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-600 transition-all duration-300 shadow-xl shadow-slate-900/10"
          >
            <Users className="w-4 h-4" />
            Share Your Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;