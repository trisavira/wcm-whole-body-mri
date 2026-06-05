import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { WhatIsWBMRI } from "./components/WhatIsWBMRI";
import { WhyConsider } from "./components/WhyConsider";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { BodyExplorer } from "./components/BodyExplorer";
import { Limitations } from "./components/Limitations";
import { WhatToExpect } from "./components/WhatToExpect";
import { ReportPreview } from "./components/ReportPreview";
import { VideoSection } from "./components/VideoSection";
import { Testimonials } from "./components/Testimonials";
import { FutureProgram } from "./components/FutureProgram";
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
      {/* Stage 1: Awareness */}
      <Hero />
      <TrustBar />
      <WhatIsWBMRI />
      {/* Stage 2–3: Relevance & Trust */}
      <WhyConsider />
      <WhyChooseUs />
      {/* Stage 4: Scope */}
      <BodyExplorer />
      <Limitations />
      {/* Stage 5: Experience */}
      <WhatToExpect />
      <ReportPreview />
      <VideoSection />
      <Testimonials />
      <FutureProgram />
      <FAQ />
      {/* Stage 6: Conversion */}
      <CTASection />
      <Footer />
    </div>
  );
}
