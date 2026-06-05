import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { value: 45, suffix: " min", label: "Whole-Body Scan Time", prefix: "<" },
  { value: 98.3, suffix: "%", label: "Detection Sensitivity", prefix: "" },
  { value: 12, suffix: "+", label: "Body Regions Covered", prefix: "" },
  { value: 0, suffix: "", label: "Radiation-Free Imaging", prefix: "Zero" },
];

function CountUp({ to, suffix, prefix, decimals = 0 }: { to: number; suffix: string; prefix: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || prefix === "Zero") return;
    const start = Date.now();
    const duration = 1800;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * to);
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, to, prefix]);

  if (prefix === "Zero") return <span ref={ref}>Zero</span>;
  return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-14" style={{ background: "var(--wcm-bg-light)", borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-8 py-6 group"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
            >
              <div
                className="mb-1.5 text-transparent bg-clip-text"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, backgroundImage: "linear-gradient(135deg, #cf4520, #b31b1b)" }}
              >
                <CountUp to={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
              </div>
              <div style={{ fontSize: "13px", color: "var(--wcm-text-secondary)" }}>{stat.label}</div>
              <motion.div
                className="mt-3 h-0.5 w-0 group-hover:w-10 transition-all duration-500 rounded-full"
                style={{ background: "linear-gradient(to right, #cf4520, #b31b1b)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
