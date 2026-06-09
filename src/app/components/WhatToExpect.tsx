import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { SectionIntro } from "./SectionIntro";
import { ParallaxFloat, ParallaxImage, ParallaxOrbs, useSectionParallax } from "./ParallaxImage";
import { VideoModal, VideoTrigger, type VideoContent } from "./VideoModal";
import { videos } from "../../lib/videos";
import { images, imageCrop } from "../../lib/images";

const journey = [
  {
    step: "1",
    phase: "Before",
    title: "Consultation",
    description: "Review your health history, discuss goals, and confirm whether Whole-Body MRI is appropriate for you.",
    image: images.consultation,
    imageAlt: "Doctor discussing health history with a patient",
    objectPosition: imageCrop.consultation,
    color: "#e7751d",
  },
  {
    step: "2",
    phase: "During",
    title: "Your scan",
    description: "Relax in a comfortable MRI suite. The scan typically takes about 45 minutes with no radiation.",
    image: images.patientInScanner,
    imageAlt: "Patient receiving a whole-body MRI scan",
    objectPosition: imageCrop.patientScan,
    color: "#cf4520",
  },
  {
    step: "3",
    phase: "After",
    title: "Results & follow-up",
    description: "Radiologists review your images. A care navigator coordinates specialist visits if anything needs attention.",
    image: images.radiologyReview,
    imageAlt: "Radiologists reviewing MRI results together",
    objectPosition: imageCrop.radiology,
    color: "#b31b1b",
  },
];

export function WhatToExpect() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [openVideo, setOpenVideo] = useState<VideoContent | null>(null);
  const { ySlow, yFast, yReverse } = useSectionParallax(ref);
  const current = journey[active];

  return (
    <section id="what-to-expect" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      <ParallaxOrbs sectionRef={ref} variant="mixed" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ParallaxFloat y={yReverse}>
          <SectionIntro eyebrow="Patient journey" title="What to expect" inView={inView}>
            A clear path from your first conversation to receiving results — with guidance at every step.
          </SectionIntro>
        </ParallaxFloat>

        <ParallaxFloat y={ySlow}>
          <div className="hidden md:flex items-center justify-center gap-0 mb-8 max-w-2xl mx-auto">
            {journey.map((step, i) => (
              <div key={step.step} className="flex items-center flex-1">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-2 flex-1"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: active === i ? step.color : "var(--wcm-bg-light)",
                      color: active === i ? "#fff" : "var(--wcm-text-secondary)",
                      border: `2px solid ${active === i ? step.color : "var(--wcm-border)"}`,
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {step.step}
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: active === i ? 600 : 500, color: active === i ? step.color : "var(--wcm-text-secondary)" }}>
                    {step.title}
                  </span>
                </button>
                {i < journey.length - 1 && (
                  <div className="h-0.5 flex-1 mx-2" style={{ background: "var(--wcm-border)", minWidth: "24px" }} />
                )}
              </div>
            ))}
          </div>
        </ParallaxFloat>

        <ParallaxFloat y={yFast}>
          <motion.div
            ref={cardRef}
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-[480px]"
            style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}
          >
            <ParallaxImage
              src={current.image}
              alt={current.imageAlt}
              speed={0.18}
              sectionRef={cardRef}
              objectPosition={current.objectPosition}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.15) 100%)" }} />

            <motion.div style={{ y: yReverse }} className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 max-w-2xl">
              <p className="mb-2" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", color: current.color }}>
                {current.phase.toUpperCase()}
              </p>
              <h3 className="mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "#ffffff" }}>
                {current.title}
              </h3>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
                {current.description}
              </p>
              {active === 0 && (
                <VideoTrigger video={videos.whatToExpect} label="Watch: What to expect" onOpen={setOpenVideo} light />
              )}
            </motion.div>

            <div className="absolute top-4 right-4 flex gap-2 md:hidden">
              {journey.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: active === i ? "#fff" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer" }}
                />
              ))}
            </div>
          </motion.div>
        </ParallaxFloat>
      </div>

      {openVideo && <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />}
    </section>
  );
}
