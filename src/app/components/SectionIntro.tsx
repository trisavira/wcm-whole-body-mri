import type { ReactNode } from "react";
import { motion } from "motion/react";

type SectionIntroProps = {
  title: string;
  children: ReactNode;
  align?: "center" | "left";
  inView?: boolean;
};

export function SectionIntro({ title, children, align = "center", inView = true }: SectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center mb-10 max-w-2xl mx-auto" : "mb-10 max-w-3xl"}
    >
      <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--wcm-crimson)" }}>
        {title}
      </h2>
      <p className="mt-3" style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--wcm-text-muted)" }}>
        {children}
      </p>
    </motion.div>
  );
}
