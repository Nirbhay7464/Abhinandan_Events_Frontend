"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles, ArrowUpRight, CheckCircle, Star, Palette, ClipboardCheck, Utensils } from "lucide-react";

const ServicesPreview = () => {
  const services = [
    {
      title: "Wedding Planning",
      desc: "Comprehensive coordination from conceptualization to the final applause, ensuring your dream wedding becomes a reality.",
      icon: <Heart className="w-6 h-6" />,
      features: ["Full Planning", "Theme Design", "Budgeting"]
    },
    {
      title: "Vendor Management",
      desc: "Curating and coordinating with top-tier partners to guarantee the highest quality of service for every aspect of your event.",
      icon: <ClipboardCheck className="w-6 h-6" />,
      features: ["Sourcing", "Contracts", "On-site Liaison"]
    },
    {
      title: "Decor & Execution",
      desc: "Transforming venues into immersive environments with high-end floral design, lighting, and bespoke aesthetic planning.",
      icon: <Palette className="w-6 h-6" />,
      features: ["Floral Design", "Lighting Art", "Stage Setup"]
    },
    {
      title: "Food & Beverage",
      desc: "Elevating the guest experience with gourmet menu planning and flawless catering management services.",
      icon: <Utensils className="w-6 h-6" />,
      features: ["Menu Curation", "Service Staff", "Presentation"]
    }
  ];

  return (
    <section id="services" className="relative py-20 md:py-32 px-6 bg-[#FCFBF7] overflow-hidden">
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.3]" />
        <motion.div
          className="absolute top-1/4 -right-32 w-64 h-64 md:w-96 md:h-96 bg-amber-200/20 rounded-full blur-[80px] md:blur-[120px]"
          animate={{ x: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 md:px-6 md:py-2.5 rounded-full border border-amber-200 bg-white shadow-sm mb-6 md:mb-8">
            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600 fill-amber-600" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-amber-800">
              OUR SPECIALTIES
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-[72px] font-serif font-light text-slate-900 mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] tracking-tighter">
            Curating Your <br className="hidden md:block" />
            <span className="text-amber-600 italic">Signature Moment</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-amber-100/50 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
              
              <div className="relative h-full p-8 md:p-10 rounded-[2rem] bg-white border border-amber-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="mb-6 md:mb-8 p-4 rounded-2xl bg-amber-50 w-fit text-amber-700 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 text-sm mb-6 md:mb-8 leading-relaxed font-medium flex-grow">
                  {service.desc}
                </p>
                
                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-slate-400">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-amber-50">
                  <span className="text-[10px] font-black text-amber-800/40 uppercase tracking-[0.2em]">
                    0{index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us & CTA */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-8 md:space-y-10">
            <h3 className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter">Why Abhinandan?</h3>
            <div className="grid gap-6 md:gap-8">
              {[
                { title: "Guest Management", desc: "Precision RSVP tracking and white-glove hospitality services for every attendee." },
                { title: "Transport & Logistics", desc: "Seamless movement of equipment and guests across any location or city." },
                { title: "Event Flow", desc: "Meticulous minute-by-minute scheduling for a stress-free celebration." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 md:gap-5">
                  <div className="p-2.5 md:p-3 rounded-2xl bg-white border border-amber-100 shadow-sm shadow-amber-900/5">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-slate-900 p-8 md:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 hidden sm:block">
              <Sparkles size={100} className="text-amber-400" />
            </div>
            
            <div className="relative z-10 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 md:mb-6 leading-tight">
                Thinking of an event? <br/>
                <span className="text-amber-400 italic font-light">We make it happen.</span>
              </h3>
              <p className="text-slate-400 mb-8 md:mb-10 leading-relaxed text-base md:text-lg">
                Connect with our lead consultants to transform your vision into an immersive reality.
              </p>
              <Link 
                href="/services" 
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 md:px-10 py-4 md:py-5 bg-amber-600 text-white font-black text-xs md:text-sm rounded-2xl transition-all hover:bg-amber-500 shadow-xl shadow-amber-900/40"
              >
                VIEW ALL SERVICES
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;