import { lazy } from "react";

// Menampilkan effect lazyload dengan function lazy()
const Dashboard = lazy(() => import('./dashboard'));
const Settings = lazy(() => import('./settings'));
const Login = lazy(() => import('./login'));

export {
    Dashboard,
    Settings,
    Login
};