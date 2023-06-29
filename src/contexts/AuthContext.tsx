import React from 'react';

export type AuthContextType = {
    isAuthenticated: boolean;
    username: string | null;
  };
  

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  username: '',
});


export default AuthContext;