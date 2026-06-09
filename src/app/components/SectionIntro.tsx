import type { ReactNode } from "react";
import { motion } from "motion/react";

type SectionIntroProps = {
  title: string;
  children: ReactNode;
  align?: "center" | "left";
  inView?: boolean;
  eyebrow?: string;
};

export function SectionIntro({ title, children, align = "center", inView = true, eyebrow }: SectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center mb-10 max-w-2xl mx-auto" : "mb-10 max-w-3xl"}
    >
      {eyebrow && (
        <p
          className="mb-3 uppercase tracking-[0.14em]"
          style={{ fontSize: "11px", fontWeight: 600, color: "var(--wcm-text-secondary)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "var(--wcm-crimson)", lineHeight: 1.15 }}>
        {title}
      </h2>
      <p className="mt-4" style={{ fontSize: "16px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>
        {children}
      </p>
    </motion.div>
  );
}
