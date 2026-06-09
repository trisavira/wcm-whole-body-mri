import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, CheckCircle, Phone, MapPin, Clock, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ParallaxFloat, ParallaxImage, useSectionParallax } from "./ParallaxImage";
import { trackCTA } from "../../lib/analytics";
import { images, imageCrop } from "../../lib/images";

const benefits = [
  { icon: Clock, text: "Response within 1 business day" },
  { icon: Shield, text: "No obligation — just a conversation" },
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const { yFast, yReverse } = useSectionParallax(ref);

  return (
    <section id="contact" ref={ref} className="relative py-24 overflow-hidden">
      <ParallaxImage
        src={images.consultation}
        alt="Clinician speaking with a patient about Whole-Body MRI"
        speed={0.16}
        sectionRef={ref}
        objectPosition={imageCrop.consultation}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(12,12,14,0.82), rgba(18,18,22,0.9))" }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ParallaxFloat y={yReverse}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
              <p className="mb-3 uppercase tracking-[0.14em]" style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>
                Next step
              </p>
              <h2 className="mb-4 leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#ffffff" }}>
                Take a proactive approach to your health
              </h2>
              <p className="mb-6" style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.88)" }}>
                A consultation designed around you — no pressure, no obligation. We&apos;ll help you understand whether Whole-Body MRI fits your goals.
              </p>
              <div className="flex flex-wrap gap-5 mb-6">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.text} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: "#FFC72C" }} />
                      <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>{b.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: "#FFC72C" }} />
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>(646) 962-9553</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: "#FFC72C" }} />
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.9)" }}>1300 York Ave, New York</span>
                </div>
              </div>
            </motion.div>
          </ParallaxFloat>

          <ParallaxFloat y={yFast}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="rounded-2xl p-7 lg:p-8" style={{ background: "#ffffff", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#e7751d" }} />
                    <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--wcm-crimson)" }}>Thank you — we&apos;ll be in touch within 1 business day.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); trackCTA("form_submission", "contact"); setSubmitted(true); }} className="space-y-3">
                    <p className="mb-4" style={{ fontSize: "15px", fontWeight: 600, color: "var(--wcm-crimson)" }}>Request a consultation</p>
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
          </ParallaxFloat>
        </div>
      </div>
    </section>
  );
}
