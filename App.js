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

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);
  console.log(expoPushToken);

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
