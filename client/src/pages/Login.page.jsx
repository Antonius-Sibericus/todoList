import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import { AuthContext } from '../App';

export default function Login() {
    const { isInSystem, setIsInSystem } = React.useContext(AuthContext);

    return (
        <>
            <p>Login Page</p>
            <Link to="/signup">Signup</Link>
            <Link to="/">Dashboard</Link>
            <button onClick={() => setIsInSystem(prev => !prev)}>
                Log In or Log Out
            </button>
        </>
    )
}