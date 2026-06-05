import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { HelpCircle, Shield, DollarSign, Stethoscope, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { SectionIntro } from "./SectionIntro";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { images } from "../../lib/images";

const topConcerns = [
  { icon: HelpCircle, label: "Is it legitimate?", color: "#b31b1b" },
  { icon: Stethoscope, label: "What does it detect?", color: "#cf4520" },
  { icon: Shield, label: "Standard screenings?", color: "#e7751d" },
  { icon: AlertCircle, label: "Anxiety & follow-up", color: "#cf4520" },
  { icon: DollarSign, label: "Cost", color: "#b31b1b" },
];

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

  return (
    <section id="faq" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "var(--wcm-bg-light)" }}>
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionIntro title="Frequently asked questions" inView={inView}>
          Common questions from patients exploring Whole-Body MRI. If you do not see your question here, our team is happy to discuss it during a consultation.
        </SectionIntro>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 rounded-2xl overflow-hidden hidden lg:block sticky top-24"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
          >
            <ImageWithFallback
              src={images.faqSupport}
              alt="Care team member ready to answer patient questions"
              className="w-full aspect-[3/4] object-cover"
            />
          </motion.div>

          <div className="lg:col-span-8">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              {topConcerns.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full"
                    style={{ background: "#fff", border: `1px solid ${c.color}30` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: c.color }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{c.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <Accordion type="single" collapsible className="rounded-2xl px-5" style={{ background: "#ffffff", border: "1px solid var(--wcm-border)" }}>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger style={{ fontSize: "14px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{faq.q}</AccordionTrigger>
                  <AccordionContent style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--wcm-text-secondary)" }}>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
