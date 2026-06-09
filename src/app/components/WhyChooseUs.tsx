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
  const { ySlow, yFast, yReverse } = useSectionParallax(ref);

  return (
    <section id="why-choose-us" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <ParallaxOrbs sectionRef={ref} variant="warm" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ParallaxFloat y={yReverse}>
          <SectionIntro eyebrow="Why WCM" title="Why Weill Cornell Medicine?" inView={inView}>
          Direct-to-consumer screening is widely available. Our program is built on academic expertise, integrated care, and responsible clinical stewardship.
          </SectionIntro>
        </ParallaxFloat>

        <ParallaxFloat y={ySlow}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.05 }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
                className="rounded-xl p-5 transition-shadow"
                style={{ background: "#ffffff", border: `1px solid ${item.color}25` }}
              >
                <Icon className="w-8 h-8 mb-3" style={{ color: item.color }} />
                <p className="mb-2" style={{ fontSize: "15px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{item.title}</p>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--wcm-text-secondary)" }}>{item.description}</p>
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
