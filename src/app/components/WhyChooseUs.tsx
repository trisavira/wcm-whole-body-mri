import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Building2, Stethoscope, FileText, Route, HandHeart, Microscope } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { images } from "../../lib/images";
import { SectionIntro } from "./SectionIntro";

const differentiators = [
  { icon: Building2, title: "Academic medical center", description: "Delivered within a leading academic health system — not a standalone screening center.", color: "#b31b1b" },
  { icon: Stethoscope, title: "Expert radiologists", description: "Every study interpreted by board-certified subspecialty radiologists.", color: "#cf4520" },
  { icon: Route, title: "Integrated care", description: "Specialist referrals coordinated within Weill Cornell Medicine when needed.", color: "#e7751d" },
  { icon: FileText, title: "Clear reports", description: "Patient-friendly language with visual summaries — not medical jargon.", color: "#cf4520" },
  { icon: HandHeart, title: "Care navigator", description: "Dedicated support for scheduling follow-up and specialist visits.", color: "#b31b1b" },
  { icon: Microscope, title: "Evidence-based", description: "Grounded in science-informed protocols — not marketing hype.", color: "#e7751d" },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-choose-us" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro title="Why Weill Cornell Medicine?" inView={inView}>
          Direct-to-consumer screening is widely available. Our program is fundamentally different — built on academic expertise, integrated care, and responsible clinical stewardship.
        </SectionIntro>

        <div className="grid lg:grid-cols-12 gap-5 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-2xl overflow-hidden min-h-[280px]"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          >
            <ImageWithFallback src={images.hospital} alt="Weill Cornell Medicine campus" className="w-full h-full object-cover min-h-[280px]" />
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className="rounded-xl overflow-hidden"
                  style={{ background: "var(--wcm-bg-light)", border: `1px solid ${item.color}25` }}
                >
                  <div className="h-1.5" style={{ background: item.color }} />
                  <div className="p-4">
                  <Icon className="w-7 h-7 mb-2" style={{ color: item.color }} />
                  <p className="mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{item.title}</p>
                  <p style={{ fontSize: "12px", lineHeight: 1.5, color: "var(--wcm-text-secondary)" }}>{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
