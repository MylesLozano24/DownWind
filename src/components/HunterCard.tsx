import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import type { HunterLocation, UnitSystem } from "../types";
import { StatusPill } from "./StatusPill";

type HunterCardProps = {
  hunter: HunterLocation;
  units: UnitSystem;
};

function formatDistance(distanceMiles: number, units: UnitSystem) {
  if (distanceMiles === 0) {
    return "Here";
  }

  if (units === "Metric") {
    return `${(distanceMiles * 1.60934).toFixed(1)} km`;
  }

  return `${distanceMiles.toFixed(1)} mi`;
}

export function HunterCard({ hunter, units }: HunterCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Ionicons
          color={hunter.isCurrentUser ? colors.amber : colors.forest}
          name={hunter.isCurrentUser ? "person-circle" : "radio"}
          size={22}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={styles.identity}>
            <Text style={styles.name}>{hunter.name}</Text>
            <Text style={styles.role}>{hunter.role}</Text>
          </View>
          <StatusPill status={hunter.status} />
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            {formatDistance(hunter.distanceMiles, units)} - {hunter.bearing}
          </Text>
          <Text style={styles.metaText}>{hunter.lastSeenMinutes}m ago</Text>
        </View>
        <View style={styles.signalRow}>
          <Text style={styles.signalText}>Signal {hunter.signal}</Text>
          <Text style={styles.signalText}>Battery {hunter.batteryPercent}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: colors.panelAlt,
    borderRadius: 8,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  body: {
    flex: 1,
    gap: 8
  },
  card: {
    alignItems: "flex-start",
    backgroundColor: colors.panelAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderTopColor: colors.amber,
    borderTopWidth: 3,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginBottom: 10,
    padding: 12
  },
  identity: {
    flex: 1,
    paddingRight: 8
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  metaText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700"
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  role: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2
  },
  signalRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  signalText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600"
  },
  topRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between"
  }
});
