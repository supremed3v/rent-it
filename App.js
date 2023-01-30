import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { useState, useEffect, useCallback } from "react";
import LottieView from "lottie-react-native";

import { NavigationContainer } from "@react-navigation/native";
import { NativeScreen } from "./src/components/Navigation";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

import { CartProvider } from "./src/context/CartContext";
import { ProductProvider } from "./src/context/ProductsContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContextProvider } from "./src/context/AuthContext";

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: "#fff",
  },
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <>
      <AuthContextProvider>
        <ProductProvider>
          <CartProvider>
            <SafeAreaView mode="light" />
            <GestureHandlerRootView
              onLayout={onLayoutRootView}
              style={{
                flex: 1,
              }}
            >
              <SafeAreaView mode="light" />
              <LottieView
                source={require("./assets/rentit-splash.json")}
                autoPlay
                loop
              />
            </GestureHandlerRootView>
            <PaperProvider theme={CombinedDarkTheme}>
              <NavigationContainer theme={CombinedDarkTheme}>
                <NativeScreen />
              </NavigationContainer>
            </PaperProvider>
          </CartProvider>
        </ProductProvider>
      </AuthContextProvider>
    </>
  );
}
