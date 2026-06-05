import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ChevronRight, CheckCircle2, X, Info } from "lucide-react";
import bodyAnatomyImage from "../../assets/body-anatomy.jpg";
import { trackBodyRegion } from "../../lib/analytics";
import { SectionIntro } from "./SectionIntro";
type Region = {
  id: string;
  label: string;
  color: string;
  lightBg: string;
  what: string[];
  findings: string[];
  education: string;
};

const regions: Region[] = [
  {
    id: "brain", label: "Brain & Head", color: "#cf4520", lightBg: "rgba(207,69,32,0.07)",
    what: ["Certain brain tumors", "Pituitary abnormalities", "Blood vessel changes", "Inflammation", "Stroke-related findings"],
    findings: ["Benign brain tumors", "Metastatic disease", "Vascular malformations", "Findings needing specialist review"],
    education: "The brain and head are evaluated in one scan — without radiation. Your radiologist reviews images for changes that may benefit from follow-up or specialist input.",
  },
  {
    id: "chest", label: "Chest & Lungs", color: "#b31b1b", lightBg: "rgba(179,27,27,0.07)",
    what: ["Lung nodules", "Enlarged lymph nodes", "Heart abnormalities", "Fluid around the lungs", "Certain breast findings"],
    findings: ["Small lung nodules", "Enlarged lymph nodes", "Incidental chest findings", "Conditions warranting monitoring"],
    education: "The chest includes the lungs, heart, and surrounding structures. Many findings are common and benign — your care team helps you understand what, if anything, needs next steps.",
  },
  {
    id: "abdomen", label: "Abdomen", color: "#e7751d", lightBg: "rgba(231,117,29,0.07)",
    what: ["Liver lesions", "Kidney tumors", "Pancreatic findings", "Adrenal masses", "Abdominal lymph nodes"],
    findings: ["Liver cysts or lesions", "Kidney masses", "Pancreatic abnormalities", "Findings for further evaluation"],
    education: "Major organs in the abdomen — including the liver, kidneys, and pancreas — are assessed together. Results are explained in plain language with guidance on any follow-up needed.",
  },
  {
    id: "spine", label: "Spine", color: "#cf4520", lightBg: "rgba(207,69,32,0.07)",
    what: ["Disc changes", "Spinal cord compression", "Vertebral lesions", "Bone marrow signal", "Spinal narrowing"],
    findings: ["Degenerative disc disease", "Herniated discs", "Bone lesions", "Age-related spinal changes"],
    education: "The full spine is imaged from neck to lower back. Many spine findings are common with age and may not require treatment — your physician will interpret results alongside your symptoms.",
  },
  {
    id: "pelvis", label: "Pelvis", color: "#b31b1b", lightBg: "rgba(179,27,27,0.07)",
    what: ["Prostate abnormalities", "Ovarian or uterine findings", "Bladder lesions", "Pelvic lymph nodes", "Rectal findings"],
    findings: ["Prostate lesions", "Ovarian cysts or masses", "Uterine findings", "Conditions needing specialist follow-up"],
    education: "The pelvis is evaluated for conditions affecting reproductive and urinary organs, as well as the lower digestive tract. Sensitive findings are handled with discretion and clear next-step guidance.",
  },
  {
    id: "extremities", label: "Arms & Legs", color: "#e7751d", lightBg: "rgba(231,117,29,0.07)",
    what: ["Bone lesions", "Soft tissue masses", "Joint disease", "Bone marrow changes", "Muscle abnormalities"],
    findings: ["Bone tumors", "Soft tissue masses", "Joint inflammation", "Findings for orthopedic review"],
    education: "Bones and soft tissues in the arms and legs are scanned for masses, injuries, and other changes. Your report will note anything that may benefit from a specialist consultation.",
  },
];

// ── Realistic anatomy map with interactive hotspots ──
type AnatomyHotspot = {
  id: string;
  d: string;
  labelX: number;
  labelY: number;
  pulseX: number;
  pulseY: number;
};

const anatomyHotspots: AnatomyHotspot[] = [
  {
    id: "brain",
    d: "M 44,3 C 38,3 34,7 34,11 C 33,15 36,18 40,19 L 54,19 C 58,18 61,15 60,11 C 60,7 56,3 50,3 Z M 40,19 L 39,24 L 55,24 L 54,19 Z",
    labelX: 68, labelY: 10, pulseX: 47, pulseY: 11,
  },
  {
    id: "chest",
    d: "M 34,24 C 28,28 27,38 30,46 L 34,52 L 60,52 L 64,46 C 67,38 66,28 60,24 C 55,22 39,22 34,24 Z",
    labelX: 72, labelY: 36, pulseX: 47, pulseY: 38,
  },
  {
    id: "abdomen",
    d: "M 34,52 L 32,64 C 33,70 38,74 47,75 L 53,75 C 62,74 67,70 68,64 L 66,52 Z",
    labelX: 72, labelY: 62, pulseX: 47, pulseY: 64,
  },
  {
    id: "spine",
    d: "M 45.5,24 L 48.5,24 L 49,74 L 46,74 Z",
    labelX: 58, labelY: 48, pulseX: 47.5, pulseY: 48,
  },
  {
    id: "pelvis",
    d: "M 32,64 C 31,70 34,78 40,81 L 54,81 C 60,78 63,70 62,64 L 53,75 L 47,75 Z",
    labelX: 70, labelY: 74, pulseX: 47, pulseY: 76,
  },
  {
    id: "extremities",
    d: "M 34,24 L 10,36 L 8,50 L 22,46 L 30,32 Z M 60,24 L 72,30 L 70,58 L 62,56 L 60,32 Z M 40,81 L 36,120 L 44,122 L 48,81 Z M 54,81 L 58,122 L 50,120 L 54,81 Z M 36,120 L 34,132 L 42,132 L 44,122 Z M 50,120 L 58,132 L 60,120 Z",
    labelX: 12, labelY: 42, pulseX: 22, pulseY: 44,
  },
];

type AnatomyMapProps = {
  activeId: string | null;
  hoveredId: string | null;
  onRegionClick: (id: string) => void;
  onRegionHover: (id: string | null) => void;
};

function AnatomyMap({ activeId, hoveredId, onRegionClick, onRegionHover }: AnatomyMapProps) {
  const isLit = (id: string) => activeId === id || hoveredId === id;

  return (
    <div className="relative w-[280px]" style={{ aspectRatio: "600 / 833" }}>
      <img
        src={bodyAnatomyImage}
        alt="Human muscular and skeletal anatomy — anterior view"
        className="w-full h-full object-cover rounded-xl"
        style={{ filter: activeId ? "none" : "saturate(0.85) contrast(1.05)" }}
        draggable={false}
      />

      {/* MRI scan line */}
      <motion.div
        className="absolute left-2 right-2 h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, transparent, rgba(231,117,29,0.8), transparent)", boxShadow: "0 0 8px 2px rgba(231,117,29,0.2)" }}
        animate={{ top: ["8%", "92%", "8%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        viewBox="0 0 100 139"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
      >
        {anatomyHotspots.map((spot) => {
          const region = regions.find((r) => r.id === spot.id)!;
          const lit = isLit(spot.id);
          return (
            <g
              key={spot.id}
              style={{ cursor: "pointer" }}
              onClick={() => onRegionClick(spot.id)}
              onMouseEnter={() => onRegionHover(spot.id)}
              onMouseLeave={() => onRegionHover(null)}
            >
              <path
                d={spot.d}
                fill={lit ? region.color : "transparent"}
                fillOpacity={lit ? (activeId === spot.id ? 0.42 : 0.28) : 0}
                stroke={lit ? region.color : "transparent"}
                strokeWidth={lit ? 0.6 : 0}
                strokeOpacity={lit ? 0.9 : 0}
                style={{ transition: "fill 0.25s, fill-opacity 0.25s, stroke 0.25s" }}
              />
              {activeId === spot.id && (
                <motion.circle
                  cx={spot.pulseX}
                  cy={spot.pulseY}
                  r="6"
                  fill="none"
                  stroke={region.color}
                  strokeWidth="0.5"
                  animate={{ r: [6, 12, 6], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </g>
          );
        })}

        {/* Region labels */}
        {anatomyHotspots.map((spot) => {
          const region = regions.find((r) => r.id === spot.id)!;
          const lit = isLit(spot.id);
          if (!lit) return null;
          return (
            <g key={`label-${spot.id}`} style={{ pointerEvents: "none" }}>
              <line
                x1={spot.pulseX + (spot.labelX > spot.pulseX ? 4 : -4)}
                y1={spot.pulseY}
                x2={spot.labelX - (spot.labelX > spot.pulseX ? 2 : -2)}
                y2={spot.labelY}
                stroke={region.color}
                strokeWidth="0.4"
                strokeOpacity="0.7"
              />
              <rect
                x={spot.labelX - (spot.id === "extremities" ? 14 : 10)}
                y={spot.labelY - 4}
                width={spot.id === "extremities" ? 28 : 20}
                height="6"
                rx="1.5"
                fill={region.color}
                fillOpacity="0.92"
              />
              <text
                x={spot.labelX}
                y={spot.labelY}
                textAnchor="middle"
                fontSize="3.2"
                fontWeight="700"
                fill="white"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {region.label.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function BodyExplorer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const activeRegion = regions.find((r) => r.id === activeId) ?? null;
  const handleClick = (id: string) => {
    trackBodyRegion(id);
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="body-explorer" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(207,69,32,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(207,69,32,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro title="What does it detect?" inView={inView}>
          Whole-Body MRI looks at many areas of the body in a single visit. Tap a region to learn what may be found — described in clear, patient-friendly language, not medical jargon.
        </SectionIntro>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Anatomy map */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:w-[320px] flex flex-col items-center mx-auto lg:mx-0 shrink-0"
          >
            <div className="mb-5 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(207,69,32,0.07)", border: "1px solid rgba(207,69,32,0.18)" }}>
              <Info className="w-3.5 h-3.5" style={{ color: "#cf4520" }} />
              <span style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>Click a region on the anatomy map</span>
            </div>

            <div className="relative p-3 rounded-2xl" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <AnatomyMap activeId={activeId} hoveredId={hoveredId} onRegionClick={handleClick} onRegionHover={setHoveredId} />
            </div>

            {/* Legend buttons */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center max-w-[280px]">
              {regions.map((r) => (
                <motion.button key={r.id} onClick={() => handleClick(r.id)} whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded-full transition-all"
                  style={{
                    fontSize: "11px", fontWeight: 600, cursor: "pointer",
                    background: activeId === r.id ? r.color : "rgba(0,0,0,0.05)",
                    color: activeId === r.id ? "#fff" : "var(--wcm-text-secondary)",
                    border: `1px solid ${activeId === r.id ? r.color : "rgba(0,0,0,0.1)"}`,
                  }}
                >
                  {r.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Info panel */}
          <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeRegion ? (
                <motion.div key={activeRegion.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                  className="relative rounded-2xl p-7"
                  style={{ background: "#ffffff", border: `1px solid ${activeRegion.color}30`, borderTop: `3px solid ${activeRegion.color}`, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
                >
                  <button onClick={() => setActiveId(null)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "var(--wcm-text-secondary)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--wcm-text-muted)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--wcm-text-secondary)"; }}
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div
                    className="relative rounded-xl overflow-hidden mb-5 px-5 py-4"
                    style={{ background: `linear-gradient(135deg, ${activeRegion.color}18, ${activeRegion.color}08)`, border: `1px solid ${activeRegion.color}30` }}
                  >
                    <p className="mb-1 uppercase" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: activeRegion.color }}>
                      Body region
                    </p>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--wcm-crimson)" }}>{activeRegion.label}</h3>
                    <div className="h-0.5 w-10 mt-2 rounded-full" style={{ background: activeRegion.color }} />
                  </div>

                  <div className="mb-5">
                    <p className="mb-2 uppercase" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: activeRegion.color }}>May help identify</p>
                    <div className="flex flex-wrap gap-2">
                      {activeRegion.what.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ fontSize: "11px", background: activeRegion.lightBg, color: "var(--wcm-text-muted)", border: `1px solid ${activeRegion.color}25` }}>
                          <CheckCircle2 className="w-3 h-3" style={{ color: activeRegion.color }} />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mb-5" style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>
                    {activeRegion.education}
                  </p>

                  <div className="mb-5">
                    <p className="mb-2 uppercase" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: activeRegion.color }}>Example findings</p>
                    <div className="flex flex-wrap gap-2">
                      {activeRegion.findings.map((f) => (
                        <span key={f} className="px-2.5 py-1 rounded-full" style={{ fontSize: "11px", background: "var(--wcm-bg-light)", color: "var(--wcm-text-muted)", border: "1px solid var(--wcm-border)" }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-all"
                      style={{ background: activeRegion.color, fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#b31b1b"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = activeRegion.color; }}
                    >
                      Discuss {activeRegion.label} Imaging
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center rounded-2xl"
                  style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", minHeight: "420px", padding: "48px 32px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                >
                  <motion.div animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="mb-6">
                    <img
                      src={bodyAnatomyImage}
                      alt=""
                      className="w-24 h-auto rounded-lg opacity-80"
                      style={{ filter: "saturate(0.7)" }}
                    />
                  </motion.div>
                  <p style={{ fontSize: "15px", color: "var(--wcm-text-secondary)", marginBottom: "6px" }}>Select a body region to explore</p>
                  <p style={{ fontSize: "13px", color: "var(--wcm-text-secondary)" }}>Click directly on the anatomy map or use the region buttons</p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-xs">
                    {regions.map((r) => (
                      <motion.button key={r.id} onClick={() => handleClick(r.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 rounded-lg transition-all"
                        style={{ fontSize: "12px", fontWeight: 600, background: "rgba(0,0,0,0.04)", color: "var(--wcm-text-secondary)", border: "1px solid rgba(0,0,0,0.09)", cursor: "pointer" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = r.color; (e.currentTarget as HTMLElement).style.color = r.color; (e.currentTarget as HTMLElement).style.background = r.lightBg; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.09)"; (e.currentTarget as HTMLElement).style.color = "var(--wcm-text-secondary)"; (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)"; }}
                      >
                        {r.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
