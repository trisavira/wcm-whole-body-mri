import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionIntro } from "./SectionIntro";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";

const testimonials = [
  {
    type: "Fear reduction",
    quote: "They walked me through every step calmly. I left feeling informed — not anxious. That mattered more than anything.",
    name: "Patient",
    role: "Age 48",
    initial: "M",
    color: "#e7751d",
  },
  {
    type: "Why I chose this",
    quote: "I wanted care at an academic medical center — not a commercial screening company. The difference was clear from the first call.",
    name: "Patient",
    role: "Age 42",
    initial: "J",
    color: "#cf4520",
  },
  {
    type: "Integrated care",
    quote: "When something needed attention, a specialist visit was arranged quickly. I did not have to navigate the system on my own.",
    name: "Patient",
    role: "Age 55",
    initial: "R",
    color: "#b31b1b",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="testimonials" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="relative max-w-2xl mx-auto px-6">
        <SectionIntro eyebrow="Testimonials" title="Patient perspectives" inView={inView}>
          Illustrative experiences from patients who chose Whole-Body MRI at Weill Cornell Medicine.
        </SectionIntro>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <Carousel setApi={setApi} opts={{ loop: true }} className="relative">
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <article
                    className="rounded-2xl p-6 lg:p-8 relative"
                    style={{
                      background: "#ffffff",
                      border: "1px solid var(--wcm-border)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Quote
                      className="absolute top-6 right-6 w-7 h-7 opacity-10"
                      style={{ color: t.color }}
                    />
                    <span
                      className="inline-block mb-4 px-2.5 py-0.5 rounded-full uppercase tracking-[0.08em]"
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        background: `${t.color}12`,
                        color: t.color,
                        border: `1px solid ${t.color}30`,
                      }}
                    >
                      {t.type}
                    </span>
                    <p
                      className="mb-6"
                      style={{
                        fontSize: "17px",
                        lineHeight: 1.65,
                        fontWeight: 400,
                        color: "var(--wcm-text-muted)",
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--wcm-border)" }}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                        style={{ background: t.color, fontSize: "13px" }}
                      >
                        {t.initial}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--wcm-crimson)" }}>{t.name}</p>
                        <p style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>{t.role}</p>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ border: "1px solid var(--wcm-border)", background: "#ffffff", cursor: "pointer" }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" style={{ color: "var(--wcm-crimson)" }} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => api?.scrollTo(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: current === i ? "24px" : "8px",
                      height: "8px",
                      background: current === i ? "#b31b1b" : "var(--wcm-border)",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => api?.scrollNext()}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ border: "1px solid var(--wcm-border)", background: "#ffffff", cursor: "pointer" }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" style={{ color: "var(--wcm-crimson)" }} />
              </button>
            </div>
          </Carousel>
        </motion.div>

        <p className="mt-8 text-center" style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>
          Every patient is different — a consultation is the best way to understand what is right for you.
        </p>
      </div>
    </section>
  );
}
