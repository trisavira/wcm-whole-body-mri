import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionIntro } from "./SectionIntro";

const testimonials = [
  {
    quote: "They walked me through every step calmly. I left feeling informed — not anxious. That mattered more than anything.",
    name: "Patient",
    role: "Age 48",
    initial: "M",
    color: "#e7751d",
  },
  {
    quote: "I wanted care at an academic medical center — not a commercial screening company. The difference was clear from the first call.",
    name: "Patient",
    role: "Age 42",
    initial: "J",
    color: "#cf4520",
  },
  {
    quote: "When something needed attention, a specialist visit was arranged quickly. I did not have to navigate the system on my own.",
    name: "Patient",
    role: "Age 55",
    initial: "R",
    color: "#b31b1b",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro eyebrow="Testimonials" title="Patient perspectives" inView={inView}>
          Illustrative experiences from patients who chose Whole-Body MRI at Weill Cornell Medicine.
        </SectionIntro>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="snap-center shrink-0 w-[min(100%,380px)] lg:w-[420px] rounded-2xl p-8 flex flex-col"
              style={{ background: "#ffffff", border: "1px solid var(--wcm-border)", minHeight: "280px" }}
            >
              <p className="flex-1 mb-8" style={{ fontSize: "17px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-6 border-t" style={{ borderColor: "var(--wcm-border)" }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ background: t.color, fontSize: "14px" }}
                >
                  {t.initial}
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--wcm-crimson)" }}>{t.name}</p>
                  <p style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-6 text-center" style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>
          Every patient is different — a consultation is the best way to understand what is right for you.
        </p>
      </div>
    </section>
  );
}
