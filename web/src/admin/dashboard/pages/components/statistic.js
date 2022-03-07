import React from "react"
import {Link} from "react-router-dom"

export default function Statistic() {
    return (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:p-0 gap-4 xl:gap-6">
            <div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between">
                <h2 class="text-xs md:text-sm text-gray-700 font-bold tracking-wide md:tracking-wider">
                    Statistic</h2>
                <Link to="/admin/statistic" class="text-xs text-gray-800 font-semibold uppercase">More</Link>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-50">
                <div class="flex justify-between items-start">
                    <div class="flex flex-col">
                        <p class="text-xs text-gray-600 tracking-wide">Total Transaksi</p>
                        <h3 class="mt-1 text-lg text-blue-500 font-bold">818</h3>
                        <span class="mt-4 text-xs text-gray-500">Last Updated 3 Hours ago</span>
                    </div>
                    <div class="bg-blue-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <svg class="w-auto h-8 md:h-6 xl:h-8 object-cover text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-50">
                <div class="flex justify-between items-start">
                    <div class="flex flex-col">
                        <p class="text-xs text-gray-600 tracking-wide">Total Outlet</p>
                        <h3 class="mt-1 text-lg text-green-500 font-bold">14</h3>
                        <span class="mt-4 text-xs text-gray-500">Last Updated 3 Days ago</span>
                    </div>
                    <div class="bg-green-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <svg class="w-auto h-8 md:h-6 xl:h-8 object-cover text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-50">
                <div class="flex justify-between items-start">
                    <div class="flex flex-col">
                        <p class="text-xs text-gray-600 tracking-wide">Total Member</p>
                        <h3 class="mt-1 text-lg text-yellow-500 font-bold">10</h3>
                        <span class="mt-4 text-xs text-gray-600">Last Updated 4 Days ago</span>
                    </div>
                    <div class="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <svg class="w-auto h-8 md:h-6 xl:h-8 object-cover text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-50">
                <div class="flex justify-between items-start">
                    <div class="flex flex-col">
                        <p class="text-xs text-gray-600 tracking-wide">Total Paket Laundry</p>
                        <h3 class="mt-1 text-lg text-indigo-500 font-bold">5</h3>
                        <span class="mt-4 text-xs text-gray-500">Last Updated 1 Month ago</span>
                    </div>
                    <div class="bg-indigo-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <svg class="w-auto h-8 md:h-6 xl:h-8 object-cover text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}