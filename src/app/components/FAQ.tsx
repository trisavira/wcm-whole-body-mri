import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { SectionIntro } from "./SectionIntro";
import { ParallaxFloat, ParallaxOrbs, useSectionParallax } from "./ParallaxImage";

/** Addresses BRD §5 audience concerns */
const faqs = [
  {
    q: "Is Whole-Body MRI legitimate or overhyped?",
    a: "Whole-Body MRI is established medical technology offered within an academic medical center with subspecialty radiologist oversight — not a commercial screening franchise. Our program follows evidence-informed protocols and responsible clinical stewardship.",
  },
  {
    q: "Why should I consider Whole-Body MRI?",
    a: "Many patients choose it to stay informed about their health — often before symptoms develop. It offers a broad, radiation-free view of the body in one visit. A consultation helps determine whether it aligns with your goals and health history.",
  },
  {
    q: "Why choose Weill Cornell Medicine over direct-to-consumer options?",
    a: "Our program is delivered within a leading academic health system with subspecialty radiologist interpretation, patient-friendly reporting, and coordinated specialist follow-up within Weill Cornell Medicine and NewYork-Presbyterian — not a standalone screening center.",
  },
  {
    q: "What does it detect?",
    a: "Whole-Body MRI may identify certain tumors, vascular abnormalities, inflammatory conditions, and musculoskeletal findings across multiple body regions. It cannot detect every disease — some conditions are too small, too early, or not visible on MRI. Your consultation will cover what is and is not appropriate for your situation.",
  },
  {
    q: "What if something is found?",
    a: "All studies are reviewed by board-certified subspecialty radiologists. If a finding needs attention, our care navigators coordinate specialist follow-up within Weill Cornell Medicine. We prioritize clear communication and avoid unnecessary alarm.",
  },
  {
    q: "Is it worth the cost?",
    a: "Whole-Body MRI is currently offered as a self-pay service. Pricing and payment options are discussed transparently during your consultation — there are no hidden fees. Many patients value the peace of mind and integrated academic care pathway.",
  },
  {
    q: "Does it replace cancer screenings?",
    a: "No. Whole-Body MRI is complementary, not a substitute. Continue all guideline-recommended screenings — including mammography, colonoscopy, cervical screening, and others — with your primary care physician.",
  },
  {
    q: "Will this create anxiety or unnecessary testing?",
    a: "Our team emphasizes responsible clinical positioning. Findings are explained in plain language with context. Not every finding requires action — your care team helps distinguish what needs follow-up from what is common and benign, avoiding unnecessary testing when possible.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { ySlow, yReverse } = useSectionParallax(ref);

  return (
    <section id="faq" ref={ref} className="relative py-24 overflow-hidden" style={{ background: "#ffffff" }}>
      <ParallaxOrbs sectionRef={ref} variant="cool" />

      <div className="relative max-w-2xl mx-auto px-6">
        <ParallaxFloat y={yReverse}>
          <SectionIntro eyebrow="Learn more" title="Frequently asked questions" inView={inView}>
            Common questions from patients exploring Whole-Body MRI. If you do not see your question here, our team is happy to discuss it during a consultation.
          </SectionIntro>
        </ParallaxFloat>

        <ParallaxFloat y={ySlow}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
            <Accordion type="single" collapsible className="rounded-2xl px-5" style={{ background: "var(--wcm-bg-light)", border: "1px solid var(--wcm-border)" }}>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger style={{ fontSize: "14px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{faq.q}</AccordionTrigger>
                  <AccordionContent style={{ fontSize: "14px", lineHeight: 1.65, color: "var(--wcm-text-secondary)" }}>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </ParallaxFloat>
      </div>
    </section>
  );
}
