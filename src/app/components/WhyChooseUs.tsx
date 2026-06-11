import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Building2, Stethoscope, FileText, Route, HandHeart, Microscope } from "lucide-react";
import { SectionIntro } from "./SectionIntro";
import { VideoModal, VideoTrigger, type VideoContent } from "./VideoModal";
import { videos } from "../../lib/videos";
import { ParallaxFloat, ParallaxOrbs, useSectionParallax } from "./ParallaxImage";

const differentiators = [
  { icon: Building2, title: "Academic medical center", description: "Delivered within a leading academic health system — not a standalone screening center.", color: "#b31b1b" },
  { icon: Stethoscope, title: "Expert radiologists", description: "Every study interpreted by board-certified subspecialty radiologists.", color: "#cf4520" },
  { icon: Route, title: "Integrated care", description: "Specialist referrals coordinated within Weill Cornell Medicine when needed.", color: "#e7751d" },
  { icon: FileText, title: "Clear reports", description: "Patient-friendly language with visual summaries — not medical jargon.", color: "#cf4520" },
  { icon: HandHeart, title: "Care navigator", description: "Dedicated support for scheduling follow-up and specialist visits.", color: "#b31b1b" },
  { icon: Microscope, title: "Evidence-based", description: "Grounded in science-informed protocols — not marketing hype.", color: "#e7751d" },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openVideo, setOpenVideo] = useState<VideoContent | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const { ySlow, yFast, yReverse } = useSectionParallax(ref);

  return (
    <section id="why-choose-us" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      <ParallaxOrbs sectionRef={ref} variant="warm" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ParallaxFloat y={yReverse}>
          <SectionIntro eyebrow="Why choose us" title="Why Weill Cornell Medicine?" inView={inView}>
            Direct-to-consumer screening is widely available. Our program is built on academic expertise, integrated care, and responsible clinical stewardship.
          </SectionIntro>
        </ParallaxFloat>

        <p className="text-center mb-6" style={{ fontSize: "13px", color: "var(--wcm-text-secondary)" }}>
          Hover or tap a card to learn more about each differentiator.
        </p>

        <ParallaxFloat y={ySlow}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              const isActive = hovered === i;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.05 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setHovered(isActive ? null : i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  className="rounded-xl p-6 min-h-[120px] cursor-pointer"
                  style={{
                    background: isActive ? item.color : "#ffffff",
                    border: `1px solid ${isActive ? item.color : `${item.color}25`}`,
                    boxShadow: isActive ? `0 20px 48px ${item.color}40` : "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <motion.div animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.25 }}>
                    <Icon
                      className="w-8 h-8 mb-4 transition-colors duration-300"
                      style={{ color: isActive ? "#ffffff" : item.color }}
                    />
                  </motion.div>
                  <p
                    className="mb-2 transition-colors duration-300"
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: isActive ? "#ffffff" : "var(--wcm-crimson)",
                    }}
                  >
                    {item.title}
                  </p>
                  <motion.p
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      height: isActive ? "auto" : 0,
                      marginTop: isActive ? 0 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: isActive ? "rgba(255,255,255,0.92)" : "var(--wcm-text-secondary)",
                      overflow: "hidden",
                    }}
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </ParallaxFloat>

        <ParallaxFloat y={yFast}>
          <div className="text-center mt-8">
            <VideoTrigger video={videos.whyWcm} label="Learn more about our approach" onOpen={setOpenVideo} />
          </div>
        </ParallaxFloat>
      </div>

      {openVideo && <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />}
    </section>
  );
}
