import { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { trackCTA } from "../../lib/analytics";

/** Nav order follows BRD §8.1 information architecture */
const navLinks = [
  { label: "What is WB-MRI", href: "#what-is-wb-mri" },
  { label: "Why Consider", href: "#why-consider" },
  { label: "Why WCM", href: "#why-choose-us" },
  { label: "What We Evaluate", href: "#body-explorer" },
  { label: "What to Expect", href: "#what-to-expect" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 60));
  }, [scrollY]);

  const onHero = !scrolled;
  const linkColor = onHero ? "rgba(255,255,255,0.9)" : "var(--wcm-text-muted)";
  const brandColor = onHero ? "#ffffff" : "#b31b1b";
  const subColor = onHero ? "#FFC72C" : "#cf4520";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--wcm-border)" : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {scrolled && <div className="h-0.5 w-full" style={{ background: "#b31b1b" }} />}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex flex-col leading-none group">
          <span style={{ fontSize: "15px", fontWeight: 700, color: brandColor }}>Weill Cornell Medicine</span>
          <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: subColor }}>WHOLE BODY MRI</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 rounded-md transition-colors"
              style={{ fontSize: "13px", color: linkColor, textDecoration: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = onHero ? "#fff" : "#cf4520";
                (e.currentTarget as HTMLElement).style.background = onHero ? "rgba(255,255,255,0.1)" : "rgba(207,69,32,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = linkColor;
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            className="border-0 text-white rounded-full"
            size="sm"
            style={{ background: "#cf4520" }}
            onClick={() => trackCTA("request_consultation", "navbar")}
            asChild
          >
            <a href="#contact">Request Consultation</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-md"
          style={{ background: "none", border: "none", cursor: "pointer", color: onHero ? "#fff" : "var(--wcm-text-muted)" }}
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
          style={{ background: "#fff", borderTop: "1px solid var(--wcm-border)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2"
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
