import React from "react"

import axios from 'axios';
import { Modal } from "../../../components"

export default class modal_address extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addAddress: false,
            modal_content: {
                modal_title: 'Choose Address',
                modal_subTitle: 'Pilih atau isi alamat anda',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            addressData: {
                address_name: '',
                address_detail: '',
            },

            token: localStorage.getItem('token_customer'),
            id_customer: localStorage.getItem('id_customer'),
            address_name: '',
            address_detail: '',
            telephone: '',
            notes: '',
            data: []
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmitChangeList = this.onSubmitChangeList.bind(this);
    }

    getDataAddress = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_address_customer/' + this.state.id_customer

        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data: result.data.data_address_customer
                })
            })
            .catch(error => console.log(error))
    }

    addAddress = () => {
        this.setState({
            addAddress: true,
            id_customer: this.state.id_customer,
            address_name: '',
            address_detail: '',
            telephone: '',
            notes: ''
        })
    }

    saveData = (ev) => {
        ev.preventDefault()

        let data = {
            id_customer: this.state.id_customer,
            address_name: this.state.address_name,
            address_detail: this.state.address_detail,
            telephone: this.state.telephone,
            notes: this.state.notes
        }

        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_address_customer'
        axios.post(url, data, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(response => {
                this.getDataAddress()
            })
            .catch(error => console.log(error))

        this.setState({
            addAddress: false
        })
    }

    // ambil value dari sessionStorage
    async getSessionValue() {
        if (sessionStorage.getItem("addressIndex")) {
            this.setState({
                addressData: {
                    address_name: this.state.data[sessionStorage.getItem("addressIndex")].address_name,
                    address_detail: this.state.data[sessionStorage.getItem("addressIndex")].address_detail,
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
            addressData: {
                address_name: this.state.data[this.state.selectedIndex].address_name,
                address_detail: this.state.data[this.state.selectedIndex].address_detail,
            }
        });
        sessionStorage.setItem("addressIndex", this.state.selectedIndex);
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    async componentDidMount()  {
        await this.getDataAddress()
        await this.getSessionValue()
    }

    render() {
        return (
            <>
                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2"
                    onClick={() => { this.toggleModal(true) }}>
                    <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
                    <span class="flex flex-col text-left pl-2">
                        <span class="title-font font-medium text-gray-900">{this.state.addressData.address_name || "Address"}</span>
                        <span class="text-gray-500 text-sm">{this.state.addressData.address_detail || "Isi dengan alamat anda"}</span>
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
                        <form method="POST" onSubmit={this.state.addAddress ? (ev) => this.saveData(ev) : (ev) => this.onSubmitChangeList(ev)}>
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    {this.state.addAddress ? (
                                        <>
                                            {/* Create new address */}
                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">Nama Penerima</label>
                                                <input type="text" name="nama_kelas" id="nama_kelas" autocomplete="nama_kelas"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Penerima'
                                                    onChange={ev => this.setState({ address_name: ev.target.value })}
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">Alamat</label>
                                                <input type="text" name="nama_kelas" id="nama_kelas" autocomplete="nama_kelas"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Alamat'
                                                    onChange={ev => this.setState({ address_detail: ev.target.value })}
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">No HP</label>
                                                <input type="number" name="nama_kelas" id="nama_kelas" autocomplete="nama_kelas"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='No HP'
                                                    onChange={ev => this.setState({ telephone: ev.target.value })}
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                                                <textarea
                                                    class="fmt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    onChange={ev => this.setState({ notes: ev.target.value })}
                                                    placeholder="Your notes">
                                                </textarea>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Address Already */}
                                            <div class="col-span-12 sm:col-span-12 w-full">
                                                {this.state.data.map((data, index) =>
                                                (
                                                    <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                                                        <label class="inline-flex items-center">
                                                            <input type="radio" class="form-radio mr-2" name="accountType"
                                                                value={index}
                                                                onChange={this.onValueChange} />
                                                            <div class="flex justify-between">
                                                                <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
                                                                <span class="flex flex-col text-left pl-2">
                                                                    <span class="title-font font-medium text-gray-900">{data.address_name}</span>
                                                                    <span class="text-gray-500 text-sm">{data.address_detail}</span>
                                                                </span>
                                                            </div>
                                                        </label>
                                                    </button>
                                                )
                                                )}
                                            </div>
                                            <div class="col-span-6 sm:col-span-6">
                                                <button
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    type="button"
                                                    onClick={() => this.addAddress()}>
                                                    Add Address
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                {this.state.addAddress ? (
                                    <>
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => this.setState({ addAddress: false })}>
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