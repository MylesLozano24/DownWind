import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { HunterCard } from "../components/HunterCard";
import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { simulatedHunters } from "../data/simulatedHunters";
import { useDownwind } from "../context/DownwindContext";
import { colors } from "../theme/colors";

const mapLines = [20, 40, 60, 80];

export function MapScreen() {
  const { settings, userStatus } = useDownwind();

  const hunters = simulatedHunters.map((hunter) =>
    hunter.isCurrentUser ? { ...hunter, status: userStatus } : hunter
  );

  return (
    <Screen
      subtitle="Simulated group positions, last-known bearings, and field readiness."
      title="Map"
    >
      <Section
        subtitle="Prototype field view"
        title="North ridge area"
        action={
          <View style={styles.offlineBadge}>
            <Ionicons color={colors.forest} name="cloud-offline" size={16} />
            <Text style={styles.offlineBadgeText}>
              {settings.offlineMode ? "Offline" : "Online"}
            </Text>
          </View>
        }
      >
        <View style={styles.mapCanvas}>
          {mapLines.map((line) => (
            <View
              key={`vertical-${line}`}
              style={[styles.verticalLine, { left: `${line}%` }]}
            />
          ))}
          {mapLines.map((line) => (
            <View
              key={`horizontal-${line}`}
              style={[styles.horizontalLine, { top: `${line}%` }]}
            />
          ))}
          <View style={styles.creek} />
          <View style={styles.ridge} />
          {hunters.map((hunter) => (
            <View
              key={hunter.id}
              style={[
                styles.marker,
                {
                  backgroundColor: hunter.isCurrentUser
                    ? colors.amber
                    : colors.forest,
                  left: `${hunter.mapPosition.x}%`,
                  top: `${hunter.mapPosition.y}%`
                }
              ]}
            >
              <Text style={styles.markerText}>{hunter.name.slice(0, 1)}</Text>
            </View>
          ))}
          <Text style={styles.mapLabel}>Ridge</Text>
          <Text style={styles.creekLabel}>Creek</Text>
        </View>
      </Section>

      <Section title="Group locations" subtitle="Simulated location cards">
        {hunters.map((hunter) => (
          <HunterCard hunter={hunter} key={hunter.id} units={settings.units} />
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  creek: {
    backgroundColor: colors.blueLight,
    borderRadius: 999,
    height: 16,
    left: "12%",
    position: "absolute",
    top: "67%",
    transform: [{ rotate: "-14deg" }],
    width: "78%"
  },
  creekLabel: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: "900",
    left: "70%",
    position: "absolute",
    top: "62%"
  },
  horizontalLine: {
    backgroundColor: "rgba(245, 246, 239, 0.08)",
    height: 1,
    left: 0,
    position: "absolute",
    right: 0
  },
  mapCanvas: {
    aspectRatio: 1.08,
    backgroundColor: colors.forestLight,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    position: "relative"
  },
  mapLabel: {
    color: colors.forest,
    fontSize: 12,
    fontWeight: "900",
    left: "14%",
    position: "absolute",
    top: "22%"
  },
  marker: {
    alignItems: "center",
    borderColor: colors.white,
    borderRadius: 999,
    borderWidth: 3,
    height: 34,
    justifyContent: "center",
    marginLeft: -17,
    marginTop: -17,
    position: "absolute",
    width: 34
  },
  markerText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  offlineBadge: {
    alignItems: "center",
    backgroundColor: colors.forestLight,
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  offlineBadgeText: {
    color: colors.forest,
    fontSize: 12,
    fontWeight: "900"
  },
  ridge: {
    backgroundColor: colors.amberLight,
    borderRadius: 999,
    height: 22,
    left: "8%",
    position: "absolute",
    top: "30%",
    transform: [{ rotate: "22deg" }],
    width: "72%"
  },
  verticalLine: {
    backgroundColor: "rgba(245, 246, 239, 0.08)",
    bottom: 0,
    position: "absolute",
    top: 0,
    width: 1
  }
});
