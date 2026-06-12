import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ParallaxImage } from "./ParallaxImage";
import { trackCTA } from "../../lib/analytics";
import { images, imageCrop } from "../../lib/images";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <ParallaxImage
        src={images.heroBackground}
        srcSet={images.heroBackgroundSrcSet}
        sizes="100vw"
        alt="Bright, modern MRI imaging suite at Weill Cornell Medicine"
        speed={0.12}
        sectionRef={containerRef}
        offset={["start start", "end start"]}
        objectPosition={imageCrop.hero}
        imageScale={1.02}
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,10,0.92) 0%, rgba(8,8,10,0.62) 48%, rgba(8,8,10,0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 15% 85%, rgba(179,27,27,0.12), transparent 65%)" }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="wcm-eyebrow mb-4"
          style={{ color: "#FFC72C" }}
        >
          Weill Cornell Medicine · Early Detection & Prevention
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="wcm-hero-title mb-5"
          style={{
            color: "#ffffff",
            textShadow: "0 1px 16px rgba(0,0,0,0.35)",
          }}
        >
          <span className="block whitespace-nowrap text-[clamp(13px,3.8vw,2.75rem)] tracking-tight">
            Whole Body MRI Early Detection.
          </span>
          <span className="block">Greater Peace of Mind.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="wcm-lead mb-10 max-w-xl"
          style={{
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 12px rgba(0,0,0,0.35)",
          }}
        >
          Science-based prevention and early detection within a leading academic medical center — radiation-free imaging with subspecialty radiologist review and coordinated follow-up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Button size="lg" className="border-0 text-white group px-8 h-12 rounded-full" style={{ background: "#cf4520" }} asChild>
            <a href="#contact" onClick={() => trackCTA("request_consultation", "hero")}>
              Request a Consultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full px-8 !bg-transparent !text-white border-white/60 hover:!bg-white/15 hover:!text-white"
            asChild
          >
            <a href="#what-is-wb-mri" onClick={() => trackCTA("learn_more", "hero")}>
              Learn more
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
