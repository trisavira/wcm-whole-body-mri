/** Verified medical/MRI placeholders — swap for WCM-approved assets in production */
const unsplash = (id: string, w = 1080) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  mriScanner: unsplash("photo-1666214280352-db292c05fd80"),
  patientScan: unsplash("photo-1666214280165-20e3d73d70bf"),
  consultation: unsplash("photo-1576091160550-2173dba999ef"),
  medicalTeam: unsplash("photo-1559839734-2b71ea197ec2"),
  radiologySuite: unsplash("photo-1516549655169-df83a0774514"),
  radiologyReview: unsplash("photo-1530497610245-94d3c16cda28"),

  // Reuse verified clinical imagery only — avoids irrelevant stock photos
  hospital: unsplash("photo-1516549655169-df83a0774514"),
  report: unsplash("photo-1530497610245-94d3c16cda28"),

  videoWhatIs: unsplash("photo-1666214280352-db292c05fd80"),
  videoWhyChoose: unsplash("photo-1559839734-2b71ea197ec2"),
  videoWhatToExpect: unsplash("photo-1576091160550-2173dba999ef"),

  proactiveHealth: unsplash("photo-1576091160550-2173dba999ef", 800),
  wholeBodyView: unsplash("photo-1666214280352-db292c05fd80", 800),
  peaceOfMind: unsplash("photo-1559839734-2b71ea197ec2", 800),
  whoFor: unsplash("photo-1666214280165-20e3d73d70bf", 800),

  patientPortrait1: unsplash("photo-1580489944761-15a19d654956", 400),
  patientPortrait2: unsplash("photo-1506794778202-cad84cf45f1d", 400),
  patientPortrait3: unsplash("photo-1560250097-0b93528c311a", 400),

  preventiveScreening: unsplash("photo-1576091160550-2173dba999ef"),
  faqSupport: unsplash("photo-1559839734-2b71ea197ec2"),

  regionBrain: unsplash("photo-1530497610245-94d3c16cda28", 600),
  regionChest: unsplash("photo-1666214280165-20e3d73d70bf", 600),
  regionAbdomen: unsplash("photo-1666214280352-db292c05fd80", 600),
  regionSpine: unsplash("photo-1559839734-2b71ea197ec2", 600),
  regionPelvis: unsplash("photo-1576091160550-2173dba999ef", 600),
  regionExtremities: unsplash("photo-1666214280165-20e3d73d70bf", 600),
};
