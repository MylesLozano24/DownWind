import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "./keys";
import type { AppSettings } from "../types";

export const DEFAULT_SETTINGS: AppSettings = {
  offlineMode: true,
  privacyMode: false,
  units: "Imperial"
};

function isAppSettings(value: unknown): value is AppSettings {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<AppSettings>;

  return (
    typeof candidate.offlineMode === "boolean" &&
    typeof candidate.privacyMode === "boolean" &&
    (candidate.units === "Imperial" || candidate.units === "Metric")
  );
}

export async function loadSettings(): Promise<AppSettings> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.settings);

    if (!stored) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(stored) as unknown;

    if (isAppSettings(parsed)) {
      return parsed;
    }
  } catch {
    return DEFAULT_SETTINGS;
  }

  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: AppSettings) {
  await AsyncStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

export async function clearDownwindStorage() {
  await AsyncStorage.multiRemove([STORAGE_KEYS.userStatus, STORAGE_KEYS.settings]);
}
