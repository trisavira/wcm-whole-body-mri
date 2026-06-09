import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { SectionIntro } from "./SectionIntro";
import { VideoModal, VideoTrigger, type VideoContent } from "./VideoModal";
import { videos } from "../../lib/videos";

const stats = [
  { value: "96", suffix: "%", label: "Body coverage in one visit", detail: "Head through lower extremities — one comprehensive session." },
  { value: "1 in 6", suffix: "", label: "May benefit from proactive screening", detail: "Eligibility is confirmed during your consultation." },
  { value: "0", suffix: "", label: "Radiation from MRI", detail: "Unlike CT or PET, MRI uses magnetic fields only." },
  { value: "~45", suffix: " min", label: "Typical scan time", detail: "Most visits include brief preparation and recovery time." },
];

export function WhatIsWBMRI() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStat, setActiveStat] = useState(0);
  const [openVideo, setOpenVideo] = useState<VideoContent | null>(null);

  return (
    <section id="what-is-wb-mri" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionIntro eyebrow="What we offer" title="What is Whole-Body MRI?" inView={inView}>
          A single, radiation-free imaging study that evaluates many areas of the body in one visit — offered through our Early Detection & Prevention program at Weill Cornell Medicine.
        </SectionIntro>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {stats.map((stat, i) => (
            <motion.button
              key={stat.value + stat.label}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActiveStat(i)}
              whileHover={{ y: -3 }}
              className="rounded-2xl p-6 text-left transition-all"
              style={{
                background: activeStat === i ? "#ffffff" : "transparent",
                border: `1px solid ${activeStat === i ? "var(--wcm-border)" : "transparent"}`,
                cursor: "pointer",
                boxShadow: activeStat === i ? "0 12px 40px rgba(0,0,0,0.08)" : "none",
              }}
            >
              <div className="flex items-baseline gap-0.5 mb-2">
                <span style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1, color: "#b31b1b" }}>
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "#b31b1b" }}>
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "13px", fontWeight: 600, lineHeight: 1.4, color: "var(--wcm-text-muted)" }}>
                {stat.label}
              </p>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeStat}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl px-6 py-5 text-center max-w-2xl mx-auto mb-8"
          style={{ background: "#ffffff", border: "1px solid var(--wcm-border)" }}
        >
          <p style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>{stats[activeStat].detail}</p>
        </motion.div>

        <div className="text-center">
          <VideoTrigger video={videos.whatIs} label="Learn more about Whole-Body MRI" onOpen={setOpenVideo} />
        </div>

        <p className="mt-8 text-center" style={{ fontSize: "13px", color: "var(--wcm-text-secondary)" }}>
          Not appropriate for everyone — a consultation confirms whether this scan aligns with your health history and goals.
        </p>
      </div>

      {openVideo && <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />}
    </section>
  );
}
