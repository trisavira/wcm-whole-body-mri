import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Heart, ShieldCheck, Search, Users } from "lucide-react";
import { SectionIntro } from "./SectionIntro";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { images } from "../../lib/images";

const reasons = [
  { icon: Heart, title: "Proactive health", description: "For adults who want a clearer picture of their health — often before symptoms develop.", color: "#cf4520", image: images.proactiveHealth, imageAlt: "Doctor discussing preventive care with a patient" },
  { icon: Search, title: "Whole-body view", description: "Many body regions are evaluated in one visit, instead of separate appointments over time.", color: "#e7751d", image: images.wholeBodyView, imageAlt: "MRI scanner at Weill Cornell Medicine" },
  { icon: ShieldCheck, title: "Expert interpretation", description: "Results are read by subspecialty radiologists and explained by your care team.", color: "#b31b1b", image: images.peaceOfMind, imageAlt: "Weill Cornell Medicine physician" },
  { icon: Users, title: "Who it may be for", description: "Often considered by generally healthy adults. Your consultation confirms whether it is appropriate for you.", color: "#cf4520", image: images.whoFor, imageAlt: "Patient receiving an MRI scan" },
];

export function WhyConsider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-consider" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro title="Why consider it?" inView={inView}>
          Patients often choose Whole-Body MRI to stay informed about their health — as a complement to routine care, not a replacement for it.
        </SectionIntro>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden group"
                style={{ background: "#ffffff", border: `2px solid ${item.color}20` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${item.color}99, transparent 55%)` }} />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.95)" }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="mb-2" style={{ fontSize: "14px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{item.title}</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.55, color: "var(--wcm-text-secondary)" }}>{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
