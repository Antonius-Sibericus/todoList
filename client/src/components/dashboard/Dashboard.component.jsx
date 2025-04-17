import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import { AuthContext } from '../../App';
import styles from "./dashboard.module.scss";

export default function Dashboard() {
    return (
        <>
            <p>Dashboard Component</p>
        </>
    )
}