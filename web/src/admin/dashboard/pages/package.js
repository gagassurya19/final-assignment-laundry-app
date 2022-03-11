import React from "react";
import Statistic from "./components/statistic";
import { Modal } from "../../../components";

export default class Package extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addAddress: true,
            modal_content: {
                modal_title: 'Tambah Transaksi',
                modal_subTitle: 'Ini subtitle',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            }
        }
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    addAddress = (isOpen) => {
        this.setState({ addAddress: isOpen })
    }

    render() {
        return (
            <>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-10">
                        <Statistic />
                        <div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between py-7">
                            <div>
                                <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Package Side</h1>
                                <p class="leading-relaxed text-gray-500">Panel management paket laundry</p>
                            </div>
                            <div>
                                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => { this.toggleModal(true) }}>
                                    Add new data
                                </button>
                            </div>
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
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                    {[...Array(5)].map((x, i) => (
                                                        <tr>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    {++i}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    INV09134134134
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="text-sm text-gray-900">
                                                                    ini details
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="text-sm text-gray-900">
                                                                    {/* {item.siswa.length} */} test
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="text-sm text-gray-900">
                                                                    {/* {item.createdAt} */} test
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Green</span>
                                                                <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Yellow</span>
                                                                <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Red</span>
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
                        <form method="POST" >
                            <div class="px-4 py-5 bg-white sm:p-6">

                                <div class="px-4 py-5 sm:p-6">
                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">Customer</label>
                                            <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                value={this.state.level} onChange={ev => this.setState({ level: ev.target.value })}>
                                                <optgroup label="Select Role:">
                                                    <option value="admin">Admin</option>
                                                    <option value="kasir">Kasir</option>
                                                    <option value="owner">Owner</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Admin</label>
                                            <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                value={this.state.level} onChange={ev => this.setState({ level: ev.target.value })}>
                                                <optgroup label="Select Role:">
                                                    <option value="admin">Admin</option>
                                                    <option value="kasir">Kasir</option>
                                                    <option value="owner">Owner</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">Paket</label>
                                            <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                value={this.state.level} onChange={ev => this.setState({ level: ev.target.value })}>
                                                <optgroup label="Select Role:">
                                                    <option value="admin">Admin</option>
                                                    <option value="kasir">Kasir</option>
                                                    <option value="owner">Owner</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Outlet</label>
                                            <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                value={this.state.level} onChange={ev => this.setState({ level: ev.target.value })}>
                                                <optgroup label="Select Role:">
                                                    <option value="admin">Admin</option>
                                                    <option value="kasir">Kasir</option>
                                                    <option value="owner">Owner</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="country" class="block text-sm font-medium text-gray-700">Pick Up Date</label>
                                            <input type="datetime-local" name="number-hp" id="number-hp" autocomplete="number-hp" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="country" class="block text-sm font-medium text-gray-700">Drop Off Date</label>
                                            <input type="datetime-local" name="number-hp" id="number-hp" autocomplete="number-hp" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                        </div>

                                        <div className="col-span-6">
                                            <label for="country" class="block text-sm font-medium text-gray-700">Transaction status</label>
                                            <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                value={this.state.level} onChange={ev => this.setState({ level: ev.target.value })}>
                                                <optgroup label="Select Role:">
                                                    <option value="proses">Proses</option>
                                                    <option value="selesai">Selesai</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div className="col-span-6">
                                            <p class="leading-relaxed text-gray-500">Do you have laundry instructions?</p>
                                            <textarea
                                                class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                placeholder="Write your laundry instructions here...">
                                            </textarea>
                                        </div>

                                        <div className="col-span-6">
                                            <p class="leading-relaxed text-gray-500">Do you have driver instructions?</p>
                                            <textarea
                                                class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                placeholder="Write your driver instructions here...">
                                            </textarea>
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