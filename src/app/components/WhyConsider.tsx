import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { SectionIntro } from "./SectionIntro";
import { ParallaxImage } from "./ParallaxImage";
import { images, imageCrop } from "../../lib/images";

const steps = [
  {
    num: "1",
    stat: "Step one",
    title: "Confirm it is right for you",
    description: "Review your health history, discuss goals, and determine whether Whole-Body MRI is appropriate — before you schedule a scan.",
    image: images.consultationExam,
    imageAlt: "Physician meeting with a patient before imaging",
    objectPosition: imageCrop.consultation,
  },
  {
    num: "2",
    stat: "~45 minutes",
    title: "Complete your Whole-Body MRI",
    description: "One radiation-free visit evaluates many regions of the body. Most patients spend about 45 minutes in the scanner, with brief preparation before and after.",
    image: images.patientInScanner,
    imageAlt: "Patient inside the MRI scanner during imaging",
    objectPosition: imageCrop.patientScan,
  },
  {
    num: "3",
    stat: "Expert-led",
    title: "Review results & follow up",
    description: "Subspecialty radiologists interpret your images. Your care team explains findings in plain language and coordinates specialist visits within WCM when needed.",
    image: images.radiologyTeam,
    imageAlt: "Clinical team reviewing diagnostic images on monitors",
    objectPosition: imageCrop.radiology,
  },
];

function ResultsMock() {
  const rows = [
    { label: "Brain", status: "Clear", color: "#2d7a3e" },
    { label: "Chest", status: "Discuss", color: "#e7751d" },
    { label: "Abdomen", status: "Clear", color: "#2d7a3e" },
    { label: "Spine", status: "Monitor", color: "#cf4520" },
  ];
  return (
    <div className="absolute bottom-4 left-4 right-4 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#cf4520" }}>YOUR HEALTH OVERVIEW</p>
      <p className="mb-3" style={{ fontSize: "14px", fontWeight: 700, color: "#b31b1b" }}>Sample results by region</p>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: "var(--wcm-bg-light)" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{r.label}</span>
            <span style={{ fontSize: "11px", fontWeight: 600, color: r.color }}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhyConsider() {
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section id="why-consider" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro eyebrow="Our approach" title="How Whole-Body MRI works" inView={inView}>
          A clear path from your first conversation to personalized results — with subspecialty radiologists and integrated care at every step.
        </SectionIntro>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {steps.map((step, i) => (
            <button
              key={step.num}
              type="button"
              onClick={() => setActive(i)}
              className="rounded-full px-5 py-2.5 transition-all"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                background: active === i ? "#b31b1b" : "var(--wcm-bg-light)",
                color: active === i ? "#fff" : "var(--wcm-crimson)",
                border: `1px solid ${active === i ? "#b31b1b" : "var(--wcm-border)"}`,
              }}
            >
              {step.num}. {step.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            ref={panelRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden min-h-[420px] lg:min-h-[480px]"
            style={{ border: "1px solid var(--wcm-border)", boxShadow: "0 12px 48px rgba(0,0,0,0.08)" }}
          >
            <div className="relative min-h-[280px] lg:min-h-full overflow-hidden">
              <ParallaxImage
                src={current.image}
                alt={current.imageAlt}
                speed={0.12}
                sectionRef={panelRef}
                objectPosition={current.objectPosition}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)" }} />
              {active === 2 && <ResultsMock />}
              <div className="absolute top-4 left-4 rounded-full px-3 py-1" style={{ background: "rgba(255,255,255,0.92)", fontSize: "12px", fontWeight: 700, color: "#b31b1b" }}>
                {current.stat}
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 lg:p-12" style={{ background: "#ffffff" }}>
              <p className="mb-2" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", color: "#cf4520" }}>
                STEP {current.num}
              </p>
              <h3 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--wcm-crimson)", lineHeight: 1.2 }}>
                {current.title}
              </h3>
              <p className="mb-8" style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--wcm-text-muted)" }}>
                {current.description}
              </p>
              <a
                href="#what-to-expect"
                className="inline-flex items-center gap-2 group"
                style={{ fontSize: "14px", fontWeight: 600, color: "#cf4520", textDecoration: "none" }}
              >
                See the full patient journey
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
