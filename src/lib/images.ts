/** Context-matched placeholders — swap for WCM-approved assets in production */
const unsplash = (id: string, w = 1080, q = 85) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/** Responsive srcset for full-bleed heroes (retina-safe) */
export function unsplashSrcSet(id: string, widths = [1280, 1920, 2560], q = 90) {
  return widths.map((w) => `${unsplash(id, w, q)} ${w}w`).join(", ");
}

const HERO_ID = "photo-1693417920099-d985b3e0fa44";

export const images = {
  /** Hero — high-res MRI suite (2560px) */
  heroBackground: unsplash(HERO_ID, 2560, 92),
  heroBackgroundSrcSet: unsplashSrcSet(HERO_ID),

  mriScanner: unsplash("photo-1666214280352-db292c05fd80", 1920, 88),
  patientInScanner: unsplash("photo-1576671414121-aa0c81c869e1", 1920, 88),
  mriSuite: unsplash("photo-1666214282158-f9a0abed8472", 1920, 88),
  mriScannerAlt: unsplash("photo-1666214282459-c7dff167ecc0", 1920, 88),

  consultation: unsplash("photo-1631563018856-81be9c118283", 1920, 88),
  consultationExam: unsplash("photo-1666214276389-393fb7dbc75c", 1920, 88),
  radiologyReview: unsplash("photo-1666214280577-5f90bc36be92", 1920, 88),
  radiologyTeam: unsplash("photo-1666214280391-8ff5bd3c0bf0", 1920, 88),
  radiologistWorkstation: unsplash("photo-1581595220921-eec2071e5159", 1920, 88),
  radiologyReadingRoom: unsplash("photo-1666214280259-ab57309450b4", 1920, 88),
  hospitalCorridor: unsplash("photo-1516549655169-df83a0774514", 1920, 88),
  scanOnMonitor: unsplash("photo-1530497610245-94d3c16cda28", 1600, 88),

  brainScanArt: unsplash("photo-1616012480717-fd9867059ca0", 800, 85),
  bodyScanArt: unsplash("photo-1616012481039-5de1dcb42934", 800, 85),

  videoWhatIs: unsplash(HERO_ID, 1280, 85),
  videoWhyChoose: unsplash("photo-1666214280577-5f90bc36be92", 1280, 85),
  videoWhatToExpect: unsplash("photo-1631563018856-81be9c118283", 1280, 85),
} as const;

export const imageCrop = {
  hero: "center 45%",
  patientScan: "center 35%",
  consultation: "center 30%",
  radiology: "center 45%",
  suite: "center 50%",
} as const;
