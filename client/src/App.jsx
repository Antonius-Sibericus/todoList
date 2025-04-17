import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import './App.css';

import Dashboard from './pages/Dashboard.page';
import Login from './pages/Login.page';
import Signup from './pages/Signup.page';
import NotFound from './pages/NotFound.page';

export const AuthContext = React.createContext();

function App() {
  const [isInSystem, setIsInSystem] = React.useState(false);

  return (
    <>
      <AuthContext.Provider value={{ isInSystem, setIsInSystem }}>
        <Routes>
          <Route
            path='/login'
            element={!isInSystem ? <Login setIsInSystem={setIsInSystem} /> : <Navigate to='/' />}></Route>
          <Route
            path='/signup'
            element={!isInSystem ? <Signup setIsInSystem={setIsInSystem} /> : <Navigate to='/' />}></Route>
          <Route
            path='/'
            element={isInSystem ? <Dashboard setIsInSystem={setIsInSystem} /> : <Navigate to='/login' />}></Route>
          <Route
            path='*'
            element={<NotFound />}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
