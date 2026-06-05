import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Brain, ScanLine, BarChart3, Network, Clock, Layers, Shield, RefreshCcw } from "lucide-react";

const features = [
  { icon: ScanLine,   title: "Whole-Body Coverage",     description: "From vertex to toes in a single examination. Optimized acquisition protocols cover all anatomical regions with consistent image quality.", accent: "orange",     tag: "Core" },
  { icon: Brain,      title: "AI-Assisted Detection",   description: "Deep learning models trained on 500,000+ annotated cases automatically flag lesions, measure volumes, and track longitudinal changes.",  accent: "crimson",    tag: "AI" },
  { icon: BarChart3,  title: "Quantitative Biomarkers",  description: "Extract standardized measurements — ADC maps, fat fraction, T1/T2 relaxometry — enabling reproducible, objective disease monitoring.",  accent: "darkorange", tag: "Analytics" },
  { icon: Network,    title: "PACS Integration",         description: "Connect to existing PACS, RIS, and EHR systems via DICOM, HL7 FHIR, or REST APIs with zero workflow disruption.",                        accent: "crimson",    tag: "Integration" },
  { icon: Clock,      title: "Rapid Reporting",          description: "Structured report generation with pre-populated findings, comparison with prior studies, and one-click critical result notification.",   accent: "orange",     tag: "Workflow" },
  { icon: Layers,     title: "Multi-Parametric Protocol", description: "DWI, DCE, Dixon, STIR — our protocol suite adapts to oncology, inflammatory, and screening applications in a single session.",         accent: "darkorange", tag: "Protocol" },
  { icon: Shield,     title: "Radiation-Free",           description: "Eliminate cumulative radiation burden. Ideal for pediatric populations, serial monitoring, and radiation-sensitive patients.",            accent: "orange",     tag: "Safety" },
  { icon: RefreshCcw, title: "Longitudinal Tracking",    description: "Automated co-registration and side-by-side comparison across time points helps clinicians visualize treatment response at a glance.",    accent: "crimson",    tag: "Monitoring" },
];

type AccentKey = "orange" | "crimson" | "darkorange";
const accentMap: Record<AccentKey, { border: string; icon: string; badgeBg: string; badgeColor: string; hoverBorder: string }> = {
  orange:     { border: "rgba(231,117,29,0.18)",  icon: "#e7751d", badgeBg: "rgba(231,117,29,0.08)", badgeColor: "#cf4520", hoverBorder: "rgba(231,117,29,0.4)" },
  crimson:    { border: "rgba(179,27,27,0.15)",   icon: "#b31b1b", badgeBg: "rgba(179,27,27,0.07)", badgeColor: "#b31b1b", hoverBorder: "rgba(179,27,27,0.35)" },
  darkorange: { border: "rgba(207,69,32,0.17)",   icon: "#cf4520", badgeBg: "rgba(207,69,32,0.08)", badgeColor: "#cf4520", hoverBorder: "rgba(207,69,32,0.4)" },
};

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="platform" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Very subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(207,69,32,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(207,69,32,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ border: "1px solid rgba(207,69,32,0.25)", background: "rgba(207,69,32,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#cf4520" }} />
            <span style={{ color: "#cf4520", fontSize: "13px" }}>Platform Capabilities</span>
          </div>
          <h2 className="mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}>
            Everything you need for{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
              whole-body diagnostics
            </span>
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--wcm-text-muted)", maxWidth: "560px", margin: "0 auto" }}>
            A unified platform purpose-built for oncology, inflammatory disease, and preventive screening workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, i) => {
            const a = accentMap[feat.accent as AccentKey];
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-xl p-5 cursor-default transition-all"
                style={{
                  background: "#ffffff",
                  border: `1px solid ${a.border}`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = a.hoverBorder; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = a.border; }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: a.badgeBg }}>
                    <Icon className="w-4 h-4" style={{ color: a.icon }} />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ fontSize: "11px", background: a.badgeBg, color: a.badgeColor, border: `1px solid ${a.border}` }}>
                    {feat.tag}
                  </span>
                </div>
                <h3 className="mb-2" style={{ fontSize: "15px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{feat.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--wcm-text-secondary)", lineHeight: 1.6 }}>{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
