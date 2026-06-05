import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "./keys";
import type { HunterStatus } from "../types";

export const DEFAULT_STATUS: HunterStatus = "Sitting";

const validStatuses: HunterStatus[] = [
  "Sitting",
  "Walking",
  "Tracking",
  "Leaving",
  "Need Help",
  "SOS"
];

export async function loadUserStatus(): Promise<HunterStatus> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.userStatus);

    if (stored && validStatuses.includes(stored as HunterStatus)) {
      return stored as HunterStatus;
    }
  } catch {
    return DEFAULT_STATUS;
  }

  return DEFAULT_STATUS;
}

export async function saveUserStatus(status: HunterStatus) {
  await AsyncStorage.setItem(STORAGE_KEYS.userStatus, status);
}
