import type { ReactNode } from "react";
import { motion } from "motion/react";

type SectionIntroProps = {
  title: string;
  children: ReactNode;
  align?: "center" | "left";
  inView?: boolean;
  eyebrow?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionIntro({
  title,
  children,
  align = "center",
  inView = true,
  eyebrow,
  className = "",
  titleClassName = "",
}: SectionIntroProps) {
  const alignClass =
    align === "center" ? `text-center mb-10 max-w-2xl mx-auto ${className}` : `mb-10 max-w-3xl ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={alignClass}
    >
      {eyebrow && (
        <p className="wcm-eyebrow mb-3" style={{ color: "var(--wcm-text-secondary)" }}>
          {eyebrow}
        </p>
      )}
      <h2 className={`wcm-section-title ${titleClassName}`.trim()}>
        {title}
      </h2>
      <p className="wcm-lead mt-4" style={{ color: "var(--wcm-text-muted)" }}>
        {children}
      </p>
    </motion.div>
  );
}
