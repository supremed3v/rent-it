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
import { NativeScreen } from "./src/components/Navigation";

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
    <>
      <SafeAreaView />
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <NativeScreen />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
