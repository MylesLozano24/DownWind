import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type TabRouteName = "Map" | "Group" | "Status" | "Device" | "Settings";

export type TabDefinition = {
  name: TabRouteName;
  icon: ComponentProps<typeof Ionicons>["name"];
  activeIcon: ComponentProps<typeof Ionicons>["name"];
};

export const tabs: TabDefinition[] = [
  { name: "Map", icon: "map-outline", activeIcon: "map" },
  { name: "Group", icon: "people-outline", activeIcon: "people" },
  { name: "Status", icon: "pulse-outline", activeIcon: "pulse" },
  { name: "Device", icon: "radio-outline", activeIcon: "radio" },
  { name: "Settings", icon: "settings-outline", activeIcon: "settings" }
];
