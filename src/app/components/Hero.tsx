import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ParallaxImage } from "./ParallaxImage";
import { trackCTA } from "../../lib/analytics";
import { images, imageCrop } from "../../lib/images";

const heroHighlights = [
  { value: "1 visit", label: "Whole-body coverage" },
  { value: "0", label: "Radiation exposure" },
  { value: "Clinician-led", label: "Expert interpretation" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const highlightsY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <ParallaxImage
        src={images.heroBackground}
        srcSet={images.heroBackgroundSrcSet}
        sizes="100vw"
        alt="MRI scanner in a modern clinical imaging suite"
        speed={0.18}
        sectionRef={containerRef}
        offset={["start start", "end start"]}
        objectPosition={imageCrop.hero}
        imageScale={1.05}
        priority
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.25) 100%)" }} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-8 pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 uppercase tracking-[0.14em]"
          style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.75)" }}
        >
          Early detection & prevention
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-5 max-w-3xl leading-[1.05]"
          style={{ fontSize: "clamp(2.75rem, 6.5vw, 4.25rem)", fontWeight: 700, color: "#ffffff" }}
        >
          Understand your health with clarity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 max-w-xl"
          style={{ fontSize: "17px", lineHeight: 1.65, color: "rgba(255,255,255,0.88)" }}
        >
          Whole-Body MRI at Weill Cornell Medicine — radiation-free imaging interpreted by subspecialty radiologists, with integrated follow-up when you need it.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Button size="lg" className="border-0 text-white group px-8 h-12 rounded-full" style={{ background: "#cf4520" }} asChild>
            <a href="#contact" onClick={() => trackCTA("request_consultation", "hero")}>
              Request a Consultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: highlightsY, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
        className="relative z-10 w-full border-t border-white/15"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {heroHighlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="text-center sm:text-left sm:border-r sm:border-white/10 sm:last:border-r-0 sm:pr-4"
            >
              <p style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
                {item.value}
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "4px", lineHeight: 1.4 }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
