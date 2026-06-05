export type HunterStatus =
  | "Sitting"
  | "Walking"
  | "Tracking"
  | "Leaving"
  | "Need Help"
  | "SOS";

export type UnitSystem = "Imperial" | "Metric";

export type SignalQuality = "Strong" | "Good" | "Weak";

export type HunterLocation = {
  id: string;
  name: string;
  role: string;
  status: HunterStatus;
  distanceMiles: number;
  bearing: string;
  lastSeenMinutes: number;
  batteryPercent: number;
  signal: SignalQuality;
  mapPosition: {
    x: number;
    y: number;
  };
  isCurrentUser?: boolean;
};

export type GroupCheckIn = {
  id: string;
  name: string;
  status: HunterStatus;
  message: string;
  time: string;
};

export type DeviceMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: "ok" | "warn" | "danger";
};

export type AppSettings = {
  offlineMode: boolean;
  privacyMode: boolean;
  units: UnitSystem;
};
