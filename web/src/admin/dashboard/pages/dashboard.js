import React from "react";
import { Link } from "react-router-dom";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import calendar from '../../../assets/image/dashboard-admin/calendar.png';

import Statistic from "./components/statistic";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
    labels: [
        'Total Transaksi',
        'Total Outlet',
        'Total Member',
        'Total Paket Laundry',
    ],
    datasets: [{
        label: 'Total Expenses',
        data: [148, 150, 130, 170],
        backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#6366F1',
            '#F59E0B'
        ]
    }]
};
function Chart() {
    return <Doughnut data={data} />;
}

export default class Dashboard extends React.Component {

    state = {
        quotesData: {
            quotes: "",
            author: ""
        }
    }

    getQuotes = async () => {
        let api = 'https://api.quotable.io/random';
        return await fetch(api).then(res => res.json()).then(data => {
            this.setState({ quotes: data.content })
            this.setState({ author: data.author })
        })
    }

    componentDidMount() {
        this.getQuotes()
    }
    render() {

        return (
            <>
                <main class="mx-w-6xl mx-auto py-4">
                    <div class="flex flex-col space-y-8">
                        {/* <!-- First Row --> */}
                        <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
                            <div class="md:col-span-2 xl:col-span-3 bg-white p-6 rounded-2xl border border-gray-50">
                                <div class="flex flex-col space-y-6 md:h-full md:justify-between">
                                    <div class="flex justify-between">
                                        <span class="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                                            Account Information
                                        </span>
                                    </div>
                                    <div class="flex gap-2 md:gap-4 justify-between items-center">
                                        <div class="flex flex-col space-y-4">
                                            <div className="col-span-4">
                                                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                                    John Doe
                                                </h2>
                                                <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                                    <div class="mt-2 flex items-center text-sm text-gray-500">
                                                        {/* <!-- Heroicon name: solid/briefcase --> */}
                                                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
                                                        </svg>
                                                        Role: Admin
                                                    </div>
                                                    <div class="mt-2 flex items-center text-sm text-gray-500">
                                                        {/* <!-- Heroicon name: solid/location-marker --> */}
                                                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                                        </svg>
                                                        Malang
                                                    </div>
                                                    <div class="mt-2 flex items-center text-sm text-gray-500">
                                                        {/* <!-- Heroicon name: solid/calendar --> */}
                                                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                                        </svg>
                                                        Today: January 9, 2020
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex gap-2 md:gap-4">
                                        <Link to="/admin/profile"
                                            class="bg-blue-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-800">
                                            Go to settings
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-800 flex flex-col justify-between">
                                <div class="flex flex-col">
                                    <p class="text-white font-bold">Random Quotes</p>
                                    <p class="mt-1 text-xs md:text-sm text-gray-50 font-light leading-tight max-w-sm">
                                        {this.state.quotes} - {this.state.author}
                                    </p>
                                </div>
                                <div class="flex justify-between items-end">
                                    <a href="#"
                                        class="bg-blue-800 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                                        Learn More
                                    </a>
                                    <img src={calendar} alt="calendar" class="w-auto h-24 object-cover" />
                                </div>
                            </div>
                        </div>
                        {/* <!-- End First Row --> */}
                        {/* <!-- Start Second Row --> */}
                        <Statistic />
                        {/* <!-- End Second Row --> */}
                        {/* <!-- Start Third Row --> */}
                        <div class="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                            <div class="col-start-1 col-end-5">
                                <h2 class="text-xs md:text-sm text-gray-800 font-bold tracking-wide">Summary Transactions</h2>
                            </div>
                            <div class="col-span-2 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                                <Chart />
                            </div>
                            <div class="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                                <div class="flex justify-between items-center">
                                    <h2 class="text-sm text-gray-600 font-bold tracking-wide">Latest Transactions</h2>
                                    <Link to="/admin/transaction"
                                        class="px-4 py-2 text-xs bg-blue-100 text-blue-500 rounded uppercase tracking-wider font-semibold hover:bg-blue-300">More
                                    </Link>
                                </div>
                                <ul class="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                                    <li class="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                                        <p class="px-4 font-semibold">Senin, 7 Maret 2022</p>
                                        <p class="px-4 text-gray-600">Doni</p>
                                        <p class="px-4 tracking-wider">Admin: User</p>
                                        <p class="px-4 text-blue-600">Selesai</p>
                                        <p class="md:text-base text-gray-800 flex items-center gap-2">Rp12.000</p>
                                    </li>
                                    <li class="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                                        <p class="px-4 font-semibold">Senin, 7 Maret 2022</p>
                                        <p class="px-4 text-gray-600">Doni</p>
                                        <p class="px-4 tracking-wider">Admin: User</p>
                                        <p class="px-4 text-blue-600">Selesai</p>
                                        <p class="md:text-base text-gray-800 flex items-center gap-2">Rp12.000</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- End Third Row --> */}
                    </div>
                </main>
            </>
        )
    }
}