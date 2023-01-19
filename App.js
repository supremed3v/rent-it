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
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { NativeScreen } from "./src/components/Navigation";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

import { CartProvider } from "./src/context/CartContext";
import { ProductProvider } from "./src/context/ProductsContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <ProductProvider>
        <CartProvider>
          <SafeAreaView mode="light" />
          <PaperProvider theme={CombinedDarkTheme}>
            <NavigationContainer theme={CombinedDarkTheme}>
              <NativeScreen />
            </NavigationContainer>
          </PaperProvider>
        </CartProvider>
      </ProductProvider>
    </>
  );
}
