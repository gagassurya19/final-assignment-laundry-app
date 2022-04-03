import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import Swal from 'sweetalert2';

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            telephone: '081234567896',
            password: 'customer',
            token: ''
        }
        // dapetin token dari localstorage
        if (localStorage.getItem("token_customer")) {
            window.location = "/home"
        }
    }

    Login = event => {
        event.preventDefault() // menghilangkan effect refreshpage

        let data = {
            telephone: this.state.telephone,
            password: this.state.password
        }

        let url = process.env.REACT_APP_CUSTOMER_API_URL + "auth_customer"

        axios.post(url, data)
            .then(response => {
                if(!response.data.isLogged) {
                    this.Alert('error', response.data.message)
                } else {
                    localStorage.setItem('token_customer', response.data.token)
                    localStorage.setItem('id_customer', response.data.data.id_customer)
                    localStorage.setItem('status_customer', response.data.data.status)
                    localStorage.setItem('photo_profile_customer', process.env.REACT_APP_CUSTOMER_API_IMAGE + response.data.data.photo_profile)
                    localStorage.setItem('register_date', response.data.data.register_date)
                    localStorage.setItem('name_customer', response.data.data.first_name +" "+ response.data.data.last_name)
                    this.Alert('success', 'Login berhasil. \nRedirect ke Dashboard')
                    setTimeout(function () {
                        window.location = '/home'
                    }, 1600);
                }
            })
            .catch(error => {
                this.Alert('error', error)
            })
    }

    Alert = (kind, message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        })

        Toast.fire({
            icon: kind,
            title: message
        })
    }

    render() {
        return (
            <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-auto h-12 w-auto w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            <div>
                                Sign in to your account
                            </div>
                        </h2>
                    </div>
                    <form class="mt-8 space-y-6" onSubmit={ev => this.Login(ev)}>
                        <div class="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="Nomor_Whatsapp" class="sr-only">Nomor Whatsapp</label>
                                <input id="no_wa" name="no_wa" type="number" required class="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="+62"
                                    value={this.state.telephone} onChange={ev => this.setState({ telephone: ev.target.value })} />
                            </div>
                            <div>
                                <label for="password" class="sr-only">Password</label>
                                <input id="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"
                                    value={this.state.password} onChange={ev => this.setState({ password: ev.target.value })} />
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="text-sm">
                                <Link to="/register" class="font-medium hover:underline">
                                    Don't have an account?
                                </Link>
                            </div>
                        </div>
                        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* <!-- Heroicon name: solid/lock-closed --> */}
                                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Sign In
                        </button>
                        <Link to="/" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* <!-- Heroicon name: solid/lock-closed --> */}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </span>
                            Back Home
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}