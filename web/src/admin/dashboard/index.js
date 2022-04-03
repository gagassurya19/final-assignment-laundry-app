import React from "react";
import { Navbar } from "../../components";
import Home from './pages/dashboard';

export default class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
        }
        // dapetin token dari localstorage
        if (!localStorage.getItem("token_admin")) {
            window.location = "/admin/login"
        }
    }
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