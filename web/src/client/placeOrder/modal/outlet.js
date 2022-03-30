import React from "react"
import axios from 'axios';

import { Modal } from "../../../components"

export default class modal_Outlet extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            modal_content: {
                modal_title: 'Choose Outlet',
                modal_subTitle: 'Pilih outlet anda',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            outletData: {
                outlet_name: '',
                telephone: ''
            },
            token: localStorage.getItem('token_customer'),
            id_customer: localStorage.getItem('id_customer'),
            data: [],
            isLoading: true
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmitChangeList = this.onSubmitChangeList.bind(this);
    }

    getDataOutlet = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_outlet'

        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data: result.data.data_outlet
                })
            })
            .catch(error => console.log(error))
    }

    // ambil value dari sessionStorage
    async getSessionValue() {
        if (sessionStorage.getItem("outletIndex")) {
            this.setState({
                outletData: {
                    outlet_name: this.state.data[sessionStorage.getItem("outletIndex")].outlet_name,
                    telephone: this.state.data[sessionStorage.getItem("outletIndex")].telephone,
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
            outletData: {
                outlet_name: this.state.data[this.state.selectedIndex].outlet_name,
                telephone: this.state.data[this.state.selectedIndex].telephone
            }
        });
        sessionStorage.setItem("outletIndex", this.state.selectedIndex);
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    async componentDidMount() {
        await this.getDataOutlet()
        await this.getSessionValue()
    }

    render() {
        return (
            <>
                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2"
                    onClick={() => { this.toggleModal(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="flex flex-col text-left pl-2">
                        {this.state.outletData.outlet_name ? (
                            <>
                                <span class="title-font font-medium text-gray-900">{this.state.outletData.outlet_name}</span>
                                <span class="text-gray-500 text-sm">{this.state.outletData.telephone}</span>
                            </>
                        ) : (
                            <>
                                <span class="title-font font-medium text-gray-900">Outlet</span>
                                <span class="text-gray-500 text-sm">Isi dengan outlet yang di inginkan</span>
                            </>
                        )}
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
                        <form method="POST" onSubmit={this.onSubmitChangeList}>
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-12 sm:col-span-12 w-full">
                                        {this.state.data.map((data, index) => (
                                            <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                                                <label class="inline-flex items-center">
                                                    <input type="radio" class="form-radio mr-2" name="accountType"
                                                        value={index}
                                                        onChange={this.onValueChange} />
                                                    <div class="flex justify-between">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span class="flex flex-col text-left pl-2">
                                                            <span class="title-font font-medium text-gray-900">{data.outlet_name}</span>
                                                            <span class="text-gray-500 text-sm">{data.telephone}</span>
                                                        </span>
                                                    </div>
                                                </label>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
                            </div>
                        </form>
                    </div>
                </Modal >
            </>
        )
    }
}