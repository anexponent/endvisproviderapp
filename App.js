import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './app/routes/Routes';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from './app/contexts/authContext';

export default function App() {
  const [authenticated, setAuthentication] = useState(false);
  return (
    <AuthContext.Provider value={{ authenticated, setAuthentication }}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </AuthContext.Provider>
  );
}