import React from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import $ from 'jquery';

export default class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            fillPassword: false,
            token: localStorage.getItem("token_admin"),
            id_administrator: localStorage.getItem("id_administrator"),
            status: localStorage.getItem("status_admin"),
            role: localStorage.getItem("role_admin"),

            first_name: '',
            last_name: '',
            username: '',
            password: '',
            email: '',
            telephone: '',
            photo_profile: '',
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
                        $('#img').attr('src', localStorage.getItem('photo_profile_admin'));
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
        const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_administrator/' + this.state.id_administrator

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
                        localStorage.setItem('photo_profile_admin', process.env.REACT_APP_ADMIN_API_IMAGE + result.data.data_administrator[0].photo_profile);
                    })
                    .catch(error => console.log(error.message))
            })
            .catch(error => console.log(error.message))
    }

    // get data admin
    getDataAdmin = () => {
        const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_administrator/' + this.state.id_administrator

        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                const data = result.data.data_administrator[0];
                this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    telephone: data.telephone,
                    photo_profile: data.photo_profile,
                })
            })
            .catch(error => console.log(error))
    }

    // update data admin
    updateDataAdmin = (ev) => {
        ev.preventDefault();
        const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_administrator/' + this.state.id_administrator

        let data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            email: this.state.email,
            telephone: this.state.telephone,
        }

        if (this.state.fillPassword) {
            data.password = this.state.password
        }

        axios.put(url, data, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                if (this.state.fillPassword) {
                    this.Alert('success', 'Data berhasil di update. \nSilahkan login kembali')
                    localStorage.clear();
                    setTimeout(function () {
                        window.location = '/admin/login'
                    }, 1600);
                } else {
                    this.getDataAdmin()
                    this.Alert('success', 'Data berhasil di update')
                }
            })
            .catch(error => {
                this.Alert('error', error.message)
            })
    }

    componentDidMount() {
        this.getDataAdmin()
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
                                                    localStorage.getItem('photo_profile_admin') ?
                                                        localStorage.getItem('photo_profile_admin') :
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
                                        {this.state.status == 1 ? (
                                            <span class="ml-auto">
                                                <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                                                    Active
                                                </span>
                                            </span>
                                        ) : (
                                            <span class="ml-auto">
                                                <span class="bg-red-500 py-1 px-2 rounded text-white text-sm">
                                                    Suspend
                                                </span>
                                            </span>
                                        )}
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Role</span>
                                        <span class="ml-auto">{this.state.role}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:col-span-3 bg-white shadow rounded-md">
                                <form action="#" onSubmit={ev => this.updateDataAdmin(ev)}>
                                    <div class="px-4 py-5 sm:p-6">
                                        <div class="grid grid-cols-6 gap-6">
                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={this.state.first_name}
                                                    onChange={ev => this.setState({ first_name: ev.target.value })} />
                                            </div>

                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={this.state.last_name}
                                                    onChange={ev => this.setState({ last_name: ev.target.value })} />
                                            </div>

                                            <div class="col-span-6">
                                                <label for="country" class="block text-sm font-medium text-gray-700">No. HP</label>
                                                <input type="text" name="number-hp" id="number-hp" autocomplete="number-hp" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={this.state.telephone}
                                                    onChange={ev => this.setState({ telephone: ev.target.value })} />
                                            </div>

                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                                                <input type="text" name="username" id="username" autocomplete="email" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={this.state.username}
                                                    onChange={ev => this.setState({ username: ev.target.value })} />
                                            </div>

                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                                                <input type="text" name="email-address" id="email-address" autocomplete="email" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={this.state.email}
                                                    onChange={ev => this.setState({ email: ev.target.value })} />
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
                                                        value={this.state.password} placeholder="**********"
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}