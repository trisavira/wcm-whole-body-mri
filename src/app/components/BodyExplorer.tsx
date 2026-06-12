import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ChevronRight, CheckCircle2, X, Info } from "lucide-react";
import { trackBodyRegion } from "../../lib/analytics";
import { SectionIntro } from "./SectionIntro";
import { ParallaxFloat, ParallaxOrbs, useSectionParallax } from "./ParallaxImage";
import {
  BODY_MAP_VIEWBOX,
  LABEL_LEADER_END_LEFT,
  LABEL_LEADER_END_RIGHT,
  limbsBasePath,
  regionZoom,
  schematicRegions,
  schematicTheme,
  torsoPaintOrder,
  torsoShellPath,
} from "./bodyAnatomyMap";
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

type AnatomyMapProps = {
  activeId: string | null;
  hoveredId: string | null;
  onRegionClick: (id: string) => void;
  onRegionHover: (id: string | null) => void;
};

function BodyMapFigure({
  activeId,
  hoveredId,
  onRegionClick,
  onRegionHover,
  className = "",
}: AnatomyMapProps & { className?: string }) {
  const isLit = (id: string) => activeId === id || hoveredId === id;

  return (
    <svg
      viewBox={BODY_MAP_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="Schematic body map — tap a region to explore"
      style={{ overflow: "hidden" }}
    >
      <rect x="0" y="0" width="110" height="139" fill={schematicTheme.bg} rx="4" />

      {/* Torso outline */}
      <path
        d={torsoShellPath}
        fill={schematicTheme.shellFill}
        stroke={schematicTheme.shellStroke}
        strokeWidth="0.4"
        pointerEvents="none"
      />

      {/* Limbs — single clean layer */}
      <path
        d={limbsBasePath}
        fill={schematicTheme.regionFill}
        stroke={schematicTheme.regionStroke}
        strokeWidth="0.35"
        strokeLinejoin="round"
        pointerEvents="none"
      />

      {/* Torso section fills */}
      {torsoPaintOrder.map((id) => {
        const spot = schematicRegions.find((s) => s.id === id)!;
        return (
          <path
            key={`base-${id}`}
            d={spot.d}
            fill={schematicTheme.regionFill}
            stroke={schematicTheme.regionStroke}
            strokeWidth="0.35"
            strokeLinejoin="round"
            pointerEvents="none"
          />
        );
      })}

      {/* Section dividers — aligned to torso regions */}
      <line x1="41" y1="41" x2="69" y2="41" stroke={schematicTheme.dividerStroke} strokeWidth="0.35" pointerEvents="none" />
      <line x1="41" y1="57" x2="69" y2="57" stroke={schematicTheme.dividerStroke} strokeWidth="0.35" pointerEvents="none" />

      {/* Spine — dashed scan line only (no duplicate label) */}
      <line
        x1="55"
        y1="22"
        x2="55"
        y2="73"
        stroke={schematicTheme.spineLine}
        strokeWidth="0.5"
        strokeDasharray="2.5 2"
        strokeOpacity="0.8"
        pointerEvents="none"
      />

      {/* Wrist markers */}
      <circle cx="30" cy="55" r="2" fill={schematicTheme.jointFill} stroke={schematicTheme.jointStroke} strokeWidth="0.3" pointerEvents="none" />
      <circle cx="80" cy="55" r="2" fill={schematicTheme.jointFill} stroke={schematicTheme.jointStroke} strokeWidth="0.3" pointerEvents="none" />

      {/* Interactive regions */}
      {schematicRegions.map((spot) => {
        const region = regions.find((r) => r.id === spot.id)!;
        const lit = isLit(spot.id);
        const selected = activeId === spot.id;
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
              fillOpacity={lit ? (selected ? 0.45 : 0.28) : 0}
              stroke={lit ? region.color : "transparent"}
              strokeWidth={lit ? 0.55 : 0}
              strokeOpacity={lit ? 0.95 : 0}
              style={{ transition: "fill 0.25s, fill-opacity 0.25s, stroke 0.25s" }}
            />
            {selected && (
              <motion.circle
                cx={spot.pulseX}
                cy={spot.pulseY}
                r="5"
                fill="none"
                stroke={region.color}
                strokeWidth="0.5"
                animate={{ r: [5, 10, 5], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </g>
        );
      })}

      {/* Region callouts — torso + brain only; spine/limbs use chips */}
      {schematicRegions.map((spot) => {
        const region = regions.find((r) => r.id === spot.id)!;
        const lit = isLit(spot.id);
        if (!spot.showLabel) return null;

        const labelColor = lit ? region.color : schematicTheme.labelMuted;
        const isRight = spot.labelSide === "right";
        const lineEndX = isRight ? LABEL_LEADER_END_RIGHT : LABEL_LEADER_END_LEFT;

        return (
          <g key={`label-${spot.id}`} style={{ pointerEvents: "none" }}>
            <line
              x1={spot.leaderStart.x}
              y1={spot.leaderStart.y}
              x2={lineEndX}
              y2={spot.labelY}
              stroke={lit ? region.color : schematicTheme.leaderMuted}
              strokeWidth="0.3"
            />
            <text
              x={spot.labelX}
              y={spot.labelY}
              textAnchor={isRight ? "end" : "start"}
              dominantBaseline="middle"
              fontSize="3.8"
              fontWeight={lit ? "700" : "600"}
              fill={labelColor}
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {spot.labelShort}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

type AnatomyMapZoom = { scale: number; originY: string };

function AnatomyMap({
  activeId,
  hoveredId,
  onRegionClick,
  onRegionHover,
  zoom = { scale: 1, originY: "50%" },
}: AnatomyMapProps & { zoom?: AnatomyMapZoom }) {
  return (
    <div
      className="relative w-full mx-auto overflow-hidden rounded-lg isolate"
      style={{ aspectRatio: "110 / 139", maxWidth: "340px" }}
    >
      <motion.div
        className="w-full h-full will-change-transform"
        animate={{ scale: zoom.scale }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        style={{ transformOrigin: `50% ${zoom.originY}` }}
      >
        <motion.div
          className="absolute left-[22%] right-[22%] h-px pointer-events-none z-10"
          style={{
            background: `linear-gradient(to right, transparent, ${schematicTheme.scanLine}, transparent)`,
            boxShadow: "0 0 10px 2px rgba(231,117,29,0.2)",
          }}
          animate={{ top: ["10%", "88%", "10%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <BodyMapFigure
          activeId={activeId}
          hoveredId={hoveredId}
          onRegionClick={onRegionClick}
          onRegionHover={onRegionHover}
          className="w-full h-full block"
        />
      </motion.div>
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

  const zoom = activeId ? regionZoom[activeId] : { scale: 1, originY: "50%" };
  const { ySlow, yFast, yReverse } = useSectionParallax(ref);

  return (
    <section id="body-explorer" ref={ref} className="relative min-h-screen py-16 lg:py-20 overflow-hidden flex flex-col" style={{ background: "var(--wcm-bg-light)" }}>
      <ParallaxOrbs sectionRef={ref} variant="warm" />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{ y: yFast }}
      />

      <div className="relative max-w-7xl mx-auto px-6 flex-1 flex flex-col">
        <SectionIntro eyebrow="What we evaluate" title="What we evaluate" inView={inView}>
          Whole-Body MRI looks at many areas of the body in a single visit. Select a region to zoom in and learn what may be found — in clear, patient-friendly language.
        </SectionIntro>

        <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] lg:grid-rows-[auto_minmax(0,1fr)] gap-x-8 lg:gap-x-10 gap-y-4 items-start flex-1">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit mx-auto lg:mx-0" style={{ background: "rgba(207,69,32,0.07)", border: "1px solid rgba(207,69,32,0.18)" }}>
            <Info className="w-3.5 h-3.5 shrink-0" style={{ color: "#cf4520" }} />
            <span style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>Tap a region to zoom in</span>
          </div>
          <div
            className="hidden lg:flex items-center px-3 py-1.5 rounded-full w-fit"
            style={{ background: "rgba(179,27,27,0.06)", border: "1px solid rgba(179,27,27,0.14)" }}
          >
            <span style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>Region details appear here</span>
          </div>

          <ParallaxFloat y={ySlow} className="w-full mx-auto lg:mx-0 max-w-[380px] h-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="w-full h-full"
            >
            <div className="relative p-3 rounded-2xl w-full max-w-[360px] mx-auto lg:mx-0 h-full overflow-hidden" style={{ background: schematicTheme.bg, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <div className="overflow-hidden rounded-lg">
                <AnatomyMap
                  activeId={activeId}
                  hoveredId={hoveredId}
                  onRegionClick={handleClick}
                  onRegionHover={setHoveredId}
                  zoom={zoom}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-black/5">
                {regions.map((r) => {
                  const selected = activeId === r.id;
                  const hovered = hoveredId === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleClick(r.id)}
                      onMouseEnter={() => setHoveredId(r.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="px-2 py-1.5 rounded-lg transition-all text-center w-full"
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        lineHeight: 1.3,
                        background: selected || hovered ? r.lightBg : "var(--wcm-bg-light)",
                        color: selected || hovered ? r.color : "var(--wcm-text-muted)",
                        border: `1px solid ${selected || hovered ? r.color : "var(--wcm-border)"}`,
                        cursor: "pointer",
                      }}
                    >
                      {schematicRegions.find((s) => s.id === r.id)?.labelShort ?? r.label}
                    </button>
                  );
                })}
              </div>
            </div>
            </motion.div>
          </ParallaxFloat>

          <ParallaxFloat y={yReverse} className="w-full h-full min-h-0">
            <div className="h-full min-h-[280px] lg:min-h-0">
            <AnimatePresence mode="wait">
              {activeRegion ? (
                <motion.div key={activeRegion.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                  className="relative rounded-2xl p-6 lg:p-7 w-full h-full"
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
                    style={{ background: activeRegion.lightBg, border: `1px solid ${activeRegion.color}30` }}
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
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center rounded-2xl w-full h-full"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    padding: "32px 28px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    className="mb-5 flex items-center justify-center w-14 h-14 rounded-full"
                    style={{ background: "rgba(207,69,32,0.08)", border: "1px solid rgba(207,69,32,0.2)" }}
                  >
                    <Info className="w-6 h-6" style={{ color: "#cf4520" }} />
                  </div>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--wcm-crimson)", marginBottom: "6px" }}>
                    Select a body region to explore
                  </p>
                  <p className="max-w-sm" style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--wcm-text-secondary)" }}>
                    Tap a region on the anatomy map or choose a label below to see what may be found — in clear, patient-friendly language.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </ParallaxFloat>
        </div>
      </div>
    </section>
  );
}
