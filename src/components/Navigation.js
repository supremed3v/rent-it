import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Products from "../screens/Products";
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from "react-native-paper";

export default function TabNavigation() {
    const theme = useTheme()
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={({ route }) => {
            return {
                tabBarIcon: ({ focused }) => {
                    let iconName
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home'

                    } else if (route.name === 'Products') {
                        iconName = focused ? 'shoppingcart' : 'shoppingcart'
                    }
                    return <AntDesign name={iconName} size={24} color={
                        focused ? '#fff' : 'gray'
                    } />
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.dark ? theme.colors.background : '#fff',
                    borderTopColor: theme.dark ? theme.colors.background : '#fff',
                    shadowOpacity: 0,
                    shadowColor: "#fff",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    
                    elevation: 15,
                    
                }
            }}}
        >
            <Tab.Screen name="Home" component={Home}

            />
            <Tab.Screen name="Products" component={Products}

            />
        </Tab.Navigator>
    )
}