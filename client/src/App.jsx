import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import styles from './app.module.scss';

import DashboardPage from './pages/Dashboard.page';
import LoginPage from './pages/Login.page';
import SignupPage from './pages/Signup.page';
import NotFound from './pages/NotFound.page';

export const AuthContext = React.createContext();

export default function App() {
  const [isInSystem, setIsInSystem] = React.useState(false);

  return (
    <>
      <AuthContext.Provider value={{ isInSystem, setIsInSystem }}>
        <Routes>
          <Route
            path='/login'
            element={!isInSystem ? <LoginPage /> : <Navigate to='/' />}></Route>
          <Route
            path='/signup'
            element={!isInSystem ? <SignupPage /> : <Navigate to='/' />}></Route>
          <Route
            path='/'
            element={isInSystem ? <DashboardPage /> : <Navigate to='/login' />}></Route>
          <Route
            path='*'
            element={<NotFound />}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
};