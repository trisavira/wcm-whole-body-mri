import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

/** BRD §14 — Phase 1 positioning with future Early Detection & Prevention expansion */
export function FutureProgram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="future-program"
      ref={ref}
      className="relative py-12 overflow-hidden"
      style={{ background: "var(--wcm-bg-light)", borderTop: "1px solid var(--wcm-border)" }}
    >
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45 }}>
          <p className="mb-2 uppercase tracking-[0.12em]" style={{ fontSize: "11px", fontWeight: 600, color: "#cf4520" }}>
            Early Detection & Prevention
          </p>
          <h2 className="mb-3" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--wcm-crimson)" }}>
            Phase 1: Whole-Body MRI — with more to come
          </h2>
          <p className="mb-4 max-w-xl mx-auto" style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>
            Whole-Body MRI is the first offering in a broader Weill Cornell Medicine program focused on proactive, evidence-based care. Your consultation covers what is available today and how the program may expand in the future.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5"
            style={{ fontSize: "14px", fontWeight: 600, color: "#cf4520", textDecoration: "none" }}
          >
            Speak with our team <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
