import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Products from "../screens/Products";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AllProducts from "../screens/AllProducts";

const CustomTabBar = ({ children }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("Home")}
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
  const theme = useTheme();
  const Tab = createBottomTabNavigator();
  return (
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
              <Text>AppBarComponent</Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 80,
                marginRight: 10,
              }}
            >
              <Button
                mode="outline"
                style={{
                  marginTop: 10,
                }}
              >
                <FontAwesome name="user-circle" size={24} color="#fff" />
              </Button>
            </View>
          ),
          headerStyle: {
            backgroundColor: theme.dark ? theme.colors.background : "#fff",
            elevation: theme.colors.elevation.level0,
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
        options={{ tabBarBadge: 2 }}
        component={Products}
      />
    </Tab.Navigator>
  );
};

export const NativeScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeTab" component={TabNavigation} />
      <Stack.Screen name="AllProducts" component={AllProducts} />
    </Stack.Navigator>
  );
};
