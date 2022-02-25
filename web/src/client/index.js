import { lazy } from "react";

// Menampilkan effect lazyload dengan function lazy()
const LandingPage = lazy(() => import('./landingPage'));
const PlaceOrder = lazy(() => import('./placeOrder'));
const LoginClient = lazy(() => import('./loginRegister/login'));
const RegisterClient = lazy(() => import('./loginRegister/register'));
const Profile = lazy(() => import('./profile'));
const Home = lazy(() => import('./dashboard'));

export { LandingPage, PlaceOrder, LoginClient, RegisterClient, Profile, Home };