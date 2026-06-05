import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Brain, Heart, Activity, Bone, CircleDot, CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";
import { trackReportCategory } from "../../lib/analytics";
import { SectionIntro } from "./SectionIntro";

type FindingStatus = "normal" | "monitor" | "followup";

const categories = [
  { id: "brain", icon: Brain, label: "Brain", status: "normal" as FindingStatus, summary: "No concerning findings. Brain structures appear within normal limits.", detail: "Your radiologist reviewed images of the brain and head. No follow-up is needed for this region.", color: "#cf4520" },
  { id: "chest", icon: Heart, label: "Chest", status: "monitor" as FindingStatus, summary: "A small lung nodule was noted — likely benign. Short-term follow-up imaging may be recommended.", detail: "Lung nodules are common and often harmless. Your care team will explain whether a follow-up scan is appropriate for you.", color: "#b31b1b" },
  { id: "abdomen", icon: Activity, label: "Abdomen", status: "normal" as FindingStatus, summary: "Liver, kidneys, pancreas, and spleen look normal.", detail: "Major abdominal organs were reviewed. No findings requiring follow-up in this region.", color: "#e7751d" },
  { id: "spine", icon: Bone, label: "Spine", status: "followup" as FindingStatus, summary: "Mild age-related disc changes noted — common and often not symptomatic.", detail: "Spine findings are reviewed alongside your symptoms and health history. Your physician can help you understand whether any action is needed.", color: "#cf4520" },
  { id: "extremities", icon: CircleDot, label: "Musculoskeletal", status: "normal" as FindingStatus, summary: "No concerning findings in the arms or legs.", detail: "Bones and soft tissues in the extremities were reviewed. No follow-up is needed for this region.", color: "#b31b1b" },
];

const statusConfig = {
  normal: { icon: CheckCircle2, label: "Clear", color: "#2d7a3e" },
  monitor: { icon: AlertCircle, label: "Monitor", color: "#e7751d" },
  followup: { icon: MinusCircle, label: "Discuss", color: "#cf4520" },
};

function SampleReportDocument({ activeId }: { activeId: string }) {
  return (
    <div
      className="w-full h-full flex flex-col p-6 lg:p-7"
      style={{ background: "#ffffff", minHeight: "100%" }}
    >
      <div className="mb-5 pb-4" style={{ borderBottom: "2px solid #b31b1b" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#cf4520" }}>
          WEILL CORNELL MEDICINE
        </p>
        <p className="mt-1" style={{ fontSize: "17px", fontWeight: 700, color: "#b31b1b" }}>
          Whole-Body MRI Report
        </p>
        <p style={{ fontSize: "11px", color: "var(--wcm-text-secondary)" }}>Sample · For illustration only</p>
      </div>

      <div className="mb-5 space-y-1.5" style={{ fontSize: "11px", color: "var(--wcm-text-secondary)" }}>
        <p><span style={{ fontWeight: 600, color: "var(--wcm-crimson)" }}>Patient:</span> J. D. (redacted)</p>
        <p><span style={{ fontWeight: 600, color: "var(--wcm-crimson)" }}>Study date:</span> March 12, 2026</p>
        <p><span style={{ fontWeight: 600, color: "var(--wcm-crimson)" }}>Interpreted by:</span> Subspecialty radiology team</p>
      </div>

      <p className="mb-3 uppercase" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--wcm-text-secondary)" }}>
        Findings by region
      </p>

      <div className="flex-1 space-y-2">
        {categories.map((cat) => {
          const st = statusConfig[cat.status];
          const StatusIcon = st.icon;
          const isActive = cat.id === activeId;
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-all"
              style={{
                background: isActive ? `${cat.color}10` : "var(--wcm-bg-light)",
                border: `1px solid ${isActive ? cat.color : "var(--wcm-border)"}`,
              }}
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color: cat.color }} />
              <span className="flex-1" style={{ fontSize: "12px", fontWeight: 600, color: "var(--wcm-crimson)" }}>
                {cat.label}
              </span>
              <StatusIcon className="w-3.5 h-3.5 shrink-0" style={{ color: st.color }} />
              <span style={{ fontSize: "10px", fontWeight: 600, color: st.color }}>{st.label}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-5 pt-4" style={{ fontSize: "10px", lineHeight: 1.5, color: "var(--wcm-text-secondary)", borderTop: "1px solid var(--wcm-border)" }}>
        Full narrative report provided to patient and referring physician. Plain-language summary included.
      </p>
    </div>
  );
}

export function ReportPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState("chest");

  const active = categories.find((c) => c.id === activeId)!;
  const StatusIcon = statusConfig[active.status].icon;

  return (
    <section id="report-preview" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro title="Sample report preview" inView={inView}>
          Every patient receives a clear, organized report reviewed by subspecialty radiologists. Explore this sample to see how findings are categorized and explained in plain language.
        </SectionIntro>

        <div className="grid lg:grid-cols-12 gap-5 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[480px]"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid var(--wcm-border)" }}
          >
            <SampleReportDocument activeId={activeId} />
          </motion.div>

          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeId === cat.id;
                const st = statusConfig[cat.status];
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveId(cat.id); trackReportCategory(cat.id); }}
                    className="flex items-center gap-2 rounded-full px-4 py-2 transition-all"
                    style={{
                      background: isActive ? cat.color : "#fff",
                      color: isActive ? "#fff" : "var(--wcm-crimson)",
                      border: `1px solid ${isActive ? cat.color : "var(--wcm-border)"}`,
                      cursor: "pointer",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span style={{ fontSize: "12px", fontWeight: 600 }}>{cat.label}</span>
                    <st.icon className="w-3.5 h-3.5" style={{ color: isActive ? "#fff" : st.color }} />
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6"
              style={{ background: "#fff", border: `2px solid ${active.color}30`, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <active.icon className="w-8 h-8" style={{ color: active.color }} />
                <div>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--wcm-crimson)" }}>{active.label}</p>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon className="w-4 h-4" style={{ color: statusConfig[active.status].color }} />
                    <span style={{ fontSize: "13px", fontWeight: 600, color: statusConfig[active.status].color }}>{statusConfig[active.status].label}</span>
                  </div>
                </div>
              </div>
              <p className="mb-3" style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--wcm-text-muted)" }}>{active.summary}</p>
              <p style={{ fontSize: "13px", lineHeight: 1.55, color: "var(--wcm-text-secondary)" }}>{active.detail}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
