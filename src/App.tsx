import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './utils/firebase';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import AuthContext, { AuthContextType } from './contexts/AuthContext';
import { User } from 'firebase/auth';
import isAuth from './hoc/isAuth';
import Logout from './components/Logout/Logout';
import Register from './components/Register/Register';
import AllGames from './components/AllGames/AllGames';

import './App.css';

function App() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser as User);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo: AuthContextType = {
  isAuthenticated: Boolean(user),
  username: user?.email || null
};

  return (
    <div className="container">
        <AuthContext.Provider value={authInfo}>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" Component={isAuth(Logout)} />
        <Route path="/register" Component={Register} />
        <Route path="/all-games" Component={isAuth(AllGames)} />
      </Routes>

      </AuthContext.Provider>
    </div>
  );
}

export default App;