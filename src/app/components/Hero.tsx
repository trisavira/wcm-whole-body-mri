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
        alt="State-of-the-art MRI scanner in a modern clinical imaging suite"
        speed={0.18}
        sectionRef={containerRef}
        offset={["start start", "end start"]}
        objectPosition={imageCrop.hero}
        imageScale={1.08}
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,10,0.95) 0%, rgba(8,8,10,0.72) 42%, rgba(8,8,10,0.45) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(179,27,27,0.18), transparent 70%)" }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 uppercase tracking-[0.14em]"
          style={{ fontSize: "11px", fontWeight: 600, color: "#FFC72C" }}
        >
          Weill Cornell Medicine · Early Detection & Prevention
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 max-w-4xl leading-[1.08]"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            textShadow: "0 2px 24px rgba(0,0,0,0.45)",
          }}
        >
          Whole Body MRI Early Detection.
          <br />
          <span style={{ color: "rgba(255,255,255,0.92)" }}>Greater Peace of Mind.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 max-w-xl"
          style={{
            fontSize: "17px",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 12px rgba(0,0,0,0.35)",
          }}
        >
          Radiation-free whole-body imaging interpreted by subspecialty radiologists — with integrated follow-up care when you need it.
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
    </section>
  );
}
