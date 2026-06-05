import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Cpu, Database, Globe, Lock, ServerCrash, Layers3 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const PATIENT_URL =
  "https://images.unsplash.com/photo-1666214280165-20e3d73d70bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxNUkklMjBzY2FubmVyJTIwbWVkaWNhbCUyMGltYWdpbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc4MDQ5Nzg4Mnww&ixlib=rb-4.1.0&q=80&w=1080";

const specs = [
  { icon: Cpu,         title: "GPU Inference Engine", value: "< 8 min",         sub: "Full-body AI processing",      color: "#e7751d" },
  { icon: Layers3,     title: "Sequence Library",      value: "24+",             sub: "Optimized MR protocols",       color: "#cf4520" },
  { icon: Database,    title: "Training Dataset",       value: "500K+",           sub: "Annotated imaging cases",      color: "#b31b1b" },
  { icon: Globe,       title: "Deployment",             value: "On-Prem / Cloud", sub: "Hybrid deployment",            color: "#cf4520" },
  { icon: Lock,        title: "Security",               value: "ISO 27001",       sub: "Certified infrastructure",     color: "#e7751d" },
  { icon: ServerCrash, title: "Uptime SLA",             value: "99.9%",           sub: "Enterprise-grade reliability", color: "#b31b1b" },
];

export function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="technology" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(207,69,32,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(207,69,32,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
              <ImageWithFallback src={PATIENT_URL} alt="Patient in WB-MRI scanner" className="w-full object-cover" style={{ height: "288px" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(247,247,247,0.6), transparent)" }} />
              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(to right, transparent, rgba(231,117,29,0.7), transparent)" }}
                animate={{ top: ["15%", "85%", "15%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-8 -right-4 rounded-xl p-4"
              style={{ background: "#ffffff", border: "1px solid rgba(231,117,29,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            >
              <div className="flex items-baseline gap-1 mb-0.5">
                <span style={{ fontSize: "26px", fontWeight: 700, color: "var(--wcm-crimson)" }}>3T</span>
                <span style={{ fontSize: "13px", color: "#e7751d" }}>Field Strength</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>Wide-bore 70cm gantry</p>
              <div className="mt-2 flex gap-1 items-end">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full"
                    style={{ background: "#cf4520" }}
                    animate={{ height: [8, 16, 8] }}
                    transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5" style={{ border: "1px solid rgba(179,27,27,0.22)", background: "rgba(179,27,27,0.06)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#b31b1b" }} />
                <span style={{ color: "#b31b1b", fontSize: "13px" }}>Technical Specifications</span>
              </div>
              <h2 className="mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}>
                Built for enterprise{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
                  clinical scale
                </span>
              </h2>
              <p className="mb-8" style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--wcm-text-muted)" }}>
                Purpose-engineered hardware and software co-design — from magnet homogeneity to cloud inference pipelines — delivers consistent diagnostic quality at scale.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                    className="rounded-xl p-4 transition-all group cursor-default"
                    style={{ background: "#ffffff", border: `1px solid ${spec.color}20`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.09)"; (e.currentTarget as HTMLElement).style.borderColor = `${spec.color}45`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = `${spec.color}20`; }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4" style={{ color: spec.color }} />
                      <span style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>{spec.title}</span>
                    </div>
                    <div style={{ fontSize: "17px", fontWeight: 700, color: spec.color }}>{spec.value}</div>
                    <div style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>{spec.sub}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
