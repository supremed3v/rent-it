import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./src/components/Navigation";
import { StatusBar } from "expo-status-bar";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: "#fff",
  },
};

export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <SafeAreaView />
      <StatusBar style="auto" />
      <NavigationContainer theme={CombinedDarkTheme}>
        <TabNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}
