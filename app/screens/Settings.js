import React, { useContext } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Button as RNButton } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../contexts/authContext';
import { getValue, removeItemValue } from '../services/storage';
import Button from '../components/Button';

const Settings = ({navigation}) => {
    const { authenticated, setAuthentication } = useContext(AuthContext);
    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView>
            <Text>This is Settings Page</Text>
            <View>
                <RNButton 
                    title="Logout"
                    style={{ width:"100%" }}
                    onPress={ async () => {
                        let token = await getValue('token')
                        let device = await getValue('device');

                        fetch('http://bauchi.endvis.tech/api/provider/logout', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                device: device
                            })
                        })
                        .then((response) => response.json())
                        .then((jsonResponse)=> {
                            removeItemValue('token')
                            .then(() => {
                                setAuthentication(false)
                                navigation.navigate('Welcome');
                            })
                        })
                    }}
                >
                    
                </RNButton>
            </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:10,
    },
    logoutButton: {
        right:10,
        left:10,
        position: 'absolute',
        bottom:10,
        backgroundColor: '#000000',
        height:70
    }
})
export default Settings;