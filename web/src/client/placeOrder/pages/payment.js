import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Modal_payment from '../modal/payment';
import { Timeline, Footer } from '../../../components';

import Swal from 'sweetalert2';

export default class Payment extends React.Component {
    constructor() {
        super()
        this.state = {
            isSuccess: false,
            paylater: false,
            dataSessionTransaction: {
                id_address_customer: this.addSession('addressIndex'),
                id_package: this.addSession('packageIndex'),
                id_outlet: this.addSession('outletIndex'),
                id_payment: this.addSession('paymentIndex'),
                pickup_date: this.addSession('pickup_date'),
                pickup_time: this.addSession('pickup_time'),
                drop_date: this.addSession('drop_date'),
                drop_time: this.addSession('drop_time'),
                laundry_notes: this.addSession('laundryNotes'),
                driver_notes: this.addSession('driverNotes'),
            },
            data_picked: {
                payment_index: sessionStorage.getItem('paymentIndex'),
                package_index: sessionStorage.getItem('packageIndex'),
                outlet_index: sessionStorage.getItem('outletIndex'),
                address_index: sessionStorage.getItem('addressIndex'),
                pickup_date: sessionStorage.getItem('pickup_date'),
                pickup_time: sessionStorage.getItem('pickup_time'),
                drop_date: sessionStorage.getItem('drop_date'),
                drop_time: sessionStorage.getItem('drop_time'),
                notes_laundry: sessionStorage.getItem('laundryNotes'),
                notes_driver: sessionStorage.getItem('driverNotes'),
            },
            token: localStorage.getItem('token_customer'),
            id_customer: localStorage.getItem('id_customer'),
            id_administrator: 0,
            id_address: 0,
            id_outlet: 0,
            id_package: 0,
            id_payment: 0,
            invoice_code: '',
            status: 0
        }
        // cek token dari localstorage
        if (!localStorage.getItem("token_customer")) {
            window.location = "/login"
        }

        if (this.state.data_picked.address_index &&
            this.state.data_picked.package_index &&
            this.state.data_picked.outlet_index &&
            this.state.data_picked.pickup_date &&
            this.state.data_picked.pickup_time &&
            this.state.data_picked.drop_date &&
            this.state.data_picked.drop_time) {
        } else {
            window.location = '/order/pick_drop';
        }
    }

    addSession = (item) => {
        return sessionStorage.getItem(item)
    }

    // get data address
    getDataAddress = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_address_customer/' + this.state.id_customer

        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    id_address: result.data.data_address_customer[this.state.data_picked.address_index].id_address_customer
                })
            })
            .catch(error => console.log(error))
    }

    // get data outlet
    getDataOutlet = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_outlet'

        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    id_outlet: result.data.data_outlet[this.state.data_picked.outlet_index].id_outlet,
                    id_administrator: result.data.data_outlet[this.state.data_picked.outlet_index].id_administrator
                })
            })
            .catch(error => console.log(error))
    }

    // get data package 
    getDataPackage = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_package'

        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    id_package: result.data.data_package[this.state.data_picked.package_index].id_package
                })
            })
            .catch(error => console.log(error))
    }

    // get data payment
    getDataPayment = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_payment_customer/' + this.state.id_customer

        await axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    id_payment: result.data.data_payment_customer[this.state.data_picked.payment_index].id_payment_customer
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // generate invoice code
    async generateInvoiceCode(count) {
        let defaultNumber = 4413277523420
        let convertToArray = defaultNumber.toString().split("")
        let sliceNumber = convertToArray.slice(0, count)
        let randomNumber = Math.floor((Math.random() * +sliceNumber.join("")));

        if (randomNumber.toString().split("").length < count) {
            randomNumber = Math.abs(randomNumber - +sliceNumber.join(""))
        }

        const invoice = 'INV' + this.state.id_customer + this.state.id_administrator + randomNumber

        this.setState({
            invoice_code: invoice
        })
    }

    // make transaction
    makeTransaction = async () => {
        await this.generateInvoiceCode()
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_transaction'

        let data = {
            id_customer: this.state.id_customer,
            id_administrator: this.state.id_administrator,
            id_address_customer: this.state.id_address,
            id_package: this.state.id_package,
            id_outlet: this.state.id_outlet,
            id_payment_customer: this.state.id_payment,
            invoice_code: this.state.invoice_code,
            pickup_date: this.state.data_picked.pickup_date,
            drop_date: this.state.data_picked.drop_date,
            pickup_time:  this.state.data_picked.pickup_time,
            drop_time: this.state.data_picked.drop_time,
            notes_laundry: this.state.data_picked.notes_laundry,
            notes_driver: this.state.data_picked.notes_driver,
            status: this.state.status,
        }

        await axios.post(url, data, {
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(result => {
                if(result.data.isSuccess){
                    this.Alert('success', 'Transaction Success')
                    this.setState({
                        isSuccess: true
                    })
                } else {
                    this.Alert('error', result.message)
                    this.setState({
                        isSuccess: false
                    })
                }
            })
            .catch(err => {
                this.Alert('error', err.message)
                this.setState({
                    isSuccess: false
                })
            })
    }

    submitTransaction = async (ev) => {
        ev.preventDefault();
        if (sessionStorage.getItem('paymentIndex') === null) {
            this.Alert('warning', 'Please complete the data payment')
        } else {
            await this.makeTransaction()
            window.sessionStorage.clear();
            window.sessionStorage.setItem('invoice', this.state.invoice_code);
            if(this.state.isSuccess){
                setTimeout(() => {
                    window.location = `/order/done/`;
                }, 1600);
            }
        }
    }

    Alert(kind, description){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: kind,
            title: description
        })
    }

    async componentDidMount() {
        await this.getDataAddress();
        await this.getDataOutlet();
        await this.getDataPackage();
        await this.getDataPayment();
    }

    render() {
        return (
            <>
                <div className="container mx-auto">
                    <Timeline page="3" />
                    <div className="mx-5 my-6 p-5 rounded">
                        <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Order Payment Method</h1>
                        <p class="mb-11 leading-relaxed text-gray-500">It's time to pay your bill :)</p>
                        <div class="w-full my-5">
                            <Modal_payment />
                        </div>
                        <div class="grid grid-rows-1 grid-flow-col gap-4 p-3">
                            <Link to="/order/instruction" className='mx-1'>
                                <button class="flex justify-center font-bold bg-gray-100 border-0 focus:outline-none hover:bg-gray-200 rounded text-base w-full p-2">
                                    {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg> */}
                                    Back
                                </button>
                            </Link>
                            {this.state.paylater ? (
                                <Link to="/order/done" className='mx-1'>
                                    <button class="flex justify-center font-bold text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded text-base w-full p-2">
                                        {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                        Pay later & Save
                                    </button>
                                </Link>
                            ) : (
                                <div className='mx-1'>
                                    <button class="flex justify-center font-bold text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded text-base w-full p-2"
                                        onClick={ev => this.submitTransaction(ev)}>
                                        {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                        Pay & Save
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}