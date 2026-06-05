import { StatusBar } from "react-native";

import { DownwindProvider } from "./src/context/DownwindContext";
import { BottomTabNavigator } from "./src/navigation/BottomTabNavigator";
import { colors } from "./src/theme/colors";

export default function App() {
  return (
    <DownwindProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <BottomTabNavigator />
    </DownwindProvider>
  );
}
