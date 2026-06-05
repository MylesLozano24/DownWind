import { StatusBar } from "react-native";

import { HunterRadarProvider } from "./src/context/HunterRadarContext";
import { BottomTabNavigator } from "./src/navigation/BottomTabNavigator";
import { colors } from "./src/theme/colors";

export default function App() {
  return (
    <HunterRadarProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <BottomTabNavigator />
    </HunterRadarProvider>
  );
}
