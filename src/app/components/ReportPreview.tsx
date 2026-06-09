import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Brain, Heart, Activity, Bone, CircleDot, CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";
import { trackReportCategory } from "../../lib/analytics";
import { SectionIntro } from "./SectionIntro";
import { ParallaxFloat, ParallaxOrbs, useSectionParallax } from "./ParallaxImage";

type FindingStatus = "normal" | "monitor" | "followup";

const categories = [
  { id: "brain", icon: Brain, label: "Brain", status: "normal" as FindingStatus, summary: "No concerning findings. Brain structures appear within normal limits.", detail: "Your radiologist reviewed images of the brain and head. No follow-up is needed for this region.", color: "#cf4520" },
  { id: "chest", icon: Heart, label: "Chest", status: "monitor" as FindingStatus, summary: "A small lung nodule was noted — likely benign. Short-term follow-up imaging may be recommended.", detail: "Lung nodules are common and often harmless. Your care team will explain whether a follow-up scan is appropriate for you.", color: "#b31b1b" },
  { id: "abdomen", icon: Activity, label: "Abdomen", status: "normal" as FindingStatus, summary: "Liver, kidneys, pancreas, and spleen look normal.", detail: "Major abdominal organs were reviewed. No findings requiring follow-up in this region.", color: "#e7751d" },
  { id: "spine", icon: Bone, label: "Spine", status: "followup" as FindingStatus, summary: "Mild age-related disc changes noted — common and often not symptomatic.", detail: "Spine findings are reviewed alongside your symptoms and health history.", color: "#cf4520" },
  { id: "extremities", icon: CircleDot, label: "Musculoskeletal", status: "normal" as FindingStatus, summary: "No concerning findings in the arms or legs.", detail: "Bones and soft tissues in the extremities were reviewed. No follow-up is needed for this region.", color: "#b31b1b" },
];

const statusConfig = {
  normal: { icon: CheckCircle2, label: "Clear", color: "#2d7a3e" },
  monitor: { icon: AlertCircle, label: "Monitor", color: "#e7751d" },
  followup: { icon: MinusCircle, label: "Discuss", color: "#cf4520" },
};

function SampleReportDocument({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <div className="w-full h-full flex flex-col p-6 lg:p-7" style={{ background: "#ffffff", minHeight: "100%" }}>
      <div className="mb-5 pb-4" style={{ borderBottom: "2px solid #b31b1b" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#cf4520" }}>WEILL CORNELL MEDICINE</p>
        <p className="mt-1" style={{ fontSize: "17px", fontWeight: 700, color: "#b31b1b" }}>Whole-Body MRI Report</p>
        <p style={{ fontSize: "11px", color: "var(--wcm-text-secondary)" }}>Sample · Tap a region to explore</p>
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
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-all w-full text-left hover:shadow-sm"
              style={{
                background: isActive ? `${cat.color}10` : "var(--wcm-bg-light)",
                border: `1px solid ${isActive ? cat.color : "var(--wcm-border)"}`,
                cursor: "pointer",
                transform: isActive ? "scale(1.02)" : "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = cat.color;
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = "var(--wcm-border)";
              }}
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color: cat.color }} />
              <span className="flex-1" style={{ fontSize: "12px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{cat.label}</span>
              <StatusIcon className="w-3.5 h-3.5 shrink-0" style={{ color: st.color }} />
              <span style={{ fontSize: "10px", fontWeight: 600, color: st.color }}>{st.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ReportPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState("chest");

  const active = categories.find((c) => c.id === activeId)!;
  const StatusIcon = statusConfig[active.status].icon;

  const handleSelect = (id: string) => {
    setActiveId(id);
    trackReportCategory(id);
  };
  const { ySlow, yFast, yReverse } = useSectionParallax(ref);

  return (
    <section id="report-preview" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      <ParallaxOrbs sectionRef={ref} variant="cool" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ParallaxFloat y={yReverse}>
          <SectionIntro eyebrow="Your report" title="Explore your results" inView={inView}>
          Every patient receives a clear, organized report reviewed by subspecialty radiologists. Click any region below to see how findings are explained in plain language.
          </SectionIntro>
        </ParallaxFloat>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <ParallaxFloat y={ySlow} className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden min-h-[480px]"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid var(--wcm-border)" }}
            >
              <SampleReportDocument activeId={activeId} onSelect={handleSelect} />
            </motion.div>
          </ParallaxFloat>

          <ParallaxFloat y={yFast} className="lg:col-span-7 flex flex-col">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-6 lg:p-8 flex-1"
              style={{ background: "var(--wcm-bg-light)", border: `2px solid ${active.color}40`, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${active.color}15` }}>
                  <active.icon className="w-6 h-6" style={{ color: active.color }} />
                </div>
                <div>
                  <p style={{ fontSize: "20px", fontWeight: 700, color: "var(--wcm-crimson)" }}>{active.label}</p>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon className="w-4 h-4" style={{ color: statusConfig[active.status].color }} />
                    <span style={{ fontSize: "14px", fontWeight: 600, color: statusConfig[active.status].color }}>{statusConfig[active.status].label}</span>
                  </div>
                </div>
              </div>
              <p className="mb-4" style={{ fontSize: "17px", lineHeight: 1.6, color: "var(--wcm-crimson)", fontWeight: 500 }}>{active.summary}</p>
              <p style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--wcm-text-secondary)" }}>{active.detail}</p>
            </motion.div>
          </ParallaxFloat>
        </div>
      </div>
    </section>
  );
}
