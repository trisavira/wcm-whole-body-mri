import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Quote } from "lucide-react";
import { SectionIntro } from "./SectionIntro";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { images } from "../../lib/images";

const testimonials = [
  {
    typeLabel: "Peace of mind",
    quote: "They walked me through every step calmly. I left feeling informed — not anxious. That mattered more than anything.",
    attribution: "Patient, 48",
    color: "#e7751d",
    photo: images.patientPortrait1,
    name: "Maria",
  },
  {
    typeLabel: "Why I chose WCM",
    quote: "I wanted care at an academic medical center — not a commercial screening company. The difference was clear from the first call.",
    attribution: "Patient, 42",
    color: "#cf4520",
    photo: images.patientPortrait2,
    name: "James",
  },
  {
    typeLabel: "Integrated follow-up",
    quote: "When something needed attention, a specialist visit was arranged quickly. I did not have to navigate the system on my own.",
    attribution: "Patient, 55",
    color: "#b31b1b",
    photo: images.patientPortrait3,
    name: "Robert",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro title="Patient perspectives" inView={inView}>
          Illustrative experiences from patients who chose Whole-Body MRI at Weill Cornell Medicine. Every patient is different — a consultation is the best way to understand what is right for you.
        </SectionIntro>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.typeLabel}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "var(--wcm-bg-light)", border: "1px solid var(--wcm-border)", borderTop: `3px solid ${t.color}` }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                    <ImageWithFallback src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: t.color }}>{t.typeLabel}</p>
                    <p style={{ fontSize: "11px", color: "var(--wcm-text-secondary)" }}>{t.attribution}</p>
                  </div>
                  <Quote className="w-5 h-5 ml-auto" style={{ color: t.color, opacity: 0.3 }} />
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--wcm-text-muted)", fontStyle: "italic" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
