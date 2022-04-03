import React from "react";
import axios from 'axios';

import $ from 'jquery';
import Swal from 'sweetalert2';

import { Link } from "react-router-dom";

import { Footer, Tabs } from "../../components";
import Bio from './components/bio';
import Address from './components/address';
import Payment from './components/payment';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            id_customer: localStorage.getItem('id_customer'),
            register_date: localStorage.getItem('register_date'),
            token: localStorage.getItem('token_customer'),
            status: localStorage.getItem('status_customer')
        }
        // cek token dari localstorage
        if (!localStorage.getItem("token_customer")) {
            window.location = "/login"
        }
    }

    Alert = (kind, message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        })

        Toast.fire({
            icon: kind,
            title: message
        })
    }

    changeImage = async (input) => {
        var url = input.value;
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            try {
                var reader = new FileReader();

                reader.onload = async function (e) {
                    $('#img').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);

                // sweet alert
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
                    confirmButtonText: 'Yes, update it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true,
                    allowOutsideClick: false
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        // upload image
                        await this.uploadImage(input.files[0]);

                        sweetAlertTailwindButton.fire(
                            'Updated!',
                            'Your photo profile has been updated.',
                            'success'
                        )
                        setTimeout(function () {
                            window.location.reload();
                        }, 1100);
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // change image in frontend
                        $('#img').attr('src', localStorage.getItem('photo_profile_customer'));
                        sweetAlertTailwindButton.fire(
                            'Cancelled',
                            'Your photo profile is safe :)',
                            'error'
                        )
                    }
                })
            } catch (err) {
                console.log(err);
            }

        } else {
            $('#img').attr('src', 'https://www.roobinascake.com/assets/admin/images/no-preview-available.png');
            this.Alert('error', 'File yang diupload harus berupa gambar');
        }
    }

    uploadImage = async (dataImage) => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_crud/' + this.state.id_customer

        let formData = new FormData();
        formData.append('photo_profile', dataImage);

        await axios.put(url, formData, {
            headers: {
                'Content-Type': formData.type,
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                axios.get(url, {
                    headers: {
                        Authorization: "Bearer " + this.state.token
                    }
                })
                    .then(result => {
                        localStorage.setItem('photo_profile_customer', process.env.REACT_APP_CUSTOMER_API_IMAGE + result.data.data_customer[0].photo_profile);
                    })
                    .catch(error => console.log(error.message))
            })
            .catch(error => console.log(error.message))
    }

    parseDate = () => {
        const date = new Date(this.state.register_date);
        const dateReturn = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return dateReturn;
    }

    render() {
        return (
            <>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-10">
                        <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Update your profile</h1>
                        <p class="mb-11 leading-relaxed text-gray-500">We recommend that you update your account information frequently.</p>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div className="px-4 py-5 sm:p-6 bg-white shadow rounded-md">
                                <div className="p-2 text-center">
                                    <div class="flex flex-wrap justify-center">
                                        <div class="w-12/12 pb-5">
                                            <img
                                                id='img'
                                                src={
                                                    localStorage.getItem('photo_profile_customer') ?
                                                        localStorage.getItem('photo_profile_customer') :
                                                        "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
                                                }
                                                alt="Photo profile"
                                                class="w-40 h-40 rounded-full flex-shrink-0 object-cover object-center" />
                                        </div>
                                    </div>
                                    <label className="hover:cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <form action="put" onChange={ev => this.changeImage(ev.target)}>
                                            <input type="file" className="hidden" />
                                        </form>
                                        Change
                                    </label>
                                </div>
                                <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li class="flex items-center py-3">
                                        <span>Status</span>
                                        {this.state.status ? (
                                            <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                        ) : (
                                            <span class="ml-auto"><span class="bg-red-500 py-1 px-2 rounded text-white text-sm">Suspend</span></span>
                                        )}
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Registered</span>
                                        <span class="ml-auto">{this.parseDate()}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:col-span-3 bg-white shadow rounded-md">
                                <div className="">
                                    {/* Tabs 1 */}
                                    <Tabs color="indigo"
                                        title1="Biodata Diri" tab1={(
                                            <>
                                                <Bio />
                                            </>
                                        )}
                                        title2="Daftar Alamat" tab2={(
                                            <>
                                                <Address />
                                            </>
                                        )}
                                        title3="Pembayaran" tab3={(
                                            <>
                                                <Payment />
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </>
        )
    }
}