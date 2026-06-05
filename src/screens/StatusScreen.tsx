import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { SosConfirmationModal } from "../components/SosConfirmationModal";
import { StatusActionButton } from "../components/StatusActionButton";
import { StatusPill } from "../components/StatusPill";
import { useHunterRadar } from "../context/HunterRadarContext";
import { colors } from "../theme/colors";
import type { HunterStatus } from "../types";

type IconName = ComponentProps<typeof Ionicons>["name"];

const statusOptions: { status: HunterStatus; iconName: IconName }[] = [
  { status: "Sitting", iconName: "accessibility-outline" },
  { status: "Walking", iconName: "walk-outline" },
  { status: "Tracking", iconName: "navigate-outline" },
  { status: "Leaving", iconName: "exit-outline" },
  { status: "Need Help", iconName: "medkit-outline" },
  { status: "SOS", iconName: "alert-circle-outline" }
];

export function StatusScreen() {
  const { isHydrated, setUserStatus, userStatus } = useHunterRadar();
  const [isSosVisible, setIsSosVisible] = useState(false);

  async function handleStatusPress(status: HunterStatus) {
    if (status === "SOS") {
      setIsSosVisible(true);
      return;
    }

    await setUserStatus(status);
  }

  async function confirmSos() {
    setIsSosVisible(false);
    await setUserStatus("SOS");
  }

  return (
    <Screen
      subtitle="Persist your current simulated field status locally on this device."
      title="Status"
    >
      <Section
        title="Current status"
        subtitle={isHydrated ? "Saved locally" : "Loading local state"}
        action={<StatusPill status={userStatus} />}
      >
        <View style={styles.currentCard}>
          <Ionicons
            color={userStatus === "SOS" ? colors.danger : colors.forest}
            name={userStatus === "SOS" ? "alert-circle" : "pulse"}
            size={30}
          />
          <View style={styles.currentText}>
            <Text style={styles.currentLabel}>You are marked</Text>
            <Text
              style={[
                styles.currentValue,
                { color: userStatus === "SOS" ? colors.danger : colors.text }
              ]}
            >
              {userStatus}
            </Text>
          </View>
        </View>
      </Section>

      <Section title="Set status" subtitle="Local prototype status controls">
        <View style={styles.statusGrid}>
          {statusOptions.map((option) => (
            <StatusActionButton
              iconName={option.iconName}
              isSelected={userStatus === option.status}
              key={option.status}
              onPress={() => {
                void handleStatusPress(option.status);
              }}
              status={option.status}
            />
          ))}
        </View>
      </Section>

      <SosConfirmationModal
        isVisible={isSosVisible}
        onCancel={() => {
          setIsSosVisible(false);
        }}
        onConfirm={() => {
          void confirmSos();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  currentCard: {
    alignItems: "center",
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    minHeight: 88,
    padding: 16
  },
  currentLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  currentText: {
    flex: 1
  },
  currentValue: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 3
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  }
});
