import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  clearHunterRadarStorage,
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings
} from "../storage/settingsStorage";
import {
  DEFAULT_STATUS,
  loadUserStatus,
  saveUserStatus
} from "../storage/statusStorage";
import type { AppSettings, HunterStatus } from "../types";

type HunterRadarContextValue = {
  isHydrated: boolean;
  userStatus: HunterStatus;
  settings: AppSettings;
  setUserStatus: (status: HunterStatus) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  clearLocalData: () => Promise<void>;
};

const HunterRadarContext = createContext<HunterRadarContextValue | undefined>(
  undefined
);

export function HunterRadarProvider({ children }: PropsWithChildren) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [userStatus, setUserStatusState] =
    useState<HunterStatus>(DEFAULT_STATUS);
  const [settings, setSettingsState] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      const [storedStatus, storedSettings] = await Promise.all([
        loadUserStatus(),
        loadSettings()
      ]);

      if (isMounted) {
        setUserStatusState(storedStatus);
        setSettingsState(storedSettings);
        setIsHydrated(true);
      }
    }

    void hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  const setUserStatus = useCallback(async (status: HunterStatus) => {
    setUserStatusState(status);
    await saveUserStatus(status);
  }, []);

  const updateSettings = useCallback(
    async (partialSettings: Partial<AppSettings>) => {
      const nextSettings = {
        ...settings,
        ...partialSettings
      };

      setSettingsState(nextSettings);
      await saveSettings(nextSettings);
    },
    [settings]
  );

  const clearLocalData = useCallback(async () => {
    await clearHunterRadarStorage();
    setUserStatusState(DEFAULT_STATUS);
    setSettingsState(DEFAULT_SETTINGS);
  }, []);

  const value = useMemo(
    () => ({
      isHydrated,
      userStatus,
      settings,
      setUserStatus,
      updateSettings,
      clearLocalData
    }),
    [
      clearLocalData,
      isHydrated,
      setUserStatus,
      settings,
      updateSettings,
      userStatus
    ]
  );

  return (
    <HunterRadarContext.Provider value={value}>
      {children}
    </HunterRadarContext.Provider>
  );
}

export function useHunterRadar() {
  const context = useContext(HunterRadarContext);

  if (!context) {
    throw new Error("useHunterRadar must be used inside HunterRadarProvider");
  }

  return context;
}
