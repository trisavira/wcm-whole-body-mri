import { useEffect } from "react";
import { trackSectionView } from "../../lib/analytics";

/** Fire section_view once per section when it enters the viewport (BRD §11). */
export function useSectionTracking() {
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          if (!id || seen.has(id)) return;
          seen.add(id);
          trackSectionView(id);
        });
      },
      { threshold: 0.25, rootMargin: "-40px 0px" },
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
