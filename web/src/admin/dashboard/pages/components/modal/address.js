import React from "react"
import axios from "axios";

import { Modal } from "../../../../../components";
import ComAddress from "./components_nested/com_address";

export default class modal_address extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addAddress: false,
            modal_content: {
                modal_title: 'Address',
                modal_subTitle: 'Pilih atau isi alamat anda',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            token: localStorage.getItem("token_admin"),
        }
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    // get total data address
    getDataAddress = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_address_customer/' + this.state.id_customer

        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data_address_customer_total: result.data.data_address_customer.length
                })
            })
            .catch(error => console.log(error))
    }

    async componentDidMount() {
        await this.setState({
            id_customer: this.props.id_customer
        })
        await this.getDataAddress()
    }

    render() {
        return (
            <>
                <button type="button" class="inline-flex relative items-center p-2 rounded w-full text-sm font-medium hover:bg-gray-100 focus:z-10 focus:ring-2"
                    onClick={() => { this.toggleModal(true) }}>
                    <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
                    <span class="flex flex-col text-left pl-2">
                        <span class="title-font font-medium text-gray-900">Address</span>
                        <span class="text-gray-500 text-sm">Total: {this.state.data_address_customer_total}</span>
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
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <ComAddress id_customer={this.props.id_customer}/>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => this.toggleModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </Modal >
            </>
        )
    }
}