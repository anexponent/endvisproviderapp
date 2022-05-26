import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import Button from '../components/Button';
import { AuthContext } from '../contexts/authContext';
import Profile from './Profile';
import MapNavigation from './MapNavigation';
import Settings from './Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const HomeScreen = ({ navigation }) => {
    const { authenticated, setAuthentication } = useContext(AuthContext);
    async function SignOut() {
        console.log(authenticated)
        setAuthentication(false)
        // navigation.navigate('Welcome');
    }
    return (
        // <NavigationContainer>
            <Tab.Navigator initialRouteName='MapNavigate'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'MapNavigate') {
                      iconName = focused
                        ? 'navigate-circle'
                        : 'navigate-circle';
                    } else if (route.name === 'Settings') {
                      iconName = focused ? 'ios-settings' : 'ios-settings';
                    }else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person';
                    }
                
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="MapNavigate" component={MapNavigation} />
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        // </NavigationContainer>
        
        // <View style={styles.container}>
        //     <Text>
        //         Welcome to Endvis Provider Navigation System
        //         <Button label='Logout' onPress={SignOut} />
        //     </Text>
        // </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: DefaultTheme.colors.background,
        alignItems: 'center',
        paddingTop: 10
      },
})
export default HomeScreen;