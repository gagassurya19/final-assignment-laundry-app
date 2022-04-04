import React from "react";
import { Modal } from "../../../components";

import axios from "axios";
import Swal from "sweetalert2";

export default class Transaction extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addAddress: true,
            modal_content: {
                modal_title: 'Tambah Transaksi',
                modal_subTitle: 'Ini subtitle',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            token: localStorage.getItem('token_admin'),
            data_transaction: [],
            data_package: [],
            data_outlet: [],
            id_transaction: '',
            id_package: '',
            id_outlet: '',
            pickup_date: '',
            drop_date: '',
            pickup_time: '',
            drop_time: '',
            status: 0
        }
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    goToInvoice = (dataInvoice) => {
        window.location = `/order/${dataInvoice}`;
    }

    // edit data
    editData = async (selectedItem) => {
        this.toggleModal(true)
        this.setState({
            action: 'edit',
            id_transaction: selectedItem.id_transaction,
            id_package: selectedItem.id_package,
            id_outlet: selectedItem.id_outlet,
            pickup_date: selectedItem.pickup_date,
            drop_date: selectedItem.drop_date,
            pickup_time: selectedItem.pickup_time,
            drop_time: selectedItem.drop_time,
            status: selectedItem.status
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

    // save put/post data
    saveData = async (ev) => {
        ev.preventDefault()

        let data = {
            id_package: this.state.package,
            id_outlet: this.state.outlet,
            pickup_date: this.state.pickup_date,
            drop_date: this.state.drop_date,
            pickup_time: this.state.pickup_time,
            drop_time: this.state.drop_time,
            status: this.state.status,
        }

        const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_transaction/' + this.state.id_transaction

        axios.put(url, data, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.getDataAll()
                this.Alert('success', 'Data berhasil diubah');
            })
            .catch(error => this.Alert('error', 'Data gagal diubah. \n' + error.message))

        this.toggleModal(false)
    }

    // delete data transaction
    deleteData = (selectedItem) => {
        const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_transaction/' + selectedItem.id_transaction

        const sweetAlertTailwindButton = Swal.mixin({
            customClass: {
                confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-3 rounded',
                cancelButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-3 rounded'
            },
            buttonsStyling: false
        })

        sweetAlertTailwindButton.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url, {
                    headers: {
                        Authorization: "Bearer " + this.state.token
                    }
                })
                    .then(response => {
                        if (response.data.isSuccess) {
                            this.getDataAll()
                            sweetAlertTailwindButton.fire(
                                'Deleted!',
                                'Your data has been deleted.',
                                'success'
                            )
                        } else {
                            sweetAlertTailwindButton.fire(
                                'Failed!',
                                response.data.message,
                                'error'
                            )
                        }
                    })
                    .catch(error => {
                        sweetAlertTailwindButton.fire(
                            'Error!',
                            error.message,
                            'errors'
                        )
                    })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                sweetAlertTailwindButton.fire(
                    'Cancelled',
                    'Your data is safe :)',
                    'error'
                )
            }
        })
    }

    // get transaction data
    getDataAll = async () => {
        const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_transaction'
        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data_transaction: result.data.data_transaction
                })
            })
            .catch(error => {
                this.Alert('error', error.message)
            })

        // ============================================================
        // get package data
        const url_package = process.env.REACT_APP_ADMIN_API_URL + 'admin_package'
        await axios.get(url_package, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data_package: result.data.data_package
                })
            })
            .catch(error => {
                this.Alert('error', error.message)
            })

        // ============================================================
        // get outlet data
        const url_outlet = process.env.REACT_APP_ADMIN_API_URL + 'admin_outlet'
        await axios.get(url_outlet, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data_outlet: result.data.data_outlet
                })
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

    async componentDidMount() {
        await this.getDataAll()
    }

    render() {
        return (
            <>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-10">
                        <div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between py-7">
                            <div>
                                <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Transaction Management</h1>
                                <p class="leading-relaxed text-gray-500">Panel management transaksi/pesanan</p>
                            </div>
                            {/* <div>
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={(ev) => { this.addData(ev) }}>
                                    Add new data
                                </button>
                            </div> */}
                        </div>
                        <div className="xl:col-span-3 col-span-5">
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
                                                            Details
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
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Option
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                    {this.state.data_transaction.map((data, i) => (
                                                        <tr>
                                                            <td class="px-6 py-2 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    {++i}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-2 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    <button className="hover:underline inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 "
                                                                        onClick={() => this.goToInvoice(data.invoice_code)}>
                                                                        {data.invoice_code}
                                                                        <svg class="ml-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                                                        </svg>
                                                                    </button>
                                                                    <br />
                                                                    {data.data_package.name}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-2 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    Customer: {data.data_customer.first_name} <br />
                                                                    Admin: {data.data_outlet.data_administrator.first_name} <br />
                                                                    Outlet: {data.data_outlet.outlet_name}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-2 whitespace-nowrap">
                                                                <div class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                                                                    Pickup: <br />{data.pickup_date} {data.pickup_time}
                                                                </div>
                                                                <div class="mt-1 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                                                                    Dropoff: <br />{data.drop_date} {data.drop_time}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-2 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    <label class="inline-flex relative items-center w-full text-sm font-medium focus:z-10 focus:ring-2">
                                                                        <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                                        <span class="flex flex-col text-left pl-2">
                                                                            <span class="title-font font-medium text-gray-900">{data.data_payment_customer.payment_name}</span>
                                                                            <span class="text-gray-500 text-sm">{data.data_payment_customer.payment_bank_name}</span>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-2 whitespace-nowrap">
                                                                {data.status ? (
                                                                    <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Selesai</span>
                                                                ) : (
                                                                    <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Proses</span>
                                                                )}
                                                            </td>
                                                            <td class="px-6 py-2 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    <div className="inline-flex relative items-center gap-2">
                                                                        <button type="button" onClick={() => this.deleteData(data)}>
                                                                            <svg class="w-6 h-6 text-red-500 hover:text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                                                        </button>
                                                                        <button type="button" onClick={() => this.editData(data)}>
                                                                            <svg class="w-6 h-6 text-indigo-500 hover:text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
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
                </div>

                {/* modal */}
                <Modal modal={this.state.modal}>
                    {/* notes */}
                    <div>
                        <h3 class="text-lg font-medium leading-6 text-gray-900">{this.state.modal_content.modal_title}</h3>
                        <p class="mb-8 leading-relaxed text-gray-500">{this.state.modal_content.modal_subTitle}</p>
                        <p class="mt-1 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: this.state.modal_content.modal_desc }}></p>

                    </div>
                    {/* Form */}
                    <div>
                        <form onSubmit={ev => this.saveData(ev)}>
                            <div class="px-4 py-5 bg-white sm:p-6">

                                <div class="px-4 py-5 sm:p-6">
                                    <div class="grid grid-cols-6 gap-6">

                                        <div class="col-span-6 sm:col-span-6">
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">Paket</label>
                                            <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                value={this.state.package} onChange={ev => this.setState({ package: ev.target.value })}>
                                                <optgroup label="Select Role:">
                                                    {this.state.data_package.map(item => {
                                                        return (
                                                            <option value={item.id_package}>{item.name}</option>
                                                        )
                                                    })}
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div class="col-span-6 sm:col-span-6">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Outlet</label>
                                            <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                value={this.state.outlet} onChange={ev => this.setState({ outlet: ev.target.value })}>
                                                <optgroup label="Select Role:">
                                                    {this.state.data_outlet.map(item => {
                                                        return (
                                                            <option value={item.id_outlet}>{item.outlet_name}</option>
                                                        )
                                                    })}
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="country" class="block text-sm font-medium text-gray-700">Pick Up Date</label>
                                            <input type="date" name="pickup-date" id="pickup-date" autocomplete="pickup-date" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ pickup_date: ev.target.value })}
                                                value={this.state.pickup_date} />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="country" class="block text-sm font-medium text-gray-700">Pick Up Time</label>
                                            <input type="time" name="pickup-time" id="pickup-time" autocomplete="pickup-time" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ pickup_time: ev.target.value })}
                                                value={this.state.pickup_time} />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="country" class="block text-sm font-medium text-gray-700">Drop Off Date</label>
                                            <input type="date" name="drop-date" id="drop-date" autocomplete="drop-date" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ drop_date: ev.target.value })}
                                                value={this.state.drop_date} />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="country" class="block text-sm font-medium text-gray-700">Drop Off Time</label>
                                            <input type="time" name="drop-time" id="drop-time" autocomplete="drop-time" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ drop_time: ev.target.value })}
                                                value={this.state.drop_time} />
                                        </div>

                                        <div className="col-span-6">
                                            <label for="country" class="block text-sm font-medium text-gray-700">Transaction status</label>
                                            <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                value={this.state.status} onChange={ev => this.setState({ status: ev.target.value })}>
                                                <optgroup label="Select Role:">
                                                    <option value="0">Proses</option>
                                                    <option value="1">Selesai</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <>
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => this.toggleModal(false)}>
                                        Close
                                    </button>
                                    <button
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        type="submit">
                                        Save
                                    </button>
                                </>
                            </div>
                        </form>
                    </div>
                </Modal >
            </>
        )
    }
}