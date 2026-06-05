import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { XCircle, AlertTriangle } from "lucide-react";
import { SectionIntro } from "./SectionIntro";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { images } from "../../lib/images";

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
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionIntro title="Does not replace standard screening" inView={inView}>
          Whole-Body MRI is a complementary tool — not a substitute for guideline-recommended cancer screenings and preventive care. Continue all age- and risk-appropriate tests with your primary care physician.
        </SectionIntro>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          >
            <ImageWithFallback
              src={images.preventiveScreening}
              alt="Doctor discussing preventive screenings with patient"
              className="w-full aspect-[4/3] object-cover"
            />
          </motion.div>

          <div className="text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {notReplaced.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full"
                  style={{ background: "#ffffff", border: "1px solid rgba(179,27,27,0.2)" }}
                >
                  <XCircle className="w-4 h-4" style={{ color: "#b31b1b" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{name}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex items-start gap-3 rounded-xl px-5 py-4 text-left"
              style={{ background: "rgba(231,117,29,0.08)", border: "1px solid rgba(231,117,29,0.25)" }}
            >
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#e7751d" }} />
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--wcm-text-muted)" }}>
                MRI cannot detect every condition. Some findings may require additional testing. Your care team will help you understand results in context — and avoid unnecessary anxiety.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
