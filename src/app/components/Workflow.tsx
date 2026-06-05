import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { UserCheck, ScanLine, Cpu, FileText, Send, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: UserCheck,    step: "01", title: "Patient Intake",       description: "Automated eligibility check, contraindication screening, and scheduling via integrated EHR pull.",               time: "5 min",     color: "#e7751d" },
  { icon: ScanLine,     step: "02", title: "Acquisition",          description: "Standardized whole-body protocol: DWI, T1 Dixon, T2 STIR. Adaptive sequence optimization for patient size.",    time: "35–45 min", color: "#cf4520" },
  { icon: Cpu,          step: "03", title: "AI Processing",        description: "Automated reconstruction, registration, and lesion detection. Quantitative biomarker extraction in background.", time: "~8 min",    color: "#b31b1b" },
  { icon: FileText,     step: "04", title: "Structured Report",    description: "Pre-populated findings, lesion maps, volume measurements, and comparison deltas — ready for review.",            time: "10 min",    color: "#cf4520" },
  { icon: Send,         step: "05", title: "Distribution",         description: "One-click delivery to referring clinicians, oncology MDT, and patient portal via HL7 FHIR.",                    time: "< 1 min",   color: "#e7751d" },
  { icon: CheckCircle2, step: "06", title: "Follow-up Scheduling", description: "Longitudinal monitoring reminders, automated comparison loading, and outcome tracking close the care loop.",     time: "Automated", color: "#b31b1b" },
];

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="workflow" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(207,69,32,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(207,69,32,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ border: "1px solid rgba(207,69,32,0.25)", background: "rgba(207,69,32,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#cf4520" }} />
            <span style={{ color: "#cf4520", fontSize: "13px" }}>Clinical Workflow</span>
          </div>
          <h2 className="mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}>
            From referral to report in{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
              under 60 minutes
            </span>
          </h2>
          <p style={{ fontSize: "16px", color: "var(--wcm-text-muted)", maxWidth: "520px", margin: "0 auto" }}>
            A streamlined end-to-end pathway designed to minimize patient burden and maximize clinical throughput.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector */}
          <div className="hidden lg:block absolute top-10 left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] h-px" style={{ background: "linear-gradient(to right, rgba(231,117,29,0.25), rgba(179,27,27,0.2), rgba(231,117,29,0.25))" }} />

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center relative z-10 transition-all group-hover:shadow-lg"
                      style={{ background: "#ffffff", border: `2px solid rgba(0,0,0,0.1)` }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = step.color; (e.currentTarget as HTMLElement).style.background = `${step.color}10`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.background = "#ffffff"; }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: step.color }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#fff" }}>{step.step}</span>
                    </div>
                  </div>
                  <h3 className="mb-1.5" style={{ fontSize: "14px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{step.title}</h3>
                  <p style={{ fontSize: "12px", color: "var(--wcm-text-secondary)", lineHeight: 1.6, marginBottom: "12px" }}>{step.description}</p>
                  <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ fontSize: "11px", background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}25` }}>
                    {step.time}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 p-6 rounded-2xl text-center"
          style={{ background: "linear-gradient(135deg, rgba(231,117,29,0.06), rgba(179,27,27,0.05))", border: "1px solid rgba(207,69,32,0.15)" }}
        >
          <p style={{ fontSize: "15px", color: "var(--wcm-text-muted)" }}>Total turnaround from patient arrival to structured report delivery:</p>
          <p className="text-transparent bg-clip-text mt-1" style={{ fontSize: "24px", fontWeight: 700, backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
            Less than 60 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
