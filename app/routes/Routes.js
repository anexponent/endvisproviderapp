import React, {useContext} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/SetupScreen';
import { AuthContext } from '../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
    const { authenticated, setAuthentication } = useContext(AuthContext);

    const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
            // value previously stored
            setAuthentication(true)
            console.log(value);
          }
        } catch(e) {
          // error reading value
        }
    }
    getToken();
    return(
        <NavigationContainer>
            <Stack.Navigator>
            {authenticated==true ?
                (
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                )
                :   
                (
                    <>
                    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
                    <Stack.Screen name="Setup" options={{ headerShown: false }} component={SetupScreen} />
                    </>
                )
            }
            </Stack.Navigator>
            
        </NavigationContainer>
    );
}
export default Routes;