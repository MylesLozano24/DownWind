import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import type { HunterStatus } from "../types";

const statusStyles: Record<
  HunterStatus,
  { backgroundColor: string; color: string }
> = {
  Sitting: { backgroundColor: colors.forestLight, color: colors.forest },
  Walking: { backgroundColor: colors.blueLight, color: colors.blue },
  Tracking: { backgroundColor: colors.amberLight, color: colors.amber },
  Leaving: { backgroundColor: colors.panelAlt, color: colors.graphite },
  "Need Help": { backgroundColor: colors.dangerLight, color: colors.danger },
  SOS: { backgroundColor: colors.danger, color: colors.white }
};

type StatusPillProps = {
  status: HunterStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  const tone = statusStyles[status];

  return (
    <View style={[styles.pill, { backgroundColor: tone.backgroundColor }]}>
      <Text style={[styles.text, { color: tone.color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  text: {
    fontSize: 12,
    fontWeight: "800"
  }
});
