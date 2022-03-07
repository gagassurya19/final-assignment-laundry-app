import React from "react";

export default class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            fillPassword: false
        }
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
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Photo Profile" />
                                    </div>
                                    <label className="hover:cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                        <input type="file" className="hidden" />
                                        Change
                                    </label>
                                </div>
                                <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li class="flex items-center py-3">
                                        <span>Status</span>
                                        <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Member Role</span>
                                        <span class="ml-auto">Admin</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:col-span-3 bg-white shadow rounded-md">
                                <form action="#" method="POST">
                                    <div class="px-4 py-5 sm:p-6">
                                        <div class="grid grid-cols-6 gap-6">
                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                            </div>

                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                            </div>

                                            <div class="col-span-6">
                                                <label for="country" class="block text-sm font-medium text-gray-700">No. HP</label>
                                                <input type="text" name="number-hp" id="number-hp" autocomplete="number-hp" placeholder="+62" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                            </div>

                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                                                <input type="text" name="username" id="username" autocomplete="email" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                                            </div>

                                            <div class="col-span-6 sm:col-span-3">
                                                <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                                                <input type="text" name="email-address" id="email-address" autocomplete="email" class="border p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
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