import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export function FutureProgram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="future-program"
      ref={ref}
      className="relative py-14 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(179,27,27,0.92), rgba(207,69,32,0.88))" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="inline-flex flex-col items-center">
          <Sparkles className="w-8 h-8 mb-3 text-white" />
          <h2 className="mb-2" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff" }}>
            Part of our Early Detection & Prevention program
          </h2>
          <p className="mb-1 max-w-lg" style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>
            Whole-Body MRI is one service within a broader Weill Cornell Medicine program focused on proactive, evidence-based care. Your consultation will cover what is available today and what may be offered in the future.
          </p>
          <a href="#contact" className="inline-flex items-center gap-1.5 mt-3" style={{ fontSize: "14px", fontWeight: 600, color: "#FFC72C", textDecoration: "none" }}>
            Request a consultation <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
