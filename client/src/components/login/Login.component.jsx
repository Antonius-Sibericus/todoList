import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import { AuthContext } from '../../App';
import styles from "./login.module.scss";

export default function Login() {
    return (
        <>
            <p>Login Component</p>
        </>
    );
};