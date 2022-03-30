import React from "react";
import axios from 'axios';
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
            photo_profile: ''
        }
        // cek token dari localstorage
        if (!localStorage.getItem("token_customer")) {
            window.location = "/login"
        }
    }

    getImage = () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_crud/' + this.state.id_customer
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    photo_profile: result.data.data_customer[0].photo_profile
                })
            })
            .catch(error => console.log(error))
    }

    uploadImage = (ev) => {
        ev.preventDefault()
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_crud/' + this.state.id_customer

        let data = {
            photo_profile: this.state.photo_profile
        }

        axios.put(url, data, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    message: 'photo uploaded'
                })
            })
            .catch(error => console.log(error.message))
    }

    componentDidMount() {
        this.getImage()
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
                                    <div class="image overflow-hidden">
                                        <img class="w-60 mx-auto mb-3 rounded-full"
                                            src={this.state.photo_profile || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                            alt="Photo Profile" />
                                    </div>
                                    <label className="hover:cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <form action="put" onChange={(ev) => this.uploadImage(ev)}>
                                            <input type="file" className="hidden"
                                                onChange={(ev) => this.setState({photo_profile: ev.target.files[0]})} />
                                        </form>
                                        Change
                                    </label>
                                </div>
                                <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li class="flex items-center py-3">
                                        <span>Status</span>
                                        <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Member since</span>
                                        <span class="ml-auto">{this.state.register_date}</span>
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