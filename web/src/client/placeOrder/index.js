import React, { useEffect } from "react";

import { Link } from "react-router-dom"

import { Footer } from '../../components';

export default function PlaceOrder() {
    return (
        <>
            <div className="container mx-auto">
                <div className="mx-5 rounded">
                    <section class="text-gray-600 body-font">
                        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                            {/* <img class="lg:w-10/12 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/1920x1080" /> */}
                            <iframe height="450rem" src="https://www.youtube.com/embed/_7tROYKE3y4" class=" w-5/6 mb-10 object-cover object-center rounded"></iframe>
                            <div class="text-center lg:w-2/3 w-full">
                                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">How LaundryKu Works</h1>
                                <p class="mb-8 leading-relaxed">Click on the video above to see tutorial how the LaundryKu work</p>
                                <div class="flex justify-center">
                                    <Link to="/">
                                        <button class="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Back Home</button>
                                    </Link>
                                    <Link to="/order/pick_drop">
                                        <button class="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Order Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}