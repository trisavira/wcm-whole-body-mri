import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ScanLine, Radiation, Clock, Layers } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { images } from "../../lib/images";
import { SectionIntro } from "./SectionIntro";

const points = [
  { icon: ScanLine, title: "One comprehensive scan", description: "Evaluates multiple body regions in a single session — from head to lower extremities." },
  { icon: Layers, title: "Prevention focus", description: "Designed to help identify certain conditions earlier for eligible, proactive adults." },
  { icon: Clock, title: "Under one hour", description: "Most visits include preparation, scanning, and a brief recovery period." },
  { icon: Radiation, title: "No radiation", description: "Unlike CT or PET, MRI uses magnetic fields — no ionizing radiation exposure." },
];

export function WhatIsWBMRI() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="what-is-wb-mri" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro title="What is Whole-Body MRI?" align="left" inView={inView}>
          A single, radiation-free imaging study that evaluates many areas of the body in one visit. Offered as part of our science-based Early Detection & Prevention program at Weill Cornell Medicine.
        </SectionIntro>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}>
              <ImageWithFallback src={images.patientScan} alt="Patient receiving MRI scan" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-xl px-4 py-3" style={{ background: "#b31b1b", color: "#fff", boxShadow: "0 8px 24px rgba(179,27,27,0.3)" }}>
              <p style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1 }}>0</p>
              <p style={{ fontSize: "11px", opacity: 0.9 }}>radiation</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  className="rounded-xl p-4"
                  style={{ background: "var(--wcm-bg-light)", border: "1px solid var(--wcm-border)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(207,69,32,0.1)" }}>
                      <Icon className="w-4 h-4" style={{ color: "#cf4520" }} />
                    </div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{point.title}</p>
                  </div>
                  <p style={{ fontSize: "13px", lineHeight: 1.55, color: "var(--wcm-text-secondary)" }}>{point.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="mt-8 text-center" style={{ fontSize: "13px", color: "var(--wcm-text-secondary)" }}>
          Not appropriate for everyone — a consultation confirms whether this scan aligns with your health history and goals.
        </motion.p>
      </div>
    </section>
  );
}
