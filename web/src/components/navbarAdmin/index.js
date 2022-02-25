import React from "react"
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div className="container mx-auto">
                <header class="text-gray-600 body-font">
                    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                        <a href="#" class="flex items-start gap-2 group">
                            <div class="bg-blue-600 text-white p-2 rounded-md group-hover:bg-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p class="text-sm font-light uppercase">
                                Dashboard
                                <span class="text-base block font-bold tracking-widest">
                                    Admin
                                </span>
                            </p>
                        </a>
                        <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center space-x-4 text-sm">
                            <Link to="/admin" class="mr-5 px-2 xl:px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200">Dashboard</Link>
                            <Link to="/admin/transaction" class="mr-5 px-2 xl:px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200">Transaction</Link>
                            <Link to="/admin/package" class="mr-5 px-2 xl:px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200">Package</Link>
                            <Link to="/admin/member" class="mr-5 px-2 xl:px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200">Member</Link>
                            <Link to="/admin/administrator" class="mr-5 px-2 xl:px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200">Administrator</Link>
                        </nav>
                        <ul class="flex items-center gap-6">
                            <li>
                                <Link to="profile" class="text-sm font-sans text-gray-800 font-semibold tracking-wider">
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <a href="#">
                                    <div class="p-2 rounded hover:bg-gray-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current text-gray-800"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
        </>
    )
}