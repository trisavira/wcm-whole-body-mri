import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ParallaxFloat, ParallaxImage, useSectionParallax } from "./ParallaxImage";
import { trackCTA } from "../../lib/analytics";
import { images, imageCrop } from "../../lib/images";

export function CTALite() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { ySlow, yFast } = useSectionParallax(ref);

  return (
    <section id="contact-lite" ref={ref} className="relative py-16 overflow-hidden">
      <ParallaxImage
        src={images.mriSuite}
        alt="Comfortable MRI suite at Weill Cornell Medicine"
        speed={0.14}
        sectionRef={ref}
        objectPosition={imageCrop.suite}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(15,15,18,0.78), rgba(15,15,18,0.88))" }} />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{ y: ySlow }}
      />

      <ParallaxFloat y={yFast}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#ffffff" }}>
            Ready to explore Whole-Body MRI?
          </h2>
          <p className="mb-6" style={{ fontSize: "15px", lineHeight: 1.65, color: "rgba(255,255,255,0.9)" }}>
            Speak with our team — no pressure, no obligation. We&apos;ll help you decide if this is right for you.
          </p>
          <Button size="lg" className="border-0 group" style={{ background: "#ffffff", color: "#b31b1b" }} asChild>
            <a href="#contact" onClick={() => trackCTA("request_consultation", "contact-lite")}>
              Request a Consultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </ParallaxFloat>
    </section>
  );
}
