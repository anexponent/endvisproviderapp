import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/authContext';

async function Login(username, password, device){
    // const { authenticated, setAuthentication } = useContext(AuthContext);
    fetch('http://bauchi.endvis.tech/api/provider/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            username: username,
            password: password,
            device: device,
          })
        })
        .then((response) => response.json())
        .then((jsonResponse)=> {
            if(jsonResponse.responseCode == "00"){
              //Set token, device and Log in state
              
              try{
                // AsyncStorage.setItem('token', jsonResponse.data.token);
                // AsyncStorage.setItem('device', device);
                // setAuthentication(true)
                    let data = {
                        token: jsonResponse.data.token,
                        status: jsonResponse.responseCode,
                        message: jsonResponse.message
                    }
                    // console.log(data)
                    return (data);
              }catch(e){
                // throw new(e)
              }
            }else if(jsonResponse.responseCode == "01"){
                let data = {
                    status: jsonResponse.responseCode,
                    message: jsonResponse.message
                }
                return (data);
            }else{
                let data = {
                    status: jsonResponse.responseCode,
                    message: jsonResponse.message
                }
                return (data);
            }
        })
        .catch((error) => {
          console.error(error);
        })
    }
    // async function Login(username, password, device){
    //     // console.log(username+ " "+ password + " " + device);
    //     const response = await fetch('http://bauchi.endvis.tech/api/provider/login', 
    //     {
    //         method: 'POST',
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: username,
    //         password: password,
    //         device: device,
    //       })
    //     })
    //     console.log(response.json())
    // }

export default Login;