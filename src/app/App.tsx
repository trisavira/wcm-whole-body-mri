import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatIsWBMRI } from "./components/WhatIsWBMRI";
import { BodyExplorer } from "./components/BodyExplorer";
import { WhyConsider } from "./components/WhyConsider";
import { WhatToExpect } from "./components/WhatToExpect";
import { CTALite } from "./components/CTALite";
import { ReportPreview } from "./components/ReportPreview";
import { Limitations } from "./components/Limitations";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.body.style.background = "var(--wcm-bg-light)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden wcm-body" style={{ background: "var(--wcm-bg-light)" }}>
      <Navbar />
      <Hero />
      <WhatIsWBMRI />
      <WhyConsider />
      <BodyExplorer />
      <WhatToExpect />
      <CTALite />
      <ReportPreview />
      <Limitations />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
