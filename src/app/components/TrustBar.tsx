import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Building2, Stethoscope, Shield, HeartHandshake } from "lucide-react";

const trustPoints = [
  { icon: Building2, label: "Academic medical center", sub: "Weill Cornell Medicine" },
  { icon: Stethoscope, label: "Subspecialty radiologists", sub: "Expert interpretation" },
  { icon: HeartHandshake, label: "Integrated follow-up care", sub: "Coordinated pathway" },
  { icon: Shield, label: "Radiation-free imaging", sub: "MRI technology" },
];

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-12" style={{ background: "var(--wcm-bg-light)", borderTop: "1px solid var(--wcm-border)", borderBottom: "1px solid var(--wcm-border)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(179,27,27,0.08)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#b31b1b" }} />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{item.label}</p>
                  <p style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>{item.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
