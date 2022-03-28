import React from "react";
import axios from 'axios';

import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

import { Footer } from "../../components";
import promo from '../../assets/image/promo_imlek.png';
import freespace from '../../assets/image/ads_freespace.png';


export default class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            token: localStorage.getItem('token_customer'),
            id_customer: localStorage.getItem('id_customer'),
            name_customer: localStorage.getItem('name_customer'),
            data: [],
            isFound: false
        }
        // cek token dari localstorage
        if (!localStorage.getItem("token_customer")) {
            window.location = "/login"
        }
    }

    getDataTransaction = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_transaction/' +  this.state.id_customer
        
        await axios.get(url,{
            headers:{ 
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(result => {
            this.setState({
                isFound: result.data.found
            })

            if(this.state.isFound){
                this.setState({
                    data: result.data.data_transaction
                })
            } else {
                this.Alert('warning', 'Belum ada transaksi')
            }
        })
        .catch(error => {
            this.Alert('error', error.message)
        })
    }

    Alert = (kind, message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
        })

        Toast.fire({
            icon: kind,
            title: message
        })
    }

    today = () => {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const current = new Date();
        const date = `${weekday[current.getUTCDay()]}, ${current.getDate()} ${month[current.getUTCMonth()]} ${current.getFullYear()}`;
        return date
    }

    goToInvoice = (dataInvoice) => {
        window.location = `/order/${dataInvoice}`;
    }

    componentDidMount() { 
        this.today();
        this.getDataTransaction();
     }

    render() {
        return (
            <>
                <div className="container mx-auto">
                    <div className="lg:grid lg:grid-cols-5 grid-cols-none gap-3 mt-5 flex items-center justify-between">
                        <div className="col-span-4">
                            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                {this.state.name_customer.charAt(0).toUpperCase() + this.state.name_customer.slice(1)}
                            </h2>
                            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                <div class="mt-2 flex items-center text-sm text-gray-500">
                                    {/* <!-- Heroicon name: solid/briefcase --> */}
                                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
                                    </svg>
                                    Since: 2022
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
                                    Today: {this.today()}
                                </div>
                            </div>
                        </div>
                        <div className="border">
                            <Link to="/order">
                                <button type="button" class="w-full inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-bold font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    {/* <!-- Heroicon name: solid/check --> */}
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    Make Order
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-5 my-10">
                        <div class="xl:col-span-1 col-span-5">
                            <div className="m-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-800">
                                <div class="flex flex-col">
                                    <p class="text-white font-bold text-2xl">Promo Imlek</p>
                                    <p class="mt-1 text-xs md:text-sm text-gray-50 font-light leading-tight max-w-sm">
                                        Spesial Imlek potongan 20%
                                    </p>
                                </div>
                                <div class="flex justify-between items-center mt-3">
                                    <a href="#"
                                        class="bg-blue-800 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                                        Learn More
                                    </a>
                                    <img src={promo} alt="calendar" class="w-auto h-24 object-cover" />
                                </div>
                            </div>
                            <div className="m-4 p-6 rounded-2xl bg-gradient-to-r from-green-500 to-green-800">
                                <div class="flex flex-col">
                                    <p class="text-white font-bold text-2xl">Free Space</p>
                                    <p class="mt-1 text-xs md:text-sm text-gray-50 font-light leading-tight max-w-sm">
                                        Ads your product here
                                    </p>
                                </div>
                                <div class="flex justify-between items-center mt-3">
                                    <a href="#"
                                        class="bg-green-800 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-green-600 hover:text-white">
                                        Learn More
                                    </a>
                                    <img src={freespace} alt="calendar" class="w-auto h-24 object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-3 col-span-5">
                            <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900 pb-3">Riwayat Transaksi</h1>
                            <div class="flex flex-col">
                                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table class="min-w-full divide-y divide-gray-200">
                                                <thead class="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            No
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Invoice
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Date
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Payment
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                    {this.state.data.map((data, index) => (
                                                        <tr>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    {++index}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    <button className="hover:underline inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 "
                                                                        onClick={() => this.goToInvoice(data.invoice_code)}>
                                                                        {data.invoice_code.toUpperCase()}
                                                                        <svg class="ml-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    Pickup: {data.pickup_date} <br></br>
                                                                    Dropoff: {data.drop_date}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    <label class="inline-flex relative items-center w-full text-sm font-medium focus:z-10 focus:ring-2">
                                                                        <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                                        <span class="flex flex-col text-left pl-2">
                                                                            <span class="title-font font-medium text-gray-900">{data.data_payment_customer.payment_name.toUpperCase()}</span>
                                                                            <span class="text-gray-500 text-sm">{data.data_payment_customer.payment_bank_name.toUpperCase()}: {data.data_payment_customer.payment_number}</span>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {data.status ? (
                                                                    <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Selesai</span>
                                                                ) : (
                                                                    <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Proses</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}