import React, { Component } from 'react'

import axios from 'axios';

import $ from 'jquery';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Link, useParams, useNavigate } from 'react-router-dom';
import { Footer } from '../../../components';

import Swal from 'sweetalert2'

export default function InvoiceDefault() {
    return (
        <Invoice params={useParams()} />
    )
}

export class Invoice extends Component {
    constructor() {
        super();
        this.state = {
            id_customer: localStorage.getItem('id_customer'),
            token: localStorage.getItem('token_customer') || localStorage.getItem('token_admin'),
            invoice_code: null,
            data_invoice: {},
            data_outlet: {},
            data_customer: {},
            data_administrator: {},
            data_package: {},
            data_address_customer: {},
            data_payment_customer: {},
            isFound: false,
        }
        // cek token dari localstorage
        if (!localStorage.getItem("token_customer") && !localStorage.getItem("token_admin")) {
            window.location = "/login"
        }
    }

    getInvoiceCode = async () => {
        const invoice_code = await this.props.params.invoice
        this.setState({
            invoice_code: invoice_code
        })
    }

    // get data transaksi by invoice_code
    getDataInvoice = async () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_invoice/' + this.state.invoice_code;

        await axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    isFound: true,
                    data_invoice: result.data.data_invoice[0],
                    data_outlet: result.data.data_invoice[0].data_outlet,
                    data_customer: result.data.data_invoice[0].data_customer,
                    data_administrator: result.data.data_invoice[0].data_administrator,
                    data_package: result.data.data_invoice[0].data_package,
                    data_address_customer: result.data.data_invoice[0].data_address_customer,
                    data_payment_customer: result.data.data_invoice[0].data_payment_customer,
                })
            })
            .catch(err => {
                const sweetAlertTailwindButton = Swal.mixin({
                    customClass: {
                        confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-3 rounded',
                        cancelButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-3 rounded'
                    },
                    buttonsStyling: false
                })

                sweetAlertTailwindButton.fire({
                    title: 'Data not found',
                    text: 'Code Invoice tidak ditemukan.',
                    icon: 'error',
                    confirmButtonText: 'Back!',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.history.back();
                    }
                })
                console.log(err);
            })
    }

    getPDF = (ev) => {
        ev.preventDefault();
        var HTML_Width = $("article").width();
        var HTML_Height = $("article").height();
        var top_left_margin = 15;
        var PDF_Width = HTML_Width + (top_left_margin * 2);
        var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
        var canvas_image_width = HTML_Width;
        var canvas_image_height = HTML_Height;
        var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
        const fromState = this.state.invoice_code;

        html2canvas($("article")[0], { allowTaint: true }).then(function (canvas) {
            canvas.getContext('2d');
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
            pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
            for (var i = 1; i <= totalPDFPages; i++) {
                pdf.addPage(PDF_Width, PDF_Height);
                pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
            }
            pdf.save(`Laundryku-${fromState}.pdf`);
        });
    };

    async componentDidMount() {
        await this.getInvoiceCode();
        await this.getDataInvoice();
    }

    render() {
        return (
            <section class="bg-gray-100">
                <div className="container mx-auto">
                    {this.state.isFound ? (
                        <>
                            <div class=" mx-auto py-10 md:py-16">
                                <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Order Success</h1>
                                <p class="mb-11 leading-relaxed text-gray-500">This is your invoices {this.state.invoice_code}</p>
                                <article class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
                                    <div class="md:rounded-b-md  bg-white">
                                        <div class="p-9 border-b border-gray-200">
                                            <div class="space-y-6">
                                                <div class="flex justify-between items-top">
                                                    <div class="space-y-4">
                                                        <div>
                                                            <div className="mb-5 flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                                                <div className="flex-shrink-0 flex items-center title-font font-medium text-gray-900">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="hidden lg:block h-10 w-auto text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                                                    </svg>
                                                                    <Link to="/">
                                                                        <span class="ml-3 text-xl hidden sm:block">Laundryku</span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <p class="font-bold text-lg"> Invoice </p>
                                                            <p class="font-medium text-sm text-gray-400"> Outlet Branch </p>
                                                            <p> {this.state.data_outlet.outlet_name} </p>
                                                        </div>
                                                        <div>
                                                            <p class="font-medium text-sm text-gray-400"> Billed To </p>
                                                            <p> {this.state.data_customer.first_name + " " + this.state.data_customer.last_name} </p>
                                                            <p> {this.state.data_customer.email} </p>
                                                            <p> (+62){this.state.data_customer.telephone} </p>
                                                        </div>
                                                    </div>
                                                    <div class="space-y-2">
                                                        <div>
                                                            <p class="font-medium text-sm text-gray-400"> Invoice Number </p>
                                                            <p> {this.state.invoice_code} </p>
                                                        </div>
                                                        <div>
                                                            <p class="font-medium text-sm text-gray-400"> Invoice Date </p>
                                                            <p> {this.state.data_invoice.pickup_date} </p>
                                                        </div>
                                                        <div>
                                                            <a href="#generate-invoice-pdf" target="_blank" class="inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 "
                                                                onClick={ev => this.getPDF(ev)}> Download PDF <svg class="ml-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="p-9 border-b border-gray-200 p-y-2">
                                            <div>
                                                <p class="font-medium text-sm text-gray-400"> Laundry Note </p>
                                                <p class="text-sm"> {this.state.data_invoice.notes_laundry || "Tidak ada catatan untuk Laundry"} </p>
                                            </div>
                                            <div className='mt-3'>
                                                <p class="font-medium text-sm text-gray-400"> Driver Note </p>
                                                <p class="text-sm"> {this.state.data_invoice.notes_driver || "Tidak ada catatan untuk Driver"} </p>
                                            </div>
                                        </div>
                                        <table class="w-full divide-y divide-gray-200 text-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="px-9 py-4 text-left font-semibold text-gray-400"> Item </th>
                                                    <th scope="col" class="py-3 text-left font-semibold text-gray-400">  </th>
                                                    <th scope="col" class="py-3 text-left font-semibold text-gray-400"> Status </th>
                                                    <th scope="col" class="py-3 text-left font-semibold text-gray-400"> Dates </th>
                                                    <th scope="col" class="py-3 text-left font-semibold text-gray-400"> Amount </th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200">
                                                <tr>
                                                    <td class="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                                                        <div>
                                                            <p> {this.state.data_package.name} </p>
                                                            <p class="text-sm text-gray-400"> ID: {this.state.data_package.id_package} </p>
                                                        </div>
                                                    </td>
                                                    <td class="whitespace-nowrap text-gray-600 truncate">  </td>
                                                    <td class="whitespace-nowrap text-gray-600 truncate">
                                                        {this.state.data_invoice.status ? (
                                                            <>
                                                                <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Selesai</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Diproses</span>
                                                            </>
                                                        )}
                                                    </td>
                                                    <td class="whitespace-nowrap space-x-1 flex items-center">
                                                        <div class="text-sm text-gray-900">
                                                            <div class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                                                                Pickup: {this.state.data_invoice.pickup_date} {this.state.data_invoice.pickup_time}
                                                            </div>
                                                            <div class="mt-1 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                                                                Dropoff: {this.state.data_invoice.drop_date} {this.state.data_invoice.drop_time}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="whitespace-nowrap text-gray-600 truncate"> Rp{this.state.data_package.price} </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="border-b border-gray-200">
                                        </div>
                                        <div class="p-9 border-b border-gray-200">
                                            <div class="space-y-3">
                                                <div class="flex justify-between">
                                                    <div>
                                                        <p class="font-bold text-black text-lg"> Total </p>
                                                    </div>
                                                    <p class="font-bold text-black text-lg"> Rp{this.state.data_package.price},00 </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <Footer />
                        </>
                    ) : (
                        null
                    )}
                </div>
            </section>
        )
    }
}
