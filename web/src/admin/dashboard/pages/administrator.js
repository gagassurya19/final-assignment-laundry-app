import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";

import { Modal } from "../../../components";

export default class Administrator extends React.Component {
    constructor() {
        super()
        this.state = {
            fillPassword: false,
            modal: 'hidden',
            modal_content: {
                modal_title: 'Tambah Administrator',
                modal_subTitle: 'Ini subtitle',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            token: localStorage.getItem('token_admin'),
            data_administrator: [],

            id_administrator: '',
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            email: "",
            telephone: "",
            photo_profile: null,
            status: 0,
        }
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    addData = async () => {
        this.toggleModal(true)
        this.setState({
            action: 'add',
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            email: "",
            telephone: "",
            photo_profile: null,
            role: "kasir",
            status: 1
        })
    }

    editData = async (selectedItem) => {
        this.toggleModal(true)
        this.setState({
            action: 'edit',
            id_administrator: selectedItem.id_administrator,
            first_name: selectedItem.first_name,
            last_name: selectedItem.last_name,
            username: selectedItem.username,
            password: selectedItem.password,
            email: selectedItem.email,
            telephone: selectedItem.telephone,
            photo_profile: selectedItem.photo_profile,
            status: Number(selectedItem.status),
            role: selectedItem.role
        })
    }

    saveData = async (ev) => {
        ev.preventDefault()

        if (this.state.action === "add") {
            const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_administrator'

            let formData = new FormData();
            formData.append('first_name', this.state.first_name);
            formData.append('last_name', this.state.last_name);
            formData.append('username', this.state.username);
            formData.append('password', this.state.password);
            formData.append('email', this.state.email);
            formData.append('telephone', this.state.telephone);
            formData.append('role', this.state.role);
            formData.append('status', this.state.status);

            if (this.state.photo_profile != null) {
                formData.append('photo_profile', this.state.photo_profile);
            }

            axios.post(url, formData, {
                headers: {
                    'Content-Type': formData.type,
                    Authorization: "Bearer " + this.state.token
                }
            })
                .then(response => {
                    this.getDataAdmin()
                    this.Alert('success', 'Data berhasil ditambahkan');
                })
                .catch(error => this.Alert('error', 'Data gagal ditambahkan. \n' + error.message))
        } else if (this.state.action === "edit") {
            const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_administrator/' + this.state.id_administrator
            let data = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                username: this.state.username,
                email: this.state.email,
                telephone: this.state.telephone,
            }

            if (this.state.role) {
                data.role = this.state.role
            }

            if (!this.state.photo_profile == null) {
                data.photo_profile = this.state.photo_profile
            }

            if (this.state.status) {
                data.status = this.state.status
            }

            if (this.state.fillPassword) {
                data.password = this.state.password
            }
            axios.put(url, data, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
                .then(response => {
                    if (this.state.fillPassword && (this.state.id_administrator == localStorage.getItem('id_administrator'))) {
                        this.Alert('success', 'Data berhasil diubah. \n' + 'Password telah diubah, silahkan login kembali');
                        localStorage.clear();
                        setTimeout(function () {
                            window.location = '/admin/login'
                        }, 1600);
                        this.setState({
                            fillPassword: false,
                        })
                    } else {
                        this.getDataAdmin()
                        this.Alert('success', 'Data berhasil diubah');
                        this.setState({
                            fillPassword: false,
                        })
                    }
                })
                .catch(error => this.Alert('error', 'Data gagal diubah. \n' + error.message))
        }
        this.toggleModal(false)
    }

    deleteData = (selectedItem) => {
        const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_administrator/' + selectedItem.id_administrator

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
                axios.delete(url, {
                    headers: {
                        Authorization: "Bearer " + this.state.token
                    }
                })
                    .then(response => {
                        if (response.data.isSuccess) {
                            this.getDataAdmin()
                            sweetAlertTailwindButton.fire(
                                'Deleted!',
                                'Your data has been deleted.',
                                'success'
                            )
                        } else {
                            sweetAlertTailwindButton.fire(
                                'Failed!',
                                response.data.message,
                                'error'
                            )
                        }
                    })
                    .catch(error => {
                        sweetAlertTailwindButton.fire(
                            'Error!',
                            error.message,
                            'errors'
                        )
                    })

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                sweetAlertTailwindButton.fire(
                    'Cancelled',
                    'Your data is safe :)',
                    'error'
                )
            }
        })
    }

    // add image 
    addImage = async (input) => {
        var url = input.value;
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            try {
                var reader = new FileReader();

                reader.onload = async function (e) {
                    $('#img').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);

                // send image to state
                await this.setState({
                    photo_profile: input.files[0]
                })
            } catch (err) {
                this.Alert('error', err.message);
            }

        } else {
            $('#img').attr('src', 'https://www.roobinascake.com/assets/admin/images/no-preview-available.png');
            this.Alert('error', 'File yang diupload harus berupa gambar');
        }
    }

    // change image 
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

                        // setTimeout(function () {
                        //     window.location.reload();
                        // }, 1100);
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
                this.Alert('error', err.message);
            }

        } else {
            $('#img').attr('src', 'https://www.roobinascake.com/assets/admin/images/no-preview-available.png');
            this.Alert('error', 'File yang diupload harus berupa gambar');
        }
    }

    // upload image to db
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
                if (this.state.id_administrator == Number(localStorage.getItem('id_administrator'))) {
                    axios.get(url, {
                        headers: {
                            Authorization: "Bearer " + this.state.token
                        }
                    })
                        .then(result => {
                            this.Alert('success', 'Photo berhasil di update');
                            localStorage.setItem('photo_profile_admin', process.env.REACT_APP_ADMIN_API_IMAGE + result.data.data_administrator[0].photo_profile);
                            this.getDataAdmin()
                        })
                        .catch(error => this.Alert('error', 'Photo gagal di update. \n' + error.message))
                } else {
                    this.Alert('success', 'Photo berhasil di update');
                    this.getDataAdmin()
                }
            })
            .catch(error => this.Alert('error', 'Photo gagal di update. \n' + error.message))
    }

    // alert
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

    // get data administrator
    getDataAdmin = async () => {
        const url = process.env.REACT_APP_ADMIN_API_URL + 'admin_administrator'

        await axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
            .then(result => {
                this.setState({
                    data_administrator: result.data.data_administrator
                })
            })
            .catch(error => this.Alert('error', error.message))
    }

    async componentDidMount() {
        await this.getDataAdmin()
    }

    render() {
        return (
            <>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-10">
                        <div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between py-7">
                            <div>
                                <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Administrator Management</h1>
                                <p class="leading-relaxed text-gray-500">Panel management administrator laundry</p>
                            </div>
                            <div>
                                {localStorage.getItem('role_admin') == 'admin' ? (
                                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={(ev) => { this.addData(ev) }}>
                                        Add new data
                                    </button>
                                ) : (
                                    null
                                )}
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
                                                            Nama Admin
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Username
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            No Telp
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Email
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Option
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody class="bg-white divide-y divide-gray-200">
                                                    {this.state.data_administrator.map((data, i) => (
                                                        <tr>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    {++i}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="flow-root">
                                                                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                                                        <li class="py-3 sm:py-4">
                                                                            <div class="flex items-center space-x-4">
                                                                                <div class="flex-shrink-0">
                                                                                    <img class="w-8 h-8 rounded-full" src={data.photo_profile ? (process.env.REACT_APP_ADMIN_API_IMAGE + data.photo_profile) : (process.env.REACT_APP_ADMIN_API_IMAGE + 'default.png')} alt={data.photo_profile} />
                                                                                </div>
                                                                                <div class="flex-1 min-w-0">
                                                                                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                                                                                        {data.first_name} {data.last_name}
                                                                                    </p>
                                                                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                                                                        Role: {data.role}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </td>

                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    {data.username}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900 truncate">
                                                                    (+62){data.telephone}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                <div class="text-sm text-gray-900">
                                                                    {data.email}
                                                                </div>
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {data.status ? (
                                                                    <span class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Active</span>
                                                                ) : (
                                                                    <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Inactive</span>
                                                                )}
                                                            </td>
                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                {data.id_administrator == localStorage.getItem('id_administrator') ? (
                                                                    <>
                                                                        <div class="flex-1 min-w-0">
                                                                            <div className="flex items-center">
                                                                                <button type="button" onClick={() => this.editData(data)}>
                                                                                    <svg class="w-6 h-6 text-indigo-500 hover:text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                                                                </button>
                                                                                <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 rounded dark:bg-blue-200 dark:text-blue-900">Only edit</span>
                                                                            </div>
                                                                            <div>
                                                                                <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">*Anda memakai akun ini</span>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    localStorage.getItem('role_admin') == 'admin' ? (
                                                                        <div>
                                                                            <button type="button" onClick={() => this.deleteData(data)}>
                                                                                <svg class="w-6 h-6 text-red-500 hover:text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                                                            </button>
                                                                            <button type="button" onClick={() => this.editData(data)}>
                                                                                <svg class="w-6 h-6 text-indigo-500 hover:text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                                                                            Not Authorized!
                                                                        </span>
                                                                    )
                                                                )}
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
                        <form method="POST" onSubmit={ev => this.saveData(ev)}>
                            <div class="px-4 py-5 bg-white sm:p-6">

                                <div class="px-4 py-5 sm:p-6">
                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-6">
                                            <div className="p-2 text-center inline-flex">
                                                <div class="flex flex-wrap justify-center">
                                                    <div class="w-12/12 pb-5">
                                                        <img
                                                            id='img'
                                                            src={this.state.photo_profile ? (process.env.REACT_APP_ADMIN_API_IMAGE + this.state.photo_profile) : (process.env.REACT_APP_ADMIN_API_IMAGE + 'default.png')}
                                                            alt="Photo profile"
                                                            class="w-40 h-40 rounded-full flex-shrink-0 object-cover object-center" />
                                                    </div>
                                                </div>
                                                <label className="ml-5 my-auto h-10 hover:cursor-pointer py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                    <form action="put" onChange={ev => this.state.action == 'add' ? this.addImage(ev.target) : this.changeImage(ev.target)}>
                                                        <input type="file" className="hidden" />
                                                    </form>
                                                    Change
                                                </label>
                                            </div>
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ first_name: ev.target.value })}
                                                required
                                                value={this.state.first_name} />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ last_name: ev.target.value })}
                                                required
                                                value={this.state.last_name} />
                                        </div>

                                        <div class="col-span-6">
                                            <label for="country" class="block text-sm font-medium text-gray-700">No. HP</label>
                                            <input type="text" name="number-hp" id="number-hp" autocomplete="number-hp" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ telephone: ev.target.value })}
                                                required
                                                value={this.state.telephone} />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                                            <input type="text" name="username" id="username" autocomplete="email" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ username: ev.target.value })}
                                                required
                                                value={this.state.username} />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                                            <input type="text" name="email-address" id="email-address" autocomplete="email" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                onChange={ev => this.setState({ email: ev.target.value })}
                                                required
                                                value={this.state.email} />
                                        </div>
                                        {this.state.action == 'add' ? (
                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                                <input type="password" name="password" id="password" autocomplete="password"
                                                    class="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={this.state.password} placeholder="**********"
                                                    onChange={ev => this.setState({ password: ev.target.value })}
                                                    required/>
                                            </div>
                                        ) : (
                                            this.state.fillPassword === false ? (
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
                                            )
                                        )}

                                        {localStorage.getItem('role_admin') === 'admin' ? (
                                            <>                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="first-name" class="block text-sm font-medium text-gray-700">Status</label>
                                                <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                    value={this.state.status} onChange={ev => this.setState({ status: ev.target.value })}>
                                                    <optgroup label="Select Status:">
                                                        <option value="1">Active</option>
                                                        <option value="0">Inactive</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                                <div class="col-span-6 sm:col-span-3">
                                                    <label for="first-name" class="block text-sm font-medium text-gray-700">Role</label>
                                                    <select required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        value={this.state.role} onChange={ev => this.setState({ role: ev.target.value })}>
                                                        <optgroup label="Select Role:">
                                                            <option value="admin">Admin</option>
                                                            <option value="kasir">Kasir</option>
                                                            <option value="owner">Owner</option>
                                                        </optgroup>
                                                    </select>
                                                </div>
                                            </>

                                        ) : (
                                            null
                                        )}
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