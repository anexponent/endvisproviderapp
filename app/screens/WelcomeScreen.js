import React, {useContext, useState} from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Button as PaperButton, Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import * as Yup from 'yup';
import { removeItemValue, getValue } from '../services/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/authContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required')
});

const WelcomeScreen = ( {navigation} ) => {
    const { authenticated, setAuthentication } = useContext(AuthContext);
    
    //Formik form validation and submit
    const { handleChange, 
            handleSubmit, 
            handleBlur,
            values,
            errors,
            touched } = useFormik({
        validationSchema: LoginSchema,
        initialValues: { username: '', password: '' },
        onSubmit: async (values) => {
            let device = await getValue('device')
            fetch('http://bauchi.endvis.tech/api/provider/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                        device: device,
                    })
            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                if(jsonResponse.responseCode =='00'){
                    //Login Successful
                    //save the token to async storage
                     AsyncStorage.setItem('token', jsonResponse.data.token)
                    //  AsyncStorage.setItem('device', values.device)
                    setAuthentication(true);
                    navigation.navigate('Home');
                }else if(jsonResponse.responseCode == '01'){
                    //Validation Error
                    alert("One of the field is missing/or incorrect Device Specified")
                }else{
                    //Wrong Crendentials
                    alert("Wrong Credentials!")
                }
            });
      }});

    const Login = () => {
        console.log('Login');
        navigation.navigate('Home')
    }

    //Setup
    const Setup = () => {
        console.log('Setup')
        navigation.navigate('Setup');
    }
    return (
        <View style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
        >
            <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16 }}>
                Login
            </Text>
            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                <TextInput
                    icon='user'
                    placeholder='Enter User name'
                    autoCapitalize='none'
                    autoCompleteType='username'
                    keyboardType='default'
                    keyboardAppearance='default'
                    returnKeyType='next'
                    returnKeyLabel='next'
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    error={errors.username}
                    touched={touched.username}
                />
            </View>
            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%' }}>
                <TextInput
                    icon='key'
                    placeholder='Enter your password'
                    secureTextEntry
                    autoCompleteType='password'
                    autoCapitalize='none'
                    keyboardAppearance='default'
                    returnKeyType='go'
                    returnKeyLabel='go'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors.password}
                    touched={touched.password}

                />
            </View>
            <Button label='Login' onPress={handleSubmit} />
            <TouchableOpacity 
                style={{ padding:20, fontSize:20 }}
                onPress ={ () => Setup()}
            >
            <Text>Setup</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView:{
        backgroundColor: DefaultTheme.colors.backgroundColor,
        padding: 10,
    },
})

export default WelcomeScreen;