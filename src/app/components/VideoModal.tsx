import { motion } from "motion/react";
import { Play, X } from "lucide-react";
import { trackVideoPlay } from "../../lib/analytics";
import type { videos } from "../../lib/videos";

export type VideoContent = typeof videos[keyof typeof videos];

type VideoModalProps = {
  video: VideoContent;
  onClose: () => void;
};

export function VideoModal({ video, onClose }: VideoModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.72)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        className="relative rounded-2xl p-8 max-w-lg w-full text-center"
        style={{ background: "#ffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <X className="w-5 h-5" style={{ color: "var(--wcm-text-secondary)" }} />
        </button>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${video.color}15` }}>
          <Play className="w-7 h-7 ml-1" style={{ color: video.color }} fill={video.color} />
        </div>
        <h3 className="mb-2" style={{ fontSize: "18px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{video.title}</h3>
        <p style={{ fontSize: "14px", color: "var(--wcm-text-secondary)" }}>
          Video placeholder — final content from the clinical team. ({video.duration})
        </p>
      </motion.div>
    </motion.div>
  );
}

export function VideoTrigger({
  video,
  label = "Learn more",
  onOpen,
  light = false,
}: {
  video: VideoContent;
  label?: string;
  onOpen: (video: VideoContent) => void;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        trackVideoPlay(video.id);
        onOpen(video);
      }}
      className="inline-flex items-center gap-1.5 mt-4 transition-all hover:gap-2"
      style={{ fontSize: "14px", fontWeight: 600, color: light ? "#FFC72C" : "#cf4520", background: "none", border: "none", cursor: "pointer" }}
    >
      <Play className="w-4 h-4" fill="currentColor" />
      {label}
    </button>
  );
}
