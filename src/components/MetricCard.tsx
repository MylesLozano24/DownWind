import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import type { DeviceMetric } from "../types";

type MetricCardProps = {
  metric: DeviceMetric;
};

const toneColors: Record<DeviceMetric["tone"], string> = {
  ok: colors.forest,
  warn: colors.amber,
  danger: colors.danger
};

export function MetricCard({ metric }: MetricCardProps) {
  const toneColor = toneColors[metric.tone];

  return (
    <View style={styles.card}>
      <View style={[styles.dot, { backgroundColor: toneColor }]} />
      <View style={styles.body}>
        <Text style={styles.label}>{metric.label}</Text>
        <Text style={[styles.value, { color: toneColor }]}>{metric.value}</Text>
        <Text style={styles.detail}>{metric.detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  card: {
    alignItems: "flex-start",
    backgroundColor: colors.panelAlt,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 12
  },
  detail: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3
  },
  dot: {
    borderRadius: 999,
    height: 10,
    marginTop: 5,
    width: 10
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  value: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 3
  }
});
