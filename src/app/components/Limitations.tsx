import { useRef } from "react";
import { motion, useInView } from "motion/react";

const notReplaced = [
  "Mammography",
  "Colonoscopy",
  "Cervical screening",
  "Lung CT (LDCT)",
  "PSA testing",
  "Skin checks",
];

export function Limitations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="limitations" ref={ref} className="relative py-14 overflow-hidden" style={{ background: "#ffffff", borderTop: "1px solid var(--wcm-border)" }}>
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-3"
          style={{ fontSize: "15px", fontWeight: 600, color: "var(--wcm-text-muted)" }}
        >
          Does not replace standard screening
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.08 }}
          className="mb-5"
          style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--wcm-text-secondary)" }}
        >
          Whole-Body MRI complements — not substitutes — guideline-recommended screenings. Continue all age-appropriate tests with your primary care physician.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.12 }}
          style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--wcm-text-secondary)" }}
        >
          {notReplaced.join(" · ")}
        </motion.p>
      </div>
    </section>
  );
}
