import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            level: "",
            nisn: "",
            message: "",
            logged: true,
            token: ""
        }
        // dapetin token dari localstorage
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            window.location = "/"
        }
    }
    render() {
        return (
            <>
                <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div class="max-w-md w-full space-y-8">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-auto h-12 w-auto w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                <div>
                                    Sign in to Dashboard
                                </div>
                            </h2>
                            {!this.state.logged ? (
                                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5 text-center" role="alert">
                                    <strong class="font-bold">Wadidaw! </strong>
                                    <span class="block sm:inline">{this.state.message}</span>
                                </div>
                            ) : null}
                        </div>
                        <form class="mt-8 space-y-6" method="POST">
                            <div class="rounded-md shadow-sm -space-y-px">
                                <select required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    value={this.state.level} onChange={ev => this.setState({ level: ev.target.value })}>
                                    <optgroup label="Select Role:">
                                        <option value="admin">Admin</option>
                                        <option value="kasir">Kasir</option>
                                        <option value="owner">Owner</option>
                                    </optgroup>
                                </select>
                                <div>
                                    <label for="username" class="sr-only">Username</label>
                                    <input id="username" name="username" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username"
                                        onChange={ev => this.setState({ no_wa: ev.target.value })} />
                                </div>
                                <div>
                                    <label for="password" class="sr-only">Password</label>
                                    <input id="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"
                                        onChange={ev => this.setState({ password: ev.target.value })} />
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-sm">
                                    <p class="font-medium">
                                        *If you forgot your account, please call the owner
                                    </p>
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
            </>
        )
    }
}
