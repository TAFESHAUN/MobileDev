import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, IconButton} from 'react-native-paper';
import React, { createContext, useContext} from 'react'

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen   from "./screens/DetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TestScreen from './screens/TestScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const appTheme = {
  bg: '#55a2f6',
  test: 'rgb(71, 152, 113)',
  cardBg: '#313131',
  headerBg: '#fac83f',
  headerTint: '#008cff',
  titleColor: '#4d434a',
  accentCol: '#10b810',
};

export const ThemeContext = createContext(appTheme);
export const useAppTheme = () => useContext(ThemeContext);

//Track stack pop-on and pop-off
function HomeStack() {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#F5DEB3'},
      headerTintColor: '#f301a2',
    }}>
      <Stack.Screen name="Home" component={HomeScreen}
      options= {({ navigation }) => ({
            title: 'Logo',
            headerRight: () => (
              <IconButton 
                icon="cog-outline"
                size={30}
                iconColor='#f301a2'
                onPress={ () => navigation.navigate('Settings')}
              />
            )
        }) 
      }
      />
      <Stack.Screen name="Details" component={DetailsScreen}/>
      <Stack.Screen name="Settings" component={SettingsScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <ThemeContext.Provider value={appTheme}>
        <PaperProvider>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={{
                  tabBarActiveTintColor: '#f00084',
                  tabBarInactiveTintColor: '#999',
                  headerStyle: {backgroundColor: '#6200ee'},
                  headerTintColor: '#fff',
                  tabBarStyle: {
                  height: 55,           
                  },
                }}
              >

              <Tab.Screen name="Home" 
              component={HomeStack} 
              options={{headerShown: false}} 
              />
              <Tab.Screen name='Test' 
              component={TestScreen} 
              options={{ title: 'Test' }} 
              />
              
              
              </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
      </ThemeContext.Provider>
  );
}

/*             <Tab.Screen name="Settings" 
            component={SettingsScreen}
            options={{
              headerStyle:     { backgroundColor: "#6200ee" },
              headerTintColor: "#fff",
            }}
            /> */