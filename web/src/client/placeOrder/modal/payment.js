import React from "react"
import { Modal } from "../../../components"

export default class modal_payment extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addAddress: false,
            modal_content: {
                modal_title: 'Choose Payment Method',
                modal_subTitle: 'Pilih atau buat jenis pembayaran',
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
                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2"
                    onClick={() => { this.toggleModal(true) }}>
                    <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    <span class="flex flex-col text-left pl-2">
                        <span class="title-font font-medium text-gray-900">Add Payment</span>
                        <span class="text-gray-500 text-sm">Pilih cara pembayaran anda</span>
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
                        <form method="POST" >
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    {this.state.addAddress ? (
                                        <>
                                            {/* Create new Payment */}
                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_rekening" class="block text-sm font-medium text-gray-700">Nama Rekening</label>
                                                <input type="text" name="nama_rekening" id="nama_rekening" autocomplete="nama_rekening"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Nama Rekening'
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_bank" class="block text-sm font-medium text-gray-700">Bank</label>
                                                <input type="text" name="nama_bank" id="nama_bank" autocomplete="nama_bank"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Nama Bank'
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="no_rek" class="block text-sm font-medium text-gray-700">No. Rekening</label>
                                                <input type="number" name="no_rek" id="no_rek" autocomplete="no_rek"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='048xxxxx'
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                                                <textarea
                                                    class="fmt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    placeholder="Your notes">
                                                </textarea>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Address Already */}
                                            <div class="col-span-12 sm:col-span-12 w-full">
                                                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                                                    <label class="inline-flex items-center">
                                                        <input type="radio" class="form-radio mr-2" name="accountType" value="personal" />
                                                        <div class="flex justify-between">
                                                            <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                            <span class="flex flex-col text-left pl-2">
                                                                <span class="title-font font-medium text-gray-900">BCA Virtual Account</span>
                                                                <span class="text-gray-500 text-sm">088321523</span>
                                                            </span>
                                                        </div>
                                                    </label>
                                                </button>
                                                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                                                    <label class="inline-flex items-center">
                                                        <input type="radio" class="form-radio mr-2" name="accountType" value="personal" />
                                                        <div class="flex justify-between">
                                                            <svg class="h-8 w-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                            <span class="flex flex-col text-left pl-2">
                                                                <span class="title-font font-medium text-gray-900">BCA Virtual Account</span>
                                                                <span class="text-gray-500 text-sm">088321523</span>
                                                            </span>
                                                        </div>
                                                    </label>
                                                </button>
                                            </div>
                                            <div class="col-span-6 sm:col-span-6">
                                                <button
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    type="button"
                                                    onClick={() => this.addAddress(true)}>
                                                    Add Payment
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
                                            onClick={() => this.addAddress(false)}>
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
                                            type="submit">
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