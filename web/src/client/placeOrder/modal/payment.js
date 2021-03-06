import React from "react"
import axios from 'axios';

import { Modal } from "../../../components"

export default class modal_payment extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addPayment: false,
            modal_content: {
                modal_title: 'Choose Payment Method',
                modal_subTitle: 'Pilih atau buat jenis pembayaran',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            paymentData: {
                payment_name: '',
                payment_bank_name: '',
                payment_number: ''
            },
            id_customer: localStorage.getItem('id_customer'),
            token: localStorage.getItem('token_customer'),
            data: [],
            payment_name: '',
            payment_number: '',
            payment_bank_name: '',
            notes: ''
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmitChangeList = this.onSubmitChangeList.bind(this);
        this.onSubmitAddData = this.onSubmitAddData.bind(this);
    }

    getDataPayment = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_payment_customer/' + this.state.id_customer

        await axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data: result.data.data_payment_customer
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    addPayment = () => {
        this.setState({
            addPayment: true
        })
        this.setState({
            action: 'add',
            id_customer: this.state.id_customer,
            payment_name: '',
            payment_number: '',
            payment_bank_name: '',
            notes: ''
        })
    }

    saveData = async (ev) => {
        ev.preventDefault()
        let data = {
            id_customer: this.state.id_customer,
            payment_name: this.state.payment_name,
            payment_number: this.state.payment_number,
            payment_bank_name: this.state.payment_bank_name,
            notes: this.state.notes
        }

        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_payment_customer'

        await axios.post(url, data, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.getDataPayment()
            })
            .catch(error => console.log(error))

        this.setState({
            addPayment: false
        })
    }

    // ambil value dari sessionStorage
    async getSessionValue() {
        if (sessionStorage.getItem("paymentIndex")) {
            this.setState({
                paymentData: {
                    payment_name: this.state.data[sessionStorage.getItem("paymentIndex")].payment_name,
                    payment_bank_name: this.state.data[sessionStorage.getItem("paymentIndex")].payment_bank_name,
                    payment_number: this.state.data[sessionStorage.getItem("paymentIndex")].payment_number,
                }
            });
        }
    }

    // ambil value dari data radio button
    onValueChange(event) {
        this.setState({
            selectedIndex: event.target.value
        });
    }

    // submit ke state
    onSubmitChangeList(event) {
        event.preventDefault();
        this.setState({
            paymentData: {
                payment_name: this.state.data[this.state.selectedIndex].payment_name,
                payment_bank_name: this.state.data[this.state.selectedIndex].payment_bank_name,
                payment_number: this.state.data[this.state.selectedIndex].payment_number,
            }
        });
        sessionStorage.setItem("paymentIndex", this.state.selectedIndex);
        window.location.reload();
    }

    onSubmitAddData(event) {
        event.preventDefault();
        this.setState({ addPayment: false });
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    async componentDidMount() {
        await this.getDataPayment()
        await this.getSessionValue()
    }
    render() {
        return (
            <>
                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2"
                    onClick={() => { this.toggleModal(true) }}>
                    <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    <span class="flex flex-col text-left pl-2">
                        <span class="title-font font-medium text-gray-900">{this.state.paymentData.payment_name || "Add Payment"}</span>
                        <span class="text-gray-500 text-sm">{this.state.paymentData.payment_bank_name || "Pilih cara pembayaran anda"}: {this.state.paymentData.payment_number}</span>
                    </span>
                </button>
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
                        <form onSubmit={this.state.addPayment ? (ev) => this.saveData(ev) : (ev) => this.onSubmitChangeList(ev)}>
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    {this.state.addPayment ? (
                                        <>
                                            {/* Create new Payment */}
                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_rekening" class="block text-sm font-medium text-gray-700">Nama Rekening</label>
                                                <input type="text" name="nama_rekening" id="nama_rekening" autocomplete="nama_rekening"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(ev) => this.setState({payment_name: ev.target.value})}
                                                    value={this.state.payment_name}
                                                    placeholder='Nama Rekening'
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_bank" class="block text-sm font-medium text-gray-700">Bank</label>
                                                <input type="text" name="nama_bank" id="nama_bank" autocomplete="nama_bank"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(ev) => this.setState({payment_bank_name: ev.target.value})}
                                                    value={this.state.payment_bank_name}
                                                    placeholder='Nama Bank'
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="no_rek" class="block text-sm font-medium text-gray-700">No. Rekening</label>
                                                <input type="number" name="no_rek" id="no_rek" autocomplete="no_rek"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(ev) => this.setState({payment_number: ev.target.value})}
                                                    value={this.state.payment_number}
                                                    placeholder='048xxxxx'
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                                                <textarea
                                                    class="fmt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    onChange={(ev) => this.setState({notes: ev.target.value})}
                                                    value={this.state.notes}
                                                    placeholder="Your notes">
                                                </textarea>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Address Already */}
                                            <div class="col-span-12 sm:col-span-12 w-full">
                                                {this.state.data.map((data, index) => (
                                                    <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                                                        <label class="inline-flex items-center">
                                                            <input type="radio" class="form-radio mr-2" name="accountType"
                                                                value={index}
                                                                onChange={this.onValueChange} />
                                                            <div class="flex justify-between">
                                                                <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                                <span class="flex flex-col text-left pl-2">
                                                                    <span class="title-font font-medium text-gray-900">{data.payment_name}</span>
                                                                    <span class="text-gray-500 text-sm">{data.payment_bank_name}: {data.payment_number}</span>
                                                                </span>
                                                            </div>
                                                        </label>
                                                    </button>
                                                ))}
                                            </div>
                                            <div class="col-span-6 sm:col-span-6">
                                                <button
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    type="button"
                                                    onClick={(ev) => this.addPayment(ev)}>
                                                    Add Payment
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                {this.state.addPayment ? (
                                    <>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => this.setState({ addPayment: false })}>
                                            Cancel
                                        </button>
                                        <button
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            type="submit">
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>

                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => this.toggleModal(false)}>
                                            Close
                                        </button>
                                        <button
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            type="submit"
                                            onClick={() => this.toggleModal(false)}>
                                            Save
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </Modal >
            </>
        )
    }
}