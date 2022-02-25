import React from "react";
import { Link } from "react-router-dom";

import { Footer, Tabs } from "../../components";
import Bio from './components/bio';
import Address from './components/address';
import Payment from './components/payment';

export default class Profile extends React.Component {
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
                                    <button
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        type="submit">
                                        Change
                                    </button>
                                </div>
                                <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li class="flex items-center py-3">
                                        <span>Status</span>
                                        <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Member since</span>
                                        <span class="ml-auto">Nov 07, 2016</span>
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