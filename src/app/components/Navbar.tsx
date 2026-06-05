import { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import { Activity, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { trackCTA } from "../../lib/analytics";

const navLinks = [
  { label: "What is WB-MRI", href: "#what-is-wb-mri" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "What It Detects", href: "#body-explorer" },
  { label: "What to Expect", href: "#what-to-expect" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 40));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(179,27,27,0.2)" : "1px solid var(--wcm-border)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #b31b1b, #cf4520, #e7751d)" }} />
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg transition-colors" style={{ background: "rgba(207,69,32,0.12)" }} />
            <div className="absolute inset-0 rounded-lg transition-colors" style={{ border: "1px solid rgba(207,69,32,0.35)" }} />
            <Activity className="absolute inset-0 m-auto w-4 h-4" style={{ color: "#cf4520" }} />
          </div>
          <div className="flex flex-col leading-none">
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#b31b1b" }}>Weill Cornell Medicine</span>
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#cf4520" }}>WHOLE BODY MRI</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 rounded-md transition-colors"
              style={{ fontSize: "13px", color: "var(--wcm-text-muted)", textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#cf4520"; (e.currentTarget as HTMLElement).style.background = "rgba(207,69,32,0.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--wcm-text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#videos"
            style={{ fontSize: "14px", color: "var(--wcm-text-secondary)", textDecoration: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#cf4520"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--wcm-text-secondary)"; }}
          >
            Watch Videos
          </a>
          <Button
            className="border-0 text-white"
            size="sm"
            style={{ background: "#cf4520" }}
            onClick={() => trackCTA("request_consultation", "navbar")}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#b31b1b"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#cf4520"; }}
            asChild
          >
            <a href="#contact">Request Consultation</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-md transition-colors"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--wcm-text-muted)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden px-6 py-4 flex flex-col gap-2"
          style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.08)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 transition-colors"
              style={{ fontSize: "15px", color: "var(--wcm-text-muted)", borderBottom: "1px solid rgba(0,0,0,0.05)", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
          <Button className="mt-3 border-0 text-white w-full" style={{ background: "#cf4520" }} asChild>
            <a href="#contact" onClick={() => setMobileOpen(false)}>Request Consultation</a>
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}
