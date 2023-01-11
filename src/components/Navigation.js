import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Products from "../screens/Products";
import { AntDesign } from '@expo/vector-icons';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={({ route }) => {
            return {
                tabBarIcon: ({ focused, color }) => {
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
                tabBarActiveBackgroundColor: '#000',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopColor: '#000',
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