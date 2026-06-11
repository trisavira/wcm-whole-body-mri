import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Heart, ShieldCheck, Search, Users } from "lucide-react";
import { SectionIntro } from "./SectionIntro";
import { ParallaxImage } from "./ParallaxImage";
import { images, imageCrop } from "../../lib/images";

const reasons = [
  {
    icon: Heart,
    title: "Proactive health",
    description: "For adults who want a clearer picture of their health — often before symptoms develop.",
    color: "#cf4520",
    image: images.proactiveHealth,
    imageAlt: "Doctor discussing preventive care with a patient",
    objectPosition: imageCrop.consultation,
  },
  {
    icon: Search,
    title: "Whole-body view",
    description: "Many body regions are evaluated in one visit, instead of separate appointments over time.",
    color: "#e7751d",
    image: images.wholeBodyView,
    imageAlt: "MRI scanner at Weill Cornell Medicine",
    objectPosition: imageCrop.suite,
  },
  {
    icon: ShieldCheck,
    title: "Greater peace of mind",
    description: "Results are read by subspecialty radiologists and explained by your care team in plain language.",
    color: "#b31b1b",
    image: images.peaceOfMind,
    imageAlt: "Radiologist reviewing diagnostic images",
    objectPosition: imageCrop.radiology,
  },
  {
    icon: Users,
    title: "Who it may be for",
    description: "Often considered by generally healthy adults. Your consultation confirms whether it is appropriate for you.",
    color: "#cf4520",
    image: images.whoFor,
    imageAlt: "Patient in a comfortable MRI suite",
    objectPosition: imageCrop.patientScan,
  },
];

export function WhyConsider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-consider" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionIntro eyebrow="Why consider it" title="Why consider it?" inView={inView}>
          Patients often choose Whole-Body MRI to stay informed about their health — as a complement to routine care, not a replacement for it.
        </SectionIntro>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden group"
                style={{ background: "#ffffff", border: `1px solid ${item.color}25` }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ParallaxImage
                    src={item.image}
                    alt={item.imageAlt}
                    speed={0.08}
                    sectionRef={ref}
                    objectPosition={item.objectPosition}
                    imageScale={1.12}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
                    style={{ background: `linear-gradient(to top, ${item.color}cc, transparent 55%)` }}
                  />
                  <div
                    className="absolute bottom-3 left-3 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.95)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-2" style={{ fontSize: "15px", fontWeight: 600, color: "var(--wcm-crimson)" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--wcm-text-secondary)" }}>
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
