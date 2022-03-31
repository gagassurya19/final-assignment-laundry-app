import React from "react";

import axios from 'axios';
import Swal from 'sweetalert2';

export default class Bio extends React.Component {
    constructor() {
        super()
        this.state = {
            fillPassword: false,
            token: localStorage.getItem('token_customer'),
            id_customer: localStorage.getItem('id_customer'),
            data: {},
            isSuccess: false,

            first_name: '',
            last_name: '',
            telephone: '',
            email: '',
            photo_profile: '',
            password: ''
        }
    }

    getDataCustomer = () => {
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_crud/' + this.state.id_customer

        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                const data = result.data.data_customer[0];
                this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    telephone: data.telephone,
                    email: data.email,
                    photo_profile: data.photo_profile,
                    password: data.password
                })
            })
            .catch(error => console.log(error))
    }

    updateDataCustomer = (ev) => {
        ev.preventDefault();
        const url = process.env.REACT_APP_CUSTOMER_API_URL + 'customer_crud/' + this.state.id_customer

        let data
        if (this.state.fillPassword) {
            data = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                telephone: this.state.telephone,
                email: this.state.email,
                password: this.state.password
            }
        } else {
            data = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                telephone: this.state.telephone,
                email: this.state.email,
            }
        }

        axios.put(url, data, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                if(this.state.fillPassword){
                    this.Alert('success', 'Data berhasil di update. \nSilahkan login kembali')
                    localStorage.clear();   
                    setTimeout(function () {
                        window.location = '/login'
                    }, 1600);
                } else {
                    this.getDataCustomer()
                    this.Alert('success', 'Data berhasil di update')
                }
            })
            .catch(error => {
                this.Alert('error', error.message)
            })
    }

    Alert = (kind, message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        })

        Toast.fire({
            icon: kind,
            title: message
        })
    }

    componentDidMount() {
        this.getDataCustomer()
    }

    render() {
        return (
            <>
                <form action="#" onSubmit={ev => this.updateDataCustomer(ev)}>
                    <div class="px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    onChange={ev => this.setState({ first_name: ev.target.value })}
                                    value={this.state.first_name} />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    onChange={ev => this.setState({ last_name: ev.target.value })}
                                    value={this.state.last_name} />
                            </div>

                            <div class="col-span-6">
                                <label for="country" class="block text-sm font-medium text-gray-700">No. HP</label>
                                <input type="text" name="number-hp" id="number-hp" autocomplete="number-hp" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    onChange={ev => this.setState({ telephone: ev.target.value })}
                                    value={this.state.telephone} />
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                                <input type="text" name="email-address" id="email-address" autocomplete="email" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    onChange={ev => this.setState({ email: ev.target.value })}
                                    value={this.state.email} />
                            </div>

                            {this.state.fillPassword === false ? (
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                    <button className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800"
                                        type="button"
                                        onClick={() => this.setState({ fillPassword: true })}>
                                        Change Password
                                    </button>
                                </div>
                            ) : (
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" name="password" id="password" autocomplete="password"
                                        class="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="**********"
                                        onChange={ev => this.setState({ password: ev.target.value })}
                                        required />
                                    <button className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                                        type="button"
                                        onClick={() => this.setState({ fillPassword: false })}>
                                        Cancel
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                    </div>
                </form>
            </>
        )
    }
}