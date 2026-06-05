import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const radarData = [
  { subject: "Sensitivity", value: 98 }, { subject: "Specificity", value: 95 },
  { subject: "Speed", value: 90 }, { subject: "Coverage", value: 100 },
  { subject: "Reproducibility", value: 96 }, { subject: "Safety", value: 100 },
];

const timelineData = [
  { month: "Jan", detected: 24, confirmed: 22 }, { month: "Feb", detected: 31, confirmed: 29 },
  { month: "Mar", detected: 28, confirmed: 26 }, { month: "Apr", detected: 40, confirmed: 38 },
  { month: "May", detected: 35, confirmed: 34 }, { month: "Jun", detected: 48, confirmed: 46 },
  { month: "Jul", detected: 52, confirmed: 51 }, { month: "Aug", detected: 58, confirmed: 56 },
];

const findings = [
  { label: "Bone Metastases",         accuracy: 97.4, color: "#cf4520" },
  { label: "Lymph Node Involvement",  accuracy: 95.1, color: "#b31b1b" },
  { label: "Soft Tissue Lesions",     accuracy: 93.8, color: "#e7751d" },
  { label: "Organ Infiltration",      accuracy: 96.2, color: "#cf4520" },
];

const cardStyle = { background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderRadius: "16px", padding: "24px" };

export function ClinicalData() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="clinical" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ border: "1px solid rgba(179,27,27,0.22)", background: "rgba(179,27,27,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#b31b1b" }} />
            <span style={{ color: "#b31b1b", fontSize: "13px" }}>Clinical Evidence</span>
          </div>
          <h2 className="mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}>
            Validated across{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>10,000+ cases</span>
          </h2>
          <p style={{ fontSize: "16px", color: "var(--wcm-text-muted)" }}>Published in peer-reviewed journals. Proven performance in multicenter trials.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Radar */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} style={cardStyle}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--wcm-crimson)", marginBottom: "4px" }}>Performance Profile</h3>
            <p style={{ fontSize: "13px", color: "var(--wcm-text-secondary)", marginBottom: "16px" }}>Multi-dimensional accuracy metrics</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,0,0,0.07)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#666666", fontSize: 11 }} stroke="transparent" />
                <Radar name="Performance" dataKey="value" stroke="#cf4520" fill="#cf4520" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area chart */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} style={{ ...cardStyle, gridColumn: "span 2" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--wcm-crimson)", marginBottom: "4px" }}>Detection Volume Trend</h3>
            <p style={{ fontSize: "13px", color: "var(--wcm-text-secondary)", marginBottom: "16px" }}>AI flagged vs. confirmed findings per month</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={timelineData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gradDetected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e7751d" stopOpacity={0.25} /><stop offset="95%" stopColor="#e7751d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradConfirmed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b31b1b" stopOpacity={0.25} /><stop offset="95%" stopColor="#b31b1b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" tick={{ fill: "#666666", fontSize: 11 }} stroke="transparent" />
                <YAxis tick={{ fill: "#666666", fontSize: 11 }} stroke="transparent" />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(207,69,32,0.2)", borderRadius: "8px", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} labelStyle={{ color: "var(--wcm-text-muted)" }} itemStyle={{ color: "var(--wcm-text-muted)" }} />
                <Area type="monotone" dataKey="detected" name="AI Detected" stroke="#e7751d" strokeWidth={2} fill="url(#gradDetected)" />
                <Area type="monotone" dataKey="confirmed" name="Confirmed" stroke="#b31b1b" strokeWidth={2} fill="url(#gradConfirmed)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {[{ color: "#e7751d", label: "AI Detected" }, { color: "#b31b1b", label: "Confirmed" }].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Accuracy bars */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} style={{ ...cardStyle, gridColumn: "span 3" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--wcm-crimson)", marginBottom: "4px" }}>Diagnostic Accuracy by Finding Type</h3>
            <p style={{ fontSize: "13px", color: "var(--wcm-text-secondary)", marginBottom: "20px" }}>Detection accuracy across primary clinical use cases</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {findings.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 + i * 0.08 }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: "13px", color: "var(--wcm-text-muted)" }}>{f.label}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{f.accuracy}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.07)" }}>
                    <motion.div className="h-full rounded-full" style={{ background: f.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${f.accuracy}%` } : {}}
                      transition={{ duration: 1, delay: 0.6 + i * 0.08, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
