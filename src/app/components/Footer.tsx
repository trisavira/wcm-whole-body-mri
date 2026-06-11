import { Activity } from "lucide-react";

const links = {
  Program: [
    { label: "What is WB-MRI", href: "#what-is-wb-mri" },
    { label: "Why Consider", href: "#why-consider" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "What We Evaluate", href: "#body-explorer" },
    { label: "What It Does Not Replace", href: "#limitations" },
    { label: "What to Expect", href: "#what-to-expect" },
  ],
  Resources: [
    { label: "Report Preview", href: "#report-preview" },
    { label: "Videos", href: "#videos" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ],
  "Get Started": [
    { label: "Request Consultation", href: "#contact" },
    { label: "Request Appointment", href: "#contact" },
    { label: "Contact Team", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "HIPAA Notice", href: "#" },
    { label: "Disclaimer", href: "#limitations" },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: "var(--wcm-bg-light)", borderTop: "1px solid rgba(0,0,0,0.08)" }} className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg" style={{ background: "rgba(207,69,32,0.1)" }} />
                <div className="absolute inset-0 rounded-lg" style={{ border: "1px solid rgba(207,69,32,0.3)" }} />
                <Activity className="absolute inset-0 m-auto w-4 h-4" style={{ color: "#e7751d" }} />
              </div>
              <div className="flex flex-col leading-none">
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#b31b1b" }}>Weill Cornell Medicine</span>
                <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#cf4520" }}>WHOLE BODY MRI</span>
              </div>
            </div>
            <p className="mb-4" style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--wcm-text-secondary)" }}>
              Care. Discover. Teach. Whole-Body MRI is the first offering in our Early Detection & Prevention program — science-based imaging within a leading academic health system.
            </p>
            <p style={{ fontSize: "12px", lineHeight: 1.6, color: "var(--wcm-text-secondary)" }}>
              1300 York Ave, Box 314 · New York, NY 10065 · (646) 962-9553
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="mb-3" style={{ fontSize: "13px", fontWeight: 600, color: "var(--wcm-crimson)" }}>{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="transition-colors" style={{ fontSize: "13px", color: "var(--wcm-text-secondary)", textDecoration: "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#cf4520"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--wcm-text-secondary)"; }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <p style={{ fontSize: "12px", color: "var(--wcm-text-secondary)" }}>© 2026 Weill Cornell Medicine. All rights reserved.</p>
          <p style={{ fontSize: "12px", color: "var(--wcm-text-secondary)", textAlign: "center" }}>
            Whole-Body MRI does not replace guideline-recommended cancer screenings. Individual results vary.
          </p>
        </div>
      </div>
    </footer>
  );
}
