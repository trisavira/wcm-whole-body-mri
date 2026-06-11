import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Play, X } from "lucide-react";
import { trackVideoPlay } from "../../lib/analytics";
import { SectionIntro } from "./SectionIntro";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { images } from "../../lib/images";

const videos = [
  {
    id: "what-is",
    title: "What is Whole-Body MRI?",
    description: "Learn what Whole-Body MRI is, who may benefit, and how it fits into preventive care at WCM.",
    duration: "3:24",
    color: "#b31b1b",
    thumbnail: images.videoWhatIs,
    thumbnailAlt: "MRI scanner and imaging suite",
  },
  {
    id: "why-choose",
    title: "Why choose Weill Cornell Medicine",
    description: "Learn how our academic, integrated care model differs from direct-to-consumer alternatives.",
    duration: "4:10",
    color: "#cf4520",
    thumbnail: images.videoWhyChoose,
    thumbnailAlt: "Weill Cornell Medicine care team",
  },
  {
    id: "what-to-expect",
    title: "What to expect",
    description: "Walk through the patient journey — from consultation to scan day to receiving your results.",
    duration: "5:02",
    color: "#e7751d",
    thumbnail: images.videoWhatToExpect,
    thumbnailAlt: "Patient consultation at Weill Cornell Medicine",
  },
];

export function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [playingId, setPlayingId] = useState<string | null>(null);

  const playing = videos.find((v) => v.id === playingId);

  return (
    <section id="videos" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro eyebrow="Video library" title="Watch & learn" inView={inView}>
          Short videos from our clinical team covering what Whole-Body MRI is, why patients choose Weill Cornell Medicine, and what to expect from consultation through results.
        </SectionIntro>

        <div className="grid md:grid-cols-3 gap-5">
          {videos.map((video, i) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => { setPlayingId(video.id); trackVideoPlay(video.id); }}
              className="rounded-2xl overflow-hidden text-left transition-all group"
              style={{ background: "var(--wcm-bg-light)", border: "1px solid var(--wcm-border)", cursor: "pointer" }}
            >
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={video.thumbnail}
                  alt={video.thumbnailAlt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.15))` }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg" style={{ background: video.color }}>
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded" style={{ fontSize: "11px", fontWeight: 600, background: "rgba(0,0,0,0.65)", color: "#fff" }}>
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="mb-1.5" style={{ fontSize: "14px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{video.title}</h3>
                <p style={{ fontSize: "12px", lineHeight: 1.55, color: "var(--wcm-text-secondary)" }}>{video.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setPlayingId(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative rounded-2xl overflow-hidden max-w-lg w-full"
              style={{ background: "#ffffff" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <ImageWithFallback src={playing.thumbnail} alt={playing.thumbnailAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: playing.color }}>
                    <Play className="w-7 h-7 ml-1 text-white" fill="white" />
                  </div>
                </div>
              </div>
              <div className="p-6 text-center relative">
                <button onClick={() => setPlayingId(null)} className="absolute top-4 right-4" style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <X className="w-5 h-5" style={{ color: "var(--wcm-text-secondary)" }} />
                </button>
                <h3 className="mb-2" style={{ fontSize: "18px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{playing.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--wcm-text-secondary)" }}>
                  Video placeholder — final content will be provided by the clinical team.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
