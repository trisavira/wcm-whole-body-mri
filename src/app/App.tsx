import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhatIsWBMRI } from "./components/WhatIsWBMRI";
import { WhyConsider } from "./components/WhyConsider";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { BodyExplorer } from "./components/BodyExplorer";
import { Limitations } from "./components/Limitations";
import { WhatToExpect } from "./components/WhatToExpect";
import { CTALite } from "./components/CTALite";
import { ReportPreview } from "./components/ReportPreview";
import { Testimonials } from "./components/Testimonials";
import { VideoSection } from "./components/VideoSection";
import { FAQ } from "./components/FAQ";
import { FutureProgram } from "./components/FutureProgram";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { useSectionTracking } from "./hooks/useSectionTracking";

export default function App() {
  useSectionTracking();

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
      {/* BRD §8.1 + §7 user journey order */}
      <Hero />
      <WhatIsWBMRI />
      <WhyConsider />
      <WhyChooseUs />
      <BodyExplorer />
      <Limitations />
      <WhatToExpect />
      <CTALite />
      <ReportPreview />
      <Testimonials />
      <VideoSection />
      <FAQ />
      <FutureProgram />
      <CTASection />
      <Footer />
    </div>
  );
}
