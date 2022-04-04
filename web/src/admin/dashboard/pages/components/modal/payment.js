import React from "react"
import axios from "axios";
import { Modal } from "../../../../../components";
import ComPayment from './components_nested/com_payment';

export default class modal_payment extends React.Component {

    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addPayment: false,
            modal_content: {
                modal_title: 'Payment',
                modal_subTitle: 'Jenis pembayaran',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            token: localStorage.getItem('token_admin'),
            data_payment_customer_total: null,
        }
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    // get data payment customer total
    getDataPayment = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_payment_customer/' + this.state.id_customer

        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data_payment_customer_total: result.data.data_payment_customer.length
                })
            })
            .catch(error => console.log(error))
    }

    async componentDidMount() {
        await this.setState({
            id_customer: this.props.id_customer
        })
        await this.getDataPayment()
    }

    render() {
        return (
            <>
                <button type="button" class="inline-flex relative items-center w-full text-sm font-medium p-2 rounded hover:bg-gray-100 focus:z-10 focus:ring-2"
                    onClick={() => { this.toggleModal(true) }}>
                    <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    <span class="flex flex-col text-left pl-2">
                        <span class="title-font font-medium text-gray-900">Payment</span>
                        <span class="text-gray-500 text-sm">Total: {this.state.data_payment_customer_total}</span>
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
                            <ComPayment id_customer={this.props.id_customer}/>
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