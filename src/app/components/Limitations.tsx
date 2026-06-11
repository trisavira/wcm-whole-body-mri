import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { AlertTriangle, XCircle } from "lucide-react";
import { SectionIntro } from "./SectionIntro";

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
        <SectionIntro eyebrow="Alongside your regular care" title="Your routine screenings are not replaced" inView={inView}>
          Whole-Body MRI complements — not substitutes — guideline-recommended screenings. Continue all age-appropriate tests with your primary care physician.
        </SectionIntro>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-2xl p-8 lg:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(231,117,29,0.1), rgba(179,27,27,0.08))",
            border: "2px solid rgba(207,69,32,0.28)",
            boxShadow: "0 12px 40px rgba(179,27,27,0.08)",
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(207,69,32,0.12)", border: "1px solid rgba(207,69,32,0.25)" }}
          >
            <AlertTriangle className="w-6 h-6" style={{ color: "#cf4520" }} />
          </div>

          <p className="mb-6 max-w-lg mx-auto" style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--wcm-text-muted)" }}>
            This program is designed to add context to your health picture — not replace proven screening tools your doctor recommends.
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
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
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
