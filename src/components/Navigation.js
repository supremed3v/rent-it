import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Products from "../screens/Products";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Appbar, Avatar, Button, useTheme, Switch } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Alert,
  Pressable,
  TouchableOpacity,
  View,
  TouchableRipple,
} from "react-native";
import { Text } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  useNavigation,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import AllProducts from "../screens/AllProducts";
import ProductDetails from "../screens/ProductDetails";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import CategorizedProducts from "../screens/CategorizedProducts";
import ProductCard from "./ProductCard";
import Cart from "../screens/Cart";
import LoginSignup from "../screens/LoginSignup";
const { useCart } = require("../context/CartContext");
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import AddProduct from "../screens/AddProduct";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import OrderScreen from "../screens/OrderScreen";
import CustomDrawer from "./CustomDrawer";

const CustomTabBar = ({ children }) => {
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const postButton = () => {
    if (user.role === "admin" || "seller") {
      navigation.navigate("AddProduct");
    } else {
      return;
    }
  };

  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={postButton}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#e32f45",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export const TabNavigation = () => {
  const { cart } = useCart();
  const navigation = useNavigation();
  const theme = useTheme();
  const Tab = createBottomTabNavigator();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route, style }) => {
          return {
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Explore") {
                iconName = focused ? "search1" : "search1";
              } else if (route.name === "Likes") {
                iconName = focused ? "hearto" : "hearto";
              } else if (route.name === "Cart") {
                iconName = focused ? "shoppingcart" : "shoppingcart";
              }
              return (
                <AntDesign
                  name={iconName}
                  size={24}
                  color={focused ? "#fff" : "gray"}
                />
              );
            },
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              tabBarBackground: "transparent",
              backgroundColor: theme.dark ? theme.colors.background : "#fff",
              borderTopColor: theme.dark ? theme.colors.background : "#fff",
              shadowOpacity: 0,
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 15,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 10,
              height: 60,
              borderRadius: 15,
              width: 330,
              marginLeft: 15,
            },
            tabBarBadgeStyle: {
              backgroundColor: "#fff",
              color: "#000",
              width: 20,
              height: 20,
              borderRadius: 10,
              textAlign: "center",
              fontSize: 12,
              fontWeight: "bold",
            },
            tabBarShowLabel: false,
            headerShown: route.name === "Home" ? true : false,
            headerTitle: () => (
              <View>
                <Text
                  variant="displaySmall"
                  style={{
                    color: theme.dark ? theme.colors.text : "#000",
                    fontWeight: "bold",
                  }}
                >
                  Logo
                </Text>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  marginRight: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                >
                  <Avatar.Image
                    size={40}
                    source={{
                      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerLeft: () => (
              <>
                <View
                  style={{
                    marginLeft: 15,
                  }}
                >
                  <Pressable onPress={() => navigation.openDrawer()}>
                    <AntDesign name="bars" size={24} color="#fff" />
                  </Pressable>
                </View>
              </>
            ),
            headerStyle: {
              backgroundColor: theme.dark ? theme.colors.background : "#fff",
            },
          };
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Explore" component={Products} />
        <Tab.Screen
          name="Post"
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign name="pluscircle" size={30} color="#fff" />
            ),
            tabBarButton: (props) => <CustomTabBar {...props} />,
          }}
          component={Products}
        />
        <Tab.Screen name="Likes" component={Products} />
        <Tab.Screen
          name="Cart"
          options={cart.length !== 0 ? { tabBarBadge: cart.length } : {}}
          component={Cart}
        />
      </Tab.Navigator>
    </>
  );
};

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
    text: "#fff",
    buttonText: "#fff",
  },
};

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home " component={TabNavigation} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Orders" component={OrderScreen} />
    </Drawer.Navigator>
  );
};

export const NativeScreen = () => {
  const { isAuthenticated, error, loadUser, loginToken } = useAuthContext();
  useEffect(() => {
    loadUser();
    if (error) {
      Alert.alert(error);
    }
  }, [error, loginToken]);
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={isAuthenticated ? "Drawer" : "LoginSignup"}
      >
        <Stack.Screen name="AllProducts" component={AllProducts} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="FilteredProducts" component={CategorizedProducts} />
        <Stack.Screen name="ProductCard" component={ProductCard} />
        <Stack.Screen name="LoginSignup" component={LoginSignup} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
      </Stack.Navigator>
    </PaperProvider>
  );
};
