import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Products from "../screens/Products";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

export default function TabNavigation() {
  const theme = useTheme();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
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
          headerShown: false,
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
        };
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Products} />
      <Tab.Screen name="Likes" component={Products} />
      <Tab.Screen
        name="Cart"
        options={{ tabBarBadge: 2 }}
        component={Products}
      />
    </Tab.Navigator>
  );
}
