import { useRef, type RefObject, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/** Parallax motion values tied to a section's scroll progress */
export function useSectionParallax(
  sectionRef: RefObject<HTMLElement | null>,
  offset: ScrollOffset = ["start end", "end start"],
) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset });
  const ySlow = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yFast = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yReverse = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  return { scrollYProgress, ySlow, y, yFast, yReverse, scale, rotate };
}

export function useParallaxY(
  sectionRef: RefObject<HTMLElement | null>,
  range: [string, string] = ["-12%", "12%"],
  offset: ScrollOffset = ["start end", "end start"],
): MotionValue<string> {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset });
  return useTransform(scrollYProgress, [0, 1], range);
}

type ParallaxImageProps = {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  sectionRef?: RefObject<HTMLElement | null>;
  offset?: ScrollOffset;
  objectPosition?: string;
  /** Parallax overscan — lower = sharper (less upscale). Hero: ~1.05 */
  imageScale?: number;
  srcSet?: string;
  sizes?: string;
  priority?: boolean;
};

/** Full-bleed image with parallax — center-cropped to avoid edge artifacts */
export function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = "",
  sectionRef,
  offset,
  objectPosition = "center center",
  imageScale = 1.12,
  srcSet,
  sizes,
  priority = false,
}: ParallaxImageProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const scrollTarget = sectionRef ?? localRef;
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: offset ?? ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={localRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        style={{ y, scale: imageScale, objectPosition }}
        className="w-full h-[115%] object-cover"
        draggable={false}
      />
    </div>
  );
}

type ParallaxFloatProps = {
  children: ReactNode;
  y?: MotionValue<string> | MotionValue<number>;
  className?: string;
};

/** Wrapper that applies vertical parallax from a motion value */
export function ParallaxFloat({ children, y, className = "" }: ParallaxFloatProps) {
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

type ParallaxOrbsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  variant?: "warm" | "cool" | "mixed";
};

/** Soft gradient orbs that drift at different parallax speeds */
export function ParallaxOrbs({ sectionRef, variant = "warm" }: ParallaxOrbsProps) {
  const { ySlow, yFast, yReverse } = useSectionParallax(sectionRef);

  // Neutral depth — avoid red/orange washes across sections
  const orbA =
    variant === "cool"
      ? "rgba(15,23,42,0.04)"
      : variant === "mixed"
        ? "rgba(100,116,139,0.05)"
        : "rgba(148,163,184,0.06)";
  const orbB =
    variant === "cool"
      ? "rgba(71,85,105,0.03)"
      : variant === "mixed"
        ? "rgba(15,23,42,0.03)"
        : "rgba(203,213,225,0.08)";
  const orbC = variant === "mixed" ? "rgba(241,245,249,0.5)" : null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <motion.div
        style={{ y: ySlow, background: orbA }}
        className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: yFast, background: orbB }}
        className="absolute -bottom-[15%] -right-[8%] w-[50%] h-[50%] rounded-full blur-3xl"
      />
      {orbC && (
        <motion.div
          style={{ y: yReverse, background: orbC }}
          className="absolute top-[35%] right-[20%] w-[30%] h-[30%] rounded-full blur-3xl"
        />
      )}
    </div>
  );
}
