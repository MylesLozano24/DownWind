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
  clearDownwindStorage,
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

type DownwindContextValue = {
  isHydrated: boolean;
  userStatus: HunterStatus;
  settings: AppSettings;
  setUserStatus: (status: HunterStatus) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  clearLocalData: () => Promise<void>;
};

const DownwindContext = createContext<DownwindContextValue | undefined>(
  undefined
);

export function DownwindProvider({ children }: PropsWithChildren) {
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
    await clearDownwindStorage();
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
    <DownwindContext.Provider value={value}>
      {children}
    </DownwindContext.Provider>
  );
}

export function useDownwind() {
  const context = useContext(DownwindContext);

  if (!context) {
    throw new Error("useDownwind must be used inside DownwindProvider");
  }

  return context;
}
