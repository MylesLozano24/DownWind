import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { MetricCard } from "../components/MetricCard";
import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import {
  connectedDeviceName,
  simulatedDeviceMetrics
} from "../data/simulatedDevice";
import { colors } from "../theme/colors";

export function DeviceScreen() {
  const [isConnected, setIsConnected] = useState(true);

  return (
    <Screen
      subtitle="Simulated ESP32, LoRa, GPS, Bluetooth, and battery telemetry."
      title="Device"
    >
      <Section
        title="Connection"
        subtitle={connectedDeviceName}
        action={
          <View
            style={[
              styles.connectionBadge,
              {
                backgroundColor: isConnected
                  ? colors.forestLight
                  : colors.dangerLight
              }
            ]}
          >
            <View
              style={[
                styles.connectionDot,
                { backgroundColor: isConnected ? colors.forest : colors.danger }
              ]}
            />
            <Text
              style={[
                styles.connectionText,
                { color: isConnected ? colors.forest : colors.danger }
              ]}
            >
              {isConnected ? "Simulated link" : "Simulated off"}
            </Text>
          </View>
        }
      >
        <View style={styles.deviceHero}>
          <View style={styles.deviceIcon}>
            <Ionicons color={colors.white} name="radio" size={34} />
          </View>
          <View style={styles.deviceCopy}>
            <Text style={styles.deviceName}>{connectedDeviceName}</Text>
            <Text style={styles.deviceDetail}>
              Prototype device state, no Bluetooth stack loaded.
            </Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setIsConnected((current) => !current);
          }}
          style={({ pressed }) => [
            styles.connectButton,
            { opacity: pressed ? 0.82 : 1 }
          ]}
        >
          <Ionicons
            color={colors.white}
            name={isConnected ? "pause-circle-outline" : "play-circle-outline"}
            size={20}
          />
          <Text style={styles.connectButtonText}>
            {isConnected ? "Pause simulation" : "Resume simulation"}
          </Text>
        </Pressable>
      </Section>

      <Section title="Telemetry" subtitle="Simulated device health">
        {simulatedDeviceMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  connectButton: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: colors.forest,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 14,
    minHeight: 50,
    paddingHorizontal: 14
  },
  connectButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900"
  },
  connectionBadge: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  connectionDot: {
    borderRadius: 999,
    height: 8,
    width: 8
  },
  connectionText: {
    fontSize: 12,
    fontWeight: "900"
  },
  deviceCopy: {
    flex: 1
  },
  deviceDetail: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4
  },
  deviceHero: {
    alignItems: "center",
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderTopColor: colors.amber,
    borderTopWidth: 3,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    padding: 16
  },
  deviceIcon: {
    alignItems: "center",
    backgroundColor: colors.graphite,
    borderRadius: 8,
    height: 62,
    justifyContent: "center",
    width: 62
  },
  deviceName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  }
});
