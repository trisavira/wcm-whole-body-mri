import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { SectionIntro } from "./SectionIntro";
import { VideoModal, VideoTrigger, type VideoContent } from "./VideoModal";
import { videos } from "../../lib/videos";

const stats = [
  { value: "96", suffix: "%", label: "Body coverage in one visit" },
  { value: "1 in 6", suffix: "", label: "May benefit from proactive screening" },
  { value: "0", suffix: "", label: "Radiation from MRI" },
  { value: "~45", suffix: " min", label: "Typical scan time" },
];

export function WhatIsWBMRI() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openVideo, setOpenVideo] = useState<VideoContent | null>(null);

  return (
    <section id="what-is-wb-mri" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="relative max-w-5xl mx-auto px-6">
        <SectionIntro eyebrow="What we offer" title="What is Whole-Body MRI?" inView={inView}>
          A single, radiation-free imaging study that evaluates many areas of the body in one visit — head through lower extremities — offered through our Early Detection & Prevention program at Weill Cornell Medicine.
        </SectionIntro>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 mb-10 border-t border-b py-10"
          style={{ borderColor: "var(--wcm-border)" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center px-2 ${i < stats.length - 1 ? "lg:border-r" : ""}`}
              style={{ borderColor: "var(--wcm-border)" }}
            >
              <div className="flex items-baseline justify-center gap-0.5 mb-2">
                <span style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 700, lineHeight: 1, color: "#b31b1b" }}>
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", fontWeight: 700, color: "#b31b1b" }}>
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p style={{ fontSize: "13px", fontWeight: 500, lineHeight: 1.45, color: "var(--wcm-text-muted)", maxWidth: "148px", margin: "0 auto" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="text-center">
          <VideoTrigger video={videos.whatIs} label="Learn more about Whole-Body MRI" onOpen={setOpenVideo} />
        </div>

        <p className="mt-8 text-center max-w-2xl mx-auto" style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--wcm-text-secondary)" }}>
          Not appropriate for everyone — a consultation confirms whether this scan aligns with your health history and goals.
        </p>
      </div>

      {openVideo && <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />}
    </section>
  );
}
