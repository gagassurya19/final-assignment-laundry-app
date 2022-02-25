import React from "react"
import { Modal } from "../../../components"

export default class modal_ordertype extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addAddress: false,
            modal_content: {
                modal_title: 'Choose Order Type',
                modal_subTitle: 'Pilih tipe order',
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
                    <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />  <line x1="3" y1="9" x2="7" y2="9" /></svg>
                    <span class="flex flex-col text-left pl-2">
                        <span class="title-font font-medium text-gray-900">Order Type</span>
                        <span class="text-gray-500 text-sm">Isi dengan tipe order anda</span>
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
                                            {/* Create new address */}
                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">Nama Penerima</label>
                                                <input type="text" name="nama_kelas" id="nama_kelas" autocomplete="nama_kelas"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Penerima'
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">Alamat</label>
                                                <input type="text" name="nama_kelas" id="nama_kelas" autocomplete="nama_kelas"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='Alamat'
                                                    required />
                                            </div>

                                            <div class="col-span-6 sm:col-span-6">
                                                <label for="nama_kelas" class="block text-sm font-medium text-gray-700">No HP</label>
                                                <input type="number" name="nama_kelas" id="nama_kelas" autocomplete="nama_kelas"
                                                    class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    placeholder='No HP'
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
                                            < div class="col-span-12 sm:col-span-12 w-full">
                                                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                                                    <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
                                                    <span class="flex flex-col text-left pl-2">
                                                        <span class="title-font font-medium text-gray-900">Kos Penjara</span>
                                                        <span class="text-gray-500 text-sm">Jl. Danau ranau E5/G26</span>
                                                    </span>
                                                </button>
                                                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                                                    <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
                                                    <span class="flex flex-col text-left pl-2">
                                                        <span class="title-font font-medium text-gray-900">Kos Penjara</span>
                                                        <span class="text-gray-500 text-sm">Jl. Danau ranau E5/G26</span>
                                                    </span>
                                                </button>
                                            </div>
                                            <div class="col-span-6 sm:col-span-6">
                                                <button
                                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    type="button"
                                                    onClick={() => this.addAddress(true)}>
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