import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";
import type { HunterStatus } from "../types";

type IconName = ComponentProps<typeof Ionicons>["name"];

type StatusActionButtonProps = {
  status: HunterStatus;
  iconName: IconName;
  isSelected: boolean;
  onPress: () => void;
};

export function StatusActionButton({
  status,
  iconName,
  isSelected,
  onPress
}: StatusActionButtonProps) {
  const isEmergency = status === "Need Help" || status === "SOS";
  const activeColor = isEmergency ? colors.danger : colors.forest;
  const activeBackground = isEmergency ? colors.dangerLight : colors.forestLight;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isSelected ? activeBackground : colors.panelAlt,
          borderColor: isSelected ? activeColor : colors.border,
          opacity: pressed ? 0.82 : 1
        }
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: isSelected ? activeColor : colors.white }
        ]}
      >
        <Ionicons
          color={isSelected ? colors.white : activeColor}
          name={iconName}
          size={22}
        />
      </View>
      <Text style={[styles.label, { color: isSelected ? activeColor : colors.text }]}>
        {status}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 10,
    minHeight: 104,
    minWidth: "47%",
    padding: 12
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    width: 44
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center"
  }
});
