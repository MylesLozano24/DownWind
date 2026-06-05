import { Ionicons } from "@expo/vector-icons";
import type { ComponentType } from "react";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { DeviceScreen } from "../screens/DeviceScreen";
import { GroupScreen } from "../screens/GroupScreen";
import { MapScreen } from "../screens/MapScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { StatusScreen } from "../screens/StatusScreen";
import { colors } from "../theme/colors";
import { tabs, type TabRouteName } from "./routes";

const screens: Record<TabRouteName, ComponentType> = {
  Map: MapScreen,
  Group: GroupScreen,
  Status: StatusScreen,
  Device: DeviceScreen,
  Settings: SettingsScreen
};

export function BottomTabNavigator() {
  const [activeRoute, setActiveRoute] = useState<TabRouteName>("Map");
  const ActiveScreen = screens[activeRoute];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ActiveScreen />
        </View>
        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = activeRoute === tab.name;

            return (
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                key={tab.name}
                onPress={() => {
                  setActiveRoute(tab.name);
                }}
                style={({ pressed }) => [
                  styles.tabButton,
                  isActive ? styles.tabButtonActive : null,
                  { opacity: pressed ? 0.76 : 1 }
                ]}
              >
                <Ionicons
                  color={isActive ? colors.white : colors.muted}
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={22}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabLabel,
                    { color: isActive ? colors.white : colors.muted }
                  ]}
                >
                  {tab.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  content: {
    flex: 1
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1
  },
  tabBar: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    bottom: 14,
    flexDirection: "row",
    gap: 6,
    left: 14,
    padding: 6,
    position: "absolute",
    right: 14
  },
  tabButton: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    gap: 3,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 4,
    paddingVertical: 7
  },
  tabButtonActive: {
    backgroundColor: colors.forest
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "900",
    textAlign: "center"
  }
});
