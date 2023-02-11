import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import axios from "axios";
import { API } from "./src/context/ProductsContext";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeScreen } from "./src/components/Navigation";
import * as Notifications from "expo-notifications";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

import { CartProvider } from "./src/context/CartContext";
import { ProductProvider } from "./src/context/ProductsContext";
import { AuthContextProvider } from "./src/context/AuthContext";
import { useEffect, useState } from "react";
import { CategoriesProviders } from "./admin/src/context/CategoriesContext";

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
  const [pubKey, setSubKey] = useState("");

  const fetchPubKey = async () => {
    const { data } = await axios.get(`${API}/api/v1/get-pub-key`);
    setSubKey(data.publishableKey);
  };

  useEffect(() => {
    fetchPubKey();
  }, []);
  return (
    <AuthContextProvider>
      <ProductProvider>
          <CategoriesProviders>
        <CartProvider>
          <StripeProvider publishableKey={pubKey}>
            <PaperProvider theme={CombinedDarkTheme}>
              <NavigationContainer theme={CombinedDarkTheme}>
                <NativeScreen />
              </NavigationContainer>
            </PaperProvider>
          </StripeProvider>
        </CartProvider>
          </CategoriesProviders>
      </ProductProvider>
    </AuthContextProvider>
  );
}
