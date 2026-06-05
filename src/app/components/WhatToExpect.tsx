import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MessageCircle, ScanLine, FileSearch } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { images } from "../../lib/images";
import { SectionIntro } from "./SectionIntro";

const journey = [
  {
    icon: MessageCircle,
    phase: "Before",
    title: "Consult",
    description: "Meet with our team to review your health history, discuss goals, and confirm whether Whole-Body MRI is right for you.",
    image: images.consultation,
    color: "#e7751d",
  },
  {
    icon: ScanLine,
    phase: "During",
    title: "Scan",
    description: "Relax in a comfortable MRI suite. The scan typically takes about 45 minutes with no radiation exposure.",
    image: images.mriScanner,
    color: "#cf4520",
  },
  {
    icon: FileSearch,
    phase: "After",
    title: "Results & follow-up",
    description: "Subspecialty radiologists review your images. A care navigator helps schedule specialist visits if anything needs attention.",
    image: images.medicalTeam,
    color: "#b31b1b",
  },
];

export function WhatToExpect() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="what-to-expect" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro title="What to expect" inView={inView}>
          From your first conversation to receiving results, our team guides you at every step — with clear communication and coordinated follow-up when needed.
        </SectionIntro>

        <div className="grid md:grid-cols-3 gap-5">
          {journey.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden group"
                style={{ border: "1px solid var(--wcm-border)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImageWithFallback src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${step.color}cc, transparent 60%)` }} />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.95)" }}>
                      <Icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{step.phase}</p>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{step.title}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4" style={{ background: "#fff" }}>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--wcm-text-secondary)" }}>{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
