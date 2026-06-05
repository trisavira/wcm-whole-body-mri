import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { trackCTA } from "../../lib/analytics";
import { images } from "../../lib/images";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(207,69,32,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(207,69,32,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="mb-3" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", color: "#cf4520" }}>
              EARLY DETECTION & PREVENTION PROGRAM
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 leading-[1.08]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}
            >
              Whole-Body MRI for{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #e7751d, #b31b1b)" }}>
                early detection
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-8 max-w-lg"
              style={{ fontSize: "16px", lineHeight: 1.6, color: "var(--wcm-text-muted)" }}
            >
              A science-based, radiation-free imaging program at Weill Cornell Medicine — for health-conscious adults who want a proactive view of their health, interpreted by subspecialty radiologists within an integrated academic care system.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="flex flex-wrap gap-3">
              <Button size="lg" className="border-0 text-white group px-7" style={{ background: "#cf4520" }} asChild>
                <a href="#contact" onClick={() => trackCTA("request_consultation", "hero")}>
                  Request Consultation
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" style={{ borderColor: "rgba(207,69,32,0.4)", color: "#cf4520" }} asChild>
                <a href="#videos" onClick={() => trackCTA("learn_more", "hero")}>
                  <Play className="mr-2 w-4 h-4" />
                  Watch Video
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-square" style={{ boxShadow: "0 16px 48px rgba(179,27,27,0.15)" }}>
              <ImageWithFallback src={images.mriScanner} alt="MRI scanner" className="w-full h-full object-cover" />
              <motion.div
                className="absolute left-0 right-0 h-0.5 pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, #e7751d, transparent)", boxShadow: "0 0 12px 3px rgba(231,117,29,0.4)" }}
                animate={{ top: ["12%", "88%", "12%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="absolute -bottom-3 -left-3 flex gap-2">
              {[
                { n: "45", u: "min scan" },
                { n: "0", u: "radiation" },
              ].map((s) => (
                <div key={s.u} className="rounded-xl px-4 py-2 text-center" style={{ background: "#fff", border: "1px solid var(--wcm-border)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                  <p style={{ fontSize: "20px", fontWeight: 700, color: "#b31b1b", lineHeight: 1 }}>{s.n}</p>
                  <p style={{ fontSize: "10px", color: "var(--wcm-text-secondary)" }}>{s.u}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: "linear-gradient(to top, var(--wcm-bg-light), transparent)" }} />
    </section>
  );
}
