import { useRef } from "react";
import { motion, useInView } from "motion/react";

const insights = [
  {
    value: "96",
    suffix: "%",
    description: "of your body can be imaged in a single visit — head through lower extremities in one comprehensive session.",
  },
  {
    value: "1 in 6",
    suffix: "",
    description: "adults may benefit from proactive screening. Eligibility is confirmed during your consultation.",
  },
  {
    value: "0",
    suffix: "",
    description: "radiation from MRI technology — unlike CT or PET, MRI uses magnetic fields only.",
  },
];

/** Biograph-style large stat strip with horizontal scroll */
export function StatInsightStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-16 lg:py-20 overflow-hidden" style={{ background: "#ffffff", borderTop: "1px solid var(--wcm-border)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex gap-6 lg:gap-10 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {insights.map((item, i) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="snap-center shrink-0 w-[min(100%,340px)] lg:w-[380px] flex flex-col"
            >
              <div className="flex items-baseline gap-1 mb-4">
                <span style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)", fontWeight: 700, lineHeight: 1, color: "var(--wcm-crimson)" }}>
                  {item.value}
                </span>
                {item.suffix && (
                  <span style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}>
                    {item.suffix}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
