"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Quote, Award, Sparkles } from "lucide-react";
import Image from "next/image";

const AboutPreview = () => {
  return (
    <section id="about" className="relative py-20 md:py-32 px-6 bg-[#FCFBF7] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/30 -skew-x-12 translate-x-1/2 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Owner's Photo & Branding */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              {/* Photo Frame Styling */}
              <div className="absolute -inset-4 border border-amber-200 rounded-[2rem] md:rounded-[3rem] translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
              
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 md:border-8 border-white">
                <img 
                  src="/owner.png" 
                  alt="Founder of Abhinandan Events" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Name Tag - Adjusted for Mobile Positioning */}
              <div className="relative mt-[-40px] ml-auto mr-[-10px] lg:absolute lg:-bottom-6 lg:-right-6 bg-slate-900 text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl max-w-[260px] z-20">
                <Quote className="w-6 h-6 md:w-8 md:h-8 text-amber-500 mb-3 md:mb-4 opacity-50" />
                <p className="text-xs md:text-sm font-light italic leading-relaxed mb-4">
                  "Events are not just dates on a calendar; they are the milestones of a lifetime."
                </p>
                <h4 className="font-bold text-amber-500 uppercase tracking-widest text-[10px] md:text-xs">The Visionary</h4>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Content & Story */}
          <motion.div 
            className="lg:col-span-7 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-800 mb-6 md:mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Meet the Heart of Abhinandan</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8">
              Turning Your <span className="text-amber-600">Dreams</span> <br /> 
              Into a Living <span className="italic font-serif font-light text-slate-400">Legacy</span>.
            </h2>

            <div className="space-y-6 text-base md:text-lg text-slate-600 font-light leading-relaxed">
              <p>
                For over <span className="text-slate-900 font-semibold">15 years</span>, my mission has been to redefine the landscape of luxury celebrations in Maharashtra. What started as a passion for heritage aesthetics has evolved into a full-scale event production house known for its <span className="italic">unwavering precision</span>.
              </p>
              <p>
                At Abhinandan Events, we don’t believe in "templates." Every wedding, every corporate gala, and every milestone is treated as a unique canvas. I personally oversee our core creative strategy to ensure that your heritage is honored and your guests are mesmerized.
              </p>
            </div>

            {/* Signature Values */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6 md:gap-8 py-8 border-y border-amber-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-1">Curation First</h5>
                  <p className="text-sm text-slate-500">Bespoke designs that reflect your personal story.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-1">Precision Always</h5>
                  <p className="text-sm text-slate-500">Logistics managed with surgical accuracy.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
              <Link
                href="/about"
                className="group w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all duration-300 shadow-xl shadow-slate-900/20"
              >
                Learn More About Us
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <div className="flex flex-col">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Founder & CEO</p>
                <p className="font-serif italic text-xl text-slate-900 tracking-wide">Ritesh Wadhai.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;