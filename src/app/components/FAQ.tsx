import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { SectionIntro } from "./SectionIntro";
import { ParallaxFloat, ParallaxOrbs, useSectionParallax } from "./ParallaxImage";

const faqs = [
  {
    q: "Is Whole-Body MRI legitimate?",
    a: "Yes. Whole-Body MRI is established medical technology offered within an academic medical center with subspecialty radiologist oversight — not a commercial screening franchise. Our program follows evidence-informed protocols and responsible clinical stewardship.",
  },
  {
    q: "What does it detect?",
    a: "Whole-Body MRI may identify certain tumors, vascular abnormalities, inflammatory conditions, and musculoskeletal findings across multiple body regions. It cannot detect every disease — some conditions are too small, too early, or not visible on MRI. Your consultation will cover what is and is not appropriate for your situation.",
  },
  {
    q: "Does it replace cancer screenings?",
    a: "No. Whole-Body MRI is complementary, not a substitute. Continue all guideline-recommended screenings — including mammography, colonoscopy, cervical screening, and others — with your primary care physician.",
  },
  {
    q: "What if something is found?",
    a: "All studies are reviewed by board-certified subspecialty radiologists. If a finding needs attention, our care navigators coordinate specialist follow-up within Weill Cornell Medicine. We prioritize clear communication and avoid unnecessary alarm.",
  },
  {
    q: "How much does it cost?",
    a: "Whole-Body MRI is currently offered as a self-pay service. Pricing and payment options are discussed transparently during your consultation — there are no hidden fees.",
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
