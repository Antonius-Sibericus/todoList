import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import { AuthContext } from '../App';
import Signup from '../components/signup/Signup.component';
import styles from "./pages.module.scss";

export default function SignupPage() {
    const { isInSystem, setIsInSystem } = React.useContext(AuthContext);

    return (
        <>
            <p>Signup Page</p>
            <Link to="/login">Login</Link>
            <Link to="/">Dashboard</Link>
            <button onClick={() => setIsInSystem(prev => !prev)}>
                Log In or Log Out
            </button>
        </>
    );
};