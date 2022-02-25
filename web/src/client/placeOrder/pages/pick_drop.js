import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarClient, Timeline, Footer, Modal } from '../../../components';

import Modal_address from '../modal/address';
import Modal_ordertype from '../modal/ordertype';
import Modal_pickup from '../modal/pickup';
import Modal_dropoff from '../modal/dropoff';

export default class PickDrop extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <>
                <div className="container mx-auto">
                    <Timeline page="1" className="w-full" />
                    <div className="mx-5 my-6 p-5 rounded">
                        <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Pick Up & Drop Off</h1>
                        <p class="mb-8 leading-relaxed text-gray-500">A Laundryku driver will pickup your laundry</p>
                        <div class="w-full my-11">
                            <Modal_address />
                            {/* <Modal_ordertype /> */}
                            <Modal_pickup />
                            <Modal_dropoff />
                        </div>

                        <div class="grid grid-rows-1 grid-flow-col gap-4 py-3">
                            <Link to="/order" className='mx-1'>
                                <button class="flex justify-center font-bold bg-gray-100 border-0 focus:outline-none hover:bg-gray-200 rounded text-base w-full p-2">
                                    {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg> */}
                                    Balik deh...
                                </button>
                            </Link>
                            <Link to="/order/instruction" className='mx-1'>
                                <button class="flex justify-center font-bold text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded text-base w-full p-2">
                                    {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                    Lanjut gan!
                                </button>
                            </Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    }
}