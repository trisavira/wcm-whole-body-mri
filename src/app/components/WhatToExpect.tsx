import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SectionIntro } from "./SectionIntro";
import { ParallaxFloat, ParallaxImage, ParallaxOrbs, useSectionParallax } from "./ParallaxImage";
import { VideoModal, VideoTrigger, type VideoContent } from "./VideoModal";
import { videos } from "../../lib/videos";
import { images, imageCrop } from "../../lib/images";

const journey = [
  {
    step: "1",
    phase: "Before",
    title: "Consultation & preparation",
    summary: "Meet with our team, complete forms, and prepare for your visit.",
    bullets: [
      "Meet with a dedicated provider to review your health history, discuss goals, and confirm whether Whole-Body MRI is right for you.",
      "Complete registration and safety forms in advance through Weill Cornell Connect to streamline your visit.",
      "If you have prior imaging from outside Weill Cornell Medicine, send records ahead so radiologists can compare them to your new scan.",
      "Whole-Body MRI is a self-pay screening exam — our team explains costs in advance so there are no surprises.",
      "Payment is typically due at the time of your appointment.",
    ],
    image: images.consultation,
    imageAlt: "Doctor discussing health history with a patient",
    objectPosition: imageCrop.consultation,
    color: "#e7751d",
  },
  {
    step: "2",
    phase: "During",
    title: "Your scan",
    summary: "A comfortable, radiation-free exam in our state-of-the-art MRI suite.",
    bullets: [
      "Your scan uses wide-bore MRI technology designed for comfort during the approximately 45-minute exam.",
      "Thousands of images are captured from your head through the middle of your thighs in a single session.",
      "MRI uses no radiation and typically no contrast dye.",
      "Music, TV, or movies are available in many suites to help you relax and remain still.",
      "Our technologists guide you through each step and answer questions before and during the scan.",
    ],
    image: images.patientInScanner,
    imageAlt: "Modern MRI scanner in a bright imaging suite",
    objectPosition: imageCrop.patientScan,
    color: "#cf4520",
  },
  {
    step: "3",
    phase: "After",
    title: "Results & follow-up",
    summary: "Expert interpretation, clear reports, and coordinated care when needed.",
    bullets: [
      "Your images are reviewed by a team of subspecialty radiologists who collaborate on a detailed report.",
      "Reports are typically available within two business days through Weill Cornell Connect.",
      "You receive a patient-friendly report with visual summaries and clear follow-up guidance when needed.",
      "Our care team is available to answer questions and arrange a follow-up visit to review your results.",
      "If findings need attention, we coordinate specialist referrals within Weill Cornell Medicine and NewYork-Presbyterian.",
      "Some patients may need additional imaging or follow-up tests — we guide you through every next step.",
    ],
    image: images.radiologyReview,
    imageAlt: "Radiologists reviewing MRI results together",
    objectPosition: imageCrop.radiology,
    color: "#b31b1b",
  },
];

export function WhatToExpect() {
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [openVideo, setOpenVideo] = useState<VideoContent | null>(null);
  const { ySlow, yFast, yReverse } = useSectionParallax(ref);
  const current = journey[active];

  return (
    <section id="what-to-expect" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <ParallaxOrbs sectionRef={ref} variant="mixed" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ParallaxFloat y={yReverse}>
          <SectionIntro eyebrow="Patient journey" title="What to expect" inView={inView}>
            From your first conversation to receiving results, our team guides you at every step — with clear communication and coordinated follow-up when needed.
          </SectionIntro>
        </ParallaxFloat>

        <ParallaxFloat y={ySlow}>
          <div className="grid md:grid-cols-3 gap-3 mb-8">
            {journey.map((step, i) => (
              <motion.button
                key={step.step}
                type="button"
                onClick={() => setActive(i)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl p-5 text-left transition-all"
                style={{
                  cursor: "pointer",
                  background: active === i ? step.color : "#ffffff",
                  border: `1px solid ${active === i ? step.color : "var(--wcm-border)"}`,
                  boxShadow: active === i ? `0 12px 32px ${step.color}30` : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <p
                  className="mb-1 uppercase tracking-[0.1em]"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: active === i ? "rgba(255,255,255,0.85)" : step.color,
                  }}
                >
                  {step.phase}
                </p>
                <p
                  className="mb-2"
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: 1.25,
                    color: active === i ? "#ffffff" : "var(--wcm-crimson)",
                  }}
                >
                  {step.title}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.55,
                    color: active === i ? "rgba(255,255,255,0.88)" : "var(--wcm-text-secondary)",
                  }}
                >
                  {step.summary}
                </p>
              </motion.button>
            ))}
          </div>
        </ParallaxFloat>

        <ParallaxFloat y={yFast}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              ref={panelRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden min-h-[420px]"
              style={{ border: "1px solid var(--wcm-border)", boxShadow: "0 16px 48px rgba(0,0,0,0.1)", background: "#ffffff" }}
            >
              <div className="relative min-h-[280px] lg:min-h-full overflow-hidden">
                <ParallaxImage
                  src={current.image}
                  alt={current.imageAlt}
                  speed={0.12}
                  sectionRef={panelRef}
                  objectPosition={current.objectPosition}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 50%)" }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p
                    className="mb-1 uppercase tracking-[0.1em]"
                    style={{ fontSize: "11px", fontWeight: 700, color: current.color }}
                  >
                    Step {current.step} · {current.phase}
                  </p>
                  <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#ffffff" }}>
                    {current.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 lg:p-10">
                <ul className="space-y-3 mb-6">
                  {current.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: current.color }} />
                      <span style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
                {active === 0 && (
                  <VideoTrigger video={videos.whatToExpect} label="Watch: What to expect" onOpen={setOpenVideo} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ParallaxFloat>
      </div>

      {openVideo && <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />}
    </section>
  );
}
