import type { GroupCheckIn, HunterLocation } from "../types";

export const simulatedHunters: HunterLocation[] = [
  {
    id: "hunter-you",
    name: "You",
    role: "North ridge stand",
    status: "Sitting",
    distanceMiles: 0,
    bearing: "Current position",
    lastSeenMinutes: 1,
    batteryPercent: 91,
    signal: "Strong",
    mapPosition: { x: 48, y: 57 },
    isCurrentUser: true
  },
  {
    id: "hunter-mason",
    name: "Mason",
    role: "West timber line",
    status: "Tracking",
    distanceMiles: 0.7,
    bearing: "NW",
    lastSeenMinutes: 3,
    batteryPercent: 76,
    signal: "Good",
    mapPosition: { x: 26, y: 38 }
  },
  {
    id: "hunter-avery",
    name: "Avery",
    role: "Creek crossing",
    status: "Walking",
    distanceMiles: 1.1,
    bearing: "SE",
    lastSeenMinutes: 6,
    batteryPercent: 64,
    signal: "Good",
    mapPosition: { x: 68, y: 71 }
  },
  {
    id: "hunter-cole",
    name: "Cole",
    role: "South gate",
    status: "Sitting",
    distanceMiles: 1.8,
    bearing: "S",
    lastSeenMinutes: 11,
    batteryPercent: 52,
    signal: "Weak",
    mapPosition: { x: 54, y: 85 }
  }
];

export const groupCheckIns: GroupCheckIn[] = [
  {
    id: "checkin-1",
    name: "Mason",
    status: "Tracking",
    message: "Fresh sign near west timber.",
    time: "7:42 AM"
  },
  {
    id: "checkin-2",
    name: "Avery",
    status: "Walking",
    message: "Moving toward creek crossing.",
    time: "7:36 AM"
  },
  {
    id: "checkin-3",
    name: "Cole",
    status: "Sitting",
    message: "Holding south gate.",
    time: "7:18 AM"
  }
];
