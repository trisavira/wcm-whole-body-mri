/** Schematic body map — figure center + label gutters (viewBox 110×139). */

export const BODY_MAP_VIEWBOX = "0 0 110 139";

/** Right-side callouts end here (textAnchor end) — keeps labels inside card */
export const LABEL_RIGHT_X = 106;
/** Left-side callouts start here (textAnchor start) */
export const LABEL_LEFT_X = 6;
/** Leader lines stop before text */
export const LABEL_LEADER_END_RIGHT = 76;
export const LABEL_LEADER_END_LEFT = 24;

/** Light schematic palette — matches WCM page surfaces */
export const schematicTheme = {
  bg: "#ffffff",
  shellFill: "rgba(179, 27, 27, 0.04)",
  shellStroke: "rgba(0, 0, 0, 0.16)",
  dividerStroke: "rgba(0, 0, 0, 0.12)",
  regionFill: "rgba(0, 0, 0, 0.03)",
  regionStroke: "rgba(0, 0, 0, 0.18)",
  jointFill: "rgba(0, 0, 0, 0.04)",
  jointStroke: "rgba(0, 0, 0, 0.2)",
  labelMuted: "rgba(0, 0, 0, 0.55)",
  labelAccent: "#cf4520",
  leaderMuted: "rgba(0, 0, 0, 0.2)",
  spineLine: "#cf4520",
  scanLine: "rgba(231, 117, 29, 0.85)",
};

export type SchematicRegion = {
  id: string;
  d: string;
  labelShort: string;
  leaderStart: { x: number; y: number };
  labelX: number;
  labelY: number;
  labelSide: "left" | "right";
  /** Permanent callout on diagram; false = chips only unless hovered */
  showLabel?: boolean;
  pulseX: number;
  pulseY: number;
};

/** Clean anterior figure — torso centered at x≈55 */
export const schematicRegions: SchematicRegion[] = [
  {
    id: "brain",
    d: "M 55,4 A 7,7 0 1,0 55,18 A 7,7 0 1,0 55,4 Z",
    labelShort: "Brain",
    leaderStart: { x: 48, y: 11 },
    labelX: LABEL_LEFT_X,
    labelY: 11,
    labelSide: "left",
    showLabel: true,
    pulseX: 55,
    pulseY: 11,
  },
  {
    id: "chest",
    d: "M 41,22 L 41,41 L 69,41 L 69,22 L 55,19 Z",
    labelShort: "Chest",
    leaderStart: { x: 69, y: 31 },
    labelX: LABEL_RIGHT_X,
    labelY: 31,
    labelSide: "right",
    showLabel: true,
    pulseX: 55,
    pulseY: 31,
  },
  {
    id: "abdomen",
    d: "M 41,41 L 41,57 L 69,57 L 69,41 Z",
    labelShort: "Abdomen",
    leaderStart: { x: 69, y: 49 },
    labelX: LABEL_RIGHT_X,
    labelY: 49,
    labelSide: "right",
    showLabel: true,
    pulseX: 55,
    pulseY: 49,
  },
  {
    id: "pelvis",
    d: "M 41,57 L 39,73 Q 55,79 71,73 L 69,57 Z",
    labelShort: "Pelvis",
    leaderStart: { x: 69, y: 66 },
    labelX: LABEL_RIGHT_X,
    labelY: 66,
    labelSide: "right",
    showLabel: true,
    pulseX: 55,
    pulseY: 66,
  },
  {
    id: "spine",
    d: "M 53.5,22 L 56.5,22 L 55.5,73 L 52.5,73 Z",
    labelShort: "Spine",
    leaderStart: { x: 56, y: 48 },
    labelX: LABEL_RIGHT_X,
    labelY: 48,
    labelSide: "right",
    showLabel: false,
    pulseX: 55,
    pulseY: 48,
  },
  {
    id: "extremities",
    d: "M 41,26 L 28,29 L 26,55 L 34,55 L 37,30 Z M 69,26 L 82,29 L 84,55 L 76,55 L 73,30 Z M 43,73 L 41,111 L 49,111 L 51,73 Z M 57,73 L 59,111 L 67,111 L 65,73 Z M 41,111 L 39,121 L 49,121 L 49,111 Z M 59,111 L 59,121 L 69,121 L 67,111 Z",
    labelShort: "Limbs",
    leaderStart: { x: 28, y: 90 },
    labelX: LABEL_LEFT_X,
    labelY: 90,
    labelSide: "left",
    showLabel: false,
    pulseX: 45,
    pulseY: 90,
  },
];

/** Limbs only — base layer without duplicating torso outlines */
export const limbsBasePath =
  "M 41,26 L 28,29 L 26,55 L 34,55 L 37,30 Z M 69,26 L 82,29 L 84,55 L 76,55 L 73,30 Z M 43,73 L 41,111 L 49,111 L 51,73 Z M 57,73 L 59,111 L 67,111 L 65,73 Z M 41,111 L 39,121 L 49,121 L 49,111 Z M 59,111 L 59,121 L 69,121 L 67,111 Z";

export const torsoShellPath = "M 39,22 Q 55,17 71,22 L 71,73 Q 55,79 39,73 Z";

export const torsoPaintOrder = ["pelvis", "abdomen", "chest", "brain"] as const;

export const regionZoom: Record<string, { scale: number; originY: string }> = {
  brain: { scale: 2.1, originY: "14%" },
  chest: { scale: 1.9, originY: "32%" },
  abdomen: { scale: 1.9, originY: "50%" },
  spine: { scale: 2.1, originY: "44%" },
  pelvis: { scale: 1.9, originY: "64%" },
  extremities: { scale: 1.55, originY: "56%" },
};
