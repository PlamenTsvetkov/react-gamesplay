import React from 'react';

export type AuthContextType = {
    isAuthenticated: boolean;
    username: string | null;
    userId: string | null
  };
  

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  username: '',
  userId: '',
});


export default AuthContext;