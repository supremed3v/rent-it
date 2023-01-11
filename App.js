import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {View } from 'react-native';
import { MD3DarkTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
;
import Home from './src/screens/Home';
import merge from 'deepmerge';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigation from './src/components/Navigation';

// const theme = {
//   ...DefaultTheme,
//   dark: true,
//   colors:{
//     ...DefaultTheme.colors,
//     primary: '#e7e7e7e7',
//     text: '#fff',
//   }
// }
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDarkTheme = merge(DefaultTheme, DarkTheme);


const theme = {
  ...CombinedDarkTheme,
  dark: true,
  colors:{

  }
}



export default function App() {
  return (
    <PaperProvider theme={theme} >
      <View style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <SafeAreaView/>
      <NavigationContainer theme={theme} >
        <TabNavigation/>
      </NavigationContainer>
      <Home/>
      </View>
    </PaperProvider>
  );
}

