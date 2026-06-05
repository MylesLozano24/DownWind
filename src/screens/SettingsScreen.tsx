import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { SettingRow } from "../components/SettingRow";
import { useDownwind } from "../context/DownwindContext";
import { colors } from "../theme/colors";
import type { UnitSystem } from "../types";

const unitOptions: UnitSystem[] = ["Imperial", "Metric"];

export function SettingsScreen() {
  const { clearLocalData, settings, updateSettings } = useDownwind();

  function handleClearData() {
    Alert.alert(
      "Clear local data",
      "This resets status and settings stored on this device.",
      [
        { style: "cancel", text: "Cancel" },
        {
          onPress: () => {
            void clearLocalData();
          },
          style: "destructive",
          text: "Clear"
        }
      ]
    );
  }

  return (
    <Screen
      subtitle="Local preferences for offline operation, privacy, units, and stored data."
      title="Settings"
    >
      <Section title="Field preferences" subtitle="Saved on this device">
        <View style={styles.settingsCard}>
          <SettingRow
            onValueChange={(offlineMode) => {
              void updateSettings({ offlineMode });
            }}
            subtitle="Prefer cached prototype data"
            title="Offline mode"
            value={settings.offlineMode}
          />
          <SettingRow
            onValueChange={(privacyMode) => {
              void updateSettings({ privacyMode });
            }}
            subtitle="Hide precise position labels"
            title="Privacy mode"
            value={settings.privacyMode}
          />
          <View style={styles.unitsRow}>
            <View style={styles.unitsText}>
              <Text style={styles.unitsTitle}>Units</Text>
              <Text style={styles.unitsSubtitle}>Distance display</Text>
            </View>
            <View style={styles.segmentedControl}>
              {unitOptions.map((unit) => {
                const isActive = settings.units === unit;

                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    key={unit}
                    onPress={() => {
                      void updateSettings({ units: unit });
                    }}
                    style={[
                      styles.segment,
                      {
                        backgroundColor: isActive
                          ? colors.forest
                          : colors.panelAlt
                      }
                    ]}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        { color: isActive ? colors.white : colors.text }
                      ]}
                    >
                      {unit}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Section>

      <Section title="Local data" subtitle="Prototype storage controls">
        <Pressable
          accessibilityRole="button"
          onPress={handleClearData}
          style={({ pressed }) => [
            styles.clearButton,
            { opacity: pressed ? 0.82 : 1 }
          ]}
        >
          <Ionicons color={colors.danger} name="trash-outline" size={22} />
          <View style={styles.clearTextBlock}>
            <Text style={styles.clearTitle}>Clear local data</Text>
            <Text style={styles.clearSubtitle}>Reset status and settings</Text>
          </View>
        </Pressable>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    alignItems: "center",
    backgroundColor: colors.panel,
    borderColor: colors.dangerLight,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 74,
    padding: 16
  },
  clearSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2
  },
  clearTextBlock: {
    flex: 1
  },
  clearTitle: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: "900"
  },
  segmentedControl: {
    backgroundColor: colors.panelAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    padding: 4
  },
  segment: {
    borderRadius: 6,
    minWidth: 78,
    paddingHorizontal: 10,
    paddingVertical: 9
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center"
  },
  settingsCard: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderTopColor: colors.amber,
    borderTopWidth: 3,
    borderWidth: 1,
    paddingHorizontal: 14
  },
  unitsRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between",
    paddingVertical: 14
  },
  unitsSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2
  },
  unitsText: {
    flex: 1
  },
  unitsTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  }
});
