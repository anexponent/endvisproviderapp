import React, { createContext } from 'react';

export const AuthContext = createContext({
    authenticated: false,
    setAuthentication: () => null,
  });