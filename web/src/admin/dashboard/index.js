import React from "react";
import { Navbar } from "../../components";
import Home from './pages/dashboard';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="bg-gray-100">
                <div className="container mx-auto">
                    <Home/>
                </div>
            </div>
        )
    }
}