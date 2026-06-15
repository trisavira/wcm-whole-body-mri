type BrandLogoProps = {
  className?: string;
  height?: number;
  /** light = mark on dark backgrounds; dark = mark on light backgrounds */
  tone?: "light" | "dark";
};

const TONE_FILL = {
  light: "#ffffff",
  dark: "#1a1a1a",
} as const;

/**
 * Weill Cornell Imaging lockup — vector match to official 248×40 SVG (no raster stroke artifacts).
 */
export function BrandLogo({ className = "", height = 40, tone = "dark" }: BrandLogoProps) {
  const fill = TONE_FILL[tone];
  const width = (248 / 40) * height;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 248 40"
      xmlns="http://www.w3.org/2000/svg"
      className={`block shrink-0 object-left ${className}`}
      role="img"
      aria-label="Weill Cornell Imaging — New York-Presbyterian and Weill Cornell Medicine"
    >
      <text
        x="0"
        y="15"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="-0.2"
        fill={fill}
      >
        Weill Cornell Imaging
      </text>

      <rect x="0" y="23" width="2" height="12" fill={fill} />
      <rect x="0" y="23" width="9" height="2.2" fill={fill} />
      <rect x="0" y="32.8" width="9" height="2.2" fill={fill} />

      <text
        x="13"
        y="33"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="8.5"
        fontWeight="700"
        fill={fill}
      >
        New York-Presbyterian
      </text>

      <circle cx="123.5" cy="30.5" r="5" fill="none" stroke={fill} strokeWidth="1.1" />
      <text
        x="119.2"
        y="32.5"
        fontFamily="Georgia, serif"
        fontSize="3.6"
        fontWeight="700"
        fill={fill}
      >
        wcm
      </text>

      <text
        x="131"
        y="33"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="8.5"
        fontWeight="700"
        fill={fill}
      >
        Weill Cornell{" "}
      </text>
      <text
        x="185"
        y="33"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="8.5"
        fontWeight="700"
        fill={fill}
      >
        Medicine
      </text>
    </svg>
  );
}
