import { NavbarClient, Timeline, Footer } from '../../../components';

import { Link } from 'react-router-dom';
import Modal_payment from '../modal/payment';
import React from 'react';
export default class Payment extends React.Component {
    constructor() {
        super()
        this.state = {
            paylater: true
        }
    }
    render() {
        return (
            <>
                <div className="container mx-auto">
                    <Timeline page="3" />
                    <div className="mx-5 my-6 p-5 rounded">
                        <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Order Payment Method</h1>
                        <p class="mb-11 leading-relaxed text-gray-500">It's time to pay your bill :)</p>
                        <div class="w-full my-5">
                            <Modal_payment />
                        </div>
                        <div class="grid grid-rows-1 grid-flow-col gap-4 p-3">
                            <Link to="/order/instruction" className='mx-1'>
                                <button class="flex justify-center font-bold bg-gray-100 border-0 focus:outline-none hover:bg-gray-200 rounded text-base w-full p-2">
                                    {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg> */}
                                    Balik deh, ga jadi...
                                </button>
                            </Link>
                            {this.state.paylater ? (
                                <Link to="/order/done" className='mx-1'>
                                    <button class="flex justify-center font-bold text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded text-base w-full p-2">
                                        {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                        Bayar nanti deh, Lanjut!
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/order/done" className='mx-1'>
                                    <button class="flex justify-center font-bold text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded text-base w-full p-2">
                                        {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                        Yakin bener, Lanjut!
                                    </button>
                                </Link>
                            )}

                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}