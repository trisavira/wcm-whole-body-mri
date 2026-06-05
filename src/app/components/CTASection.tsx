import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, CheckCircle, Phone, MapPin, Clock, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { trackCTA } from "../../lib/analytics";
import { images } from "../../lib/images";

const benefits = [
  { icon: Clock, text: "Response within 1 business day" },
  { icon: Shield, text: "No obligation — just a conversation" },
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  return (
    <section id="contact" ref={ref} className="relative py-20 overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-[4/5]" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}>
              <ImageWithFallback src={images.consultation} alt="Consultation with care team" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-3 left-6 flex gap-4 rounded-xl px-5 py-3" style={{ background: "#fff", border: "1px solid var(--wcm-border)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: "#cf4520" }} />
                <span style={{ fontSize: "13px", color: "var(--wcm-text-muted)" }}>(646) 962-9553</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: "#b31b1b" }} />
                <span style={{ fontSize: "13px", color: "var(--wcm-text-muted)" }}>1300 York Ave</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
            <h2 className="mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}>
              Request a consultation
            </h2>
            <p className="mb-6" style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>
              Speak with our team to learn whether Whole-Body MRI aligns with your health goals. We will review your history, answer questions, and outline next steps — with no pressure to proceed.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.text} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: "#cf4520" }} />
                    <span style={{ fontSize: "13px", color: "var(--wcm-text-secondary)" }}>{b.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl p-7" style={{ background: "var(--wcm-bg-light)", border: "1px solid var(--wcm-border)" }}>
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#e7751d" }} />
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--wcm-crimson)" }}>Thank you — we&apos;ll be in touch within 1 business day.</p>
                  <p className="mt-2" style={{ fontSize: "13px", color: "var(--wcm-text-secondary)" }}>A member of our care team will reach out to schedule your consultation.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); trackCTA("form_submission", "contact"); setSubmitted(true); }} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="First name" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="border-[var(--wcm-border)]" />
                    <Input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="border-[var(--wcm-border)]" />
                  </div>
                  <Input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border-[var(--wcm-border)]" />
                  <Input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border-[var(--wcm-border)]" />
                  <Button type="submit" className="w-full border-0 text-white group" size="lg" style={{ background: "#cf4520" }}>
                    Submit
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
