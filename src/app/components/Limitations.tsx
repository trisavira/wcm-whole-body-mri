import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { AlertTriangle, XCircle } from "lucide-react";

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
    <section id="limitations" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="rounded-2xl p-8 lg:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(231,117,29,0.08), rgba(179,27,27,0.06))",
            border: "2px solid rgba(207,69,32,0.25)",
            boxShadow: "0 8px 32px rgba(179,27,27,0.08)",
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(207,69,32,0.12)" }}
          >
            <AlertTriangle className="w-6 h-6" style={{ color: "#cf4520" }} />
          </div>

          <h2
            className="mb-3"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}
          >
            Does not replace standard screening
          </h2>

          <p className="mb-6" style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--wcm-text-muted)" }}>
            Whole-Body MRI complements — not substitutes — guideline-recommended screenings. Continue all age-appropriate tests with your primary care physician.
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            {notReplaced.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#ffffff",
                  color: "var(--wcm-text-muted)",
                  border: "1px solid rgba(179,27,27,0.2)",
                }}
              >
                <XCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "#b31b1b" }} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
