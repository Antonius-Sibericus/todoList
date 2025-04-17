import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import { AuthContext } from '../App';

export default function NotFound() {
    const { isInSystem, setIsInSystem } = React.useContext(AuthContext);

    return (
        <>
            <p>Page was not found</p>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="/">Dashboard</Link>
            <button onClick={() => setIsInSystem(prev => !prev)}>
                Log In or Log Out
            </button>
        </>
    )
}