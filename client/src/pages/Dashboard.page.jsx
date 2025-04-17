import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import { AuthContext } from '../App';

export default function Dashboard() {
    const { isInSystem, setIsInSystem } = React.useContext(AuthContext);

    return (
        <>
            <p>Dashboard</p>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <button onClick={() => setIsInSystem(prev => !prev)}>
                Log In or Log Out
            </button>
        </>
    )
}