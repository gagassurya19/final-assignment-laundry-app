import React from "react";
import { Modal } from "../../../../../../components";

import Swal from 'sweetalert2';

export default class Address extends React.Component {
    dataDummy = [
        {
            id: 1,
            name: "Nama Penerima",
            address: "Jl. Jalan",
            noHp: "08123456789",
            notes: "Catatan"
        },
        {
            id: 2,
            name: "Nama Penerima",
            address: "Jl. Jalan",
            noHp: "08123456789",
            notes: "Catatan"
        }
    ];

    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addAddress: false,
            modal_content: {
                modal_title: 'Add Address',
                modal_subTitle: 'Isi alamat anda',
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

    addAddress = (ev) => {
        ev.preventDefault()
        this.toggleModal(true)
    }

    editAddress = (ev) => {
        ev.preventDefault()
        this.toggleModal(true)
    }

    deleteAddress = (ev) => {
        ev.preventDefault()
        const sweetAlertTailwindButton = Swal.mixin({
            customClass: {
              confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-3 rounded',
              cancelButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-3 rounded'
            },
            buttonsStyling: false
          })
          
          sweetAlertTailwindButton.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              sweetAlertTailwindButton.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              sweetAlertTailwindButton.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
    }

    render() {
        return (
            <>
                {this.dataDummy.map((data, index) => (
                    <div class="py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                        <div class="flex justify-between">
                            <div className="inline-flex relative items-center">
                                <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" /></svg>
                                <span class="flex flex-col text-left pl-2">
                                    <span class="title-font font-medium text-gray-900">{data.name}</span>
                                    <span class="text-gray-500 text-sm">{data.address}</span>
                                </span>
                            </div>
                            <div className="inline-flex relative items-center gap-2">
                                <button type="button" onClick={ev => this.deleteAddress(ev)}>
                                    <svg class="w-6 h-6 text-red-500 hover:text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                </button>
                                <button type="button" onClick={ev => this.editAddress(ev)}>
                                    <svg class="w-6 h-6 text-indigo-500 hover:text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                <button type="button" className="mt-10 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => { this.toggleModal(true) }}>
                    Add Address
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
                                    type="submit">
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