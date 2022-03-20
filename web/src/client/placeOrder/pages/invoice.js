import React, { Component } from 'react'

import $ from 'jquery';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../../components';

export default function InvoiceDefault() {
    return (
        <Invoice params={useParams()} />
    )
}

export class Invoice extends Component {
    constructor() {
        super();
        this.state = {
            invoice: null,
            header: {
                invoice_date: '09/09/2019',
                outlet_name: 'Outlet Tulungagung',
                customer_name: 'John Doe',
                customer_email: 'johndoe@gmail.com',
                customer_phone: '+6281234567890',
            },
            body: {
                laundry_notes: 'laundry notes',
                driver_notes: 'driver notes',
                items: [{
                    id: 0,
                    item_name: 'item name 1',
                    item_price: 100000,
                    pickup_date: '09/09/2019',
                    drop_date: '09/09/2019',
                }, {
                    id: 1,
                    item_name: 'item name 2',
                    item_price: 200008,
                    pickup_date: '09/09/2019',
                    drop_date: '09/09/2019',
                }],
                total_price: 0,
            }
        }
    }

    totalPrice = () => {
        let total = 0;
        this.state.body.items.map(item => {
            total += parseInt(item.item_price)
        })
        this.setState({ body: { ...this.state.body, total_price: total } })
    }

    getPDF = (ev) => {
        ev.preventDefault();
		var HTML_Width = $("article").width();
		var HTML_Height = $("article").height();
		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
        const fromState = this.state.invoice;

		html2canvas($("article")[0],{allowTaint:true}).then(function(canvas) {
			canvas.getContext('2d');
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
		    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			for (var i = 1; i <= totalPDFPages; i++) { 
				pdf.addPage(PDF_Width, PDF_Height);
				pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			}
		    pdf.save(`Laundryku-${fromState}.pdf`);
        });
	};

    componentDidMount() {
        this.setState({ invoice: this.props.params.invoice })
        this.totalPrice();
    }

    render() {
        return (
            <section class="bg-gray-100">
                <div className="container mx-auto">
                    <div class=" mx-auto py-10 md:py-16">
                        <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Order Success</h1>
                        <p class="mb-11 leading-relaxed text-gray-500">This is your invoices {this.state.invoice}</p>
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
                                                    <p> {this.state.header.outlet_name} </p>
                                                </div>
                                                <div>
                                                    <p class="font-medium text-sm text-gray-400"> Billed To </p>
                                                    <p> {this.state.header.customer_name} </p>
                                                    <p> {this.state.header.customer_email} </p>
                                                    <p> {this.state.header.customer_phone} </p>
                                                </div>
                                            </div>
                                            <div class="space-y-2">
                                                <div>
                                                    <p class="font-medium text-sm text-gray-400"> Invoice Number </p>
                                                    <p> {this.state.invoice} </p>
                                                </div>
                                                <div>
                                                    <p class="font-medium text-sm text-gray-400"> Invoice Date </p>
                                                    <p> {this.state.header.invoice_date} </p>
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
                                        <p class="text-sm"> {this.state.body.laundry_notes} </p>
                                    </div>
                                    <div className='mt-3'>
                                        <p class="font-medium text-sm text-gray-400"> Driver Note </p>
                                        <p class="text-sm"> {this.state.body.driver_notes} </p>
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
                                        {this.state.body.items.map((data, index) => 
                                            (
                                                <tr>
                                                    <td class="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                                                        <div>
                                                            <p> {data.item_name} </p>
                                                            <p class="text-sm text-gray-400"> ID: {data.id} </p>
                                                        </div>
                                                    </td>
                                                    <td class="whitespace-nowrap text-gray-600 truncate">  </td>
                                                    <td class="whitespace-nowrap text-gray-600 truncate"> 
                                                        <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Diproses</span>
                                                    </td>
                                                    <td class="whitespace-nowrap space-x-1 flex items-center">
                                                        <div>
                                                            <p> Pickup: {data.pickup_date} </p>
                                                            <p class="text-sm text-gray-400"> Dropoff: {data.drop_date} </p>
                                                        </div>
                                                    </td>
                                                    <td class="whitespace-nowrap text-gray-600 truncate"> Rp{data.item_price} </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <div class="border-b border-gray-200">
                                    {/* <div class="space-y-3">
                                        <div class="flex justify-between">
                                            <div>
                                                <p class="text-gray-500 text-sm"> Subtotal </p>
                                            </div>
                                            <p class="text-gray-500 text-sm"> $660,000.00 </p>
                                        </div>
                                        <div class="flex justify-between">
                                            <div>
                                                <p class="text-gray-500 text-sm"> Tax </p>
                                            </div>
                                            <p class="text-gray-500 text-sm"> $0.00 </p>
                                        </div>
                                        <div class="flex justify-between">
                                            <div>
                                                <p class="text-gray-500 text-sm"> Total </p>
                                            </div>
                                            <p class="text-gray-500 text-sm"> $660,000.00 </p>
                                        </div>
                                    </div> */}
                                </div>
                                <div class="p-9 border-b border-gray-200">
                                    <div class="space-y-3">
                                        <div class="flex justify-between">
                                            <div>
                                                <p class="font-bold text-black text-lg"> Total </p>
                                            </div>
                                            <p class="font-bold text-black text-lg"> Rp{this.state.body.total_price},00 </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <Footer />
                </div>
            </section>
        )
    }
}
