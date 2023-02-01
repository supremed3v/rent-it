import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import "react-native-gesture-handler";
import { useState, useEffect, useCallback, useRef } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { NativeScreen } from "./src/components/Navigation";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

import { CartProvider } from "./src/context/CartContext";
import { ProductProvider } from "./src/context/ProductsContext";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <AuthContextProvider>
      <ProductProvider>
        <CartProvider>
          <PaperProvider theme={CombinedDarkTheme}>
            <NavigationContainer theme={CombinedDarkTheme}>
              <NativeScreen />
            </NavigationContainer>
          </PaperProvider>
        </CartProvider>
      </ProductProvider>
    </AuthContextProvider>
  );
}
