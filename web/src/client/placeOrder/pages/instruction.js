import { Link } from 'react-router-dom';
import { NavbarClient, Timeline, Footer } from '../../../components';

export default function Instruction() {
    return (
        <>
            <div className="container mx-auto">
                <Timeline page="2" className="w-full" />
                <div className="mx-5 my-6 p-5 rounded">
                    <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Order Instructions (Optional)</h1>
                    <div class="w-full my-5">
                        <p class="mt-4 mb-3 leading-relaxed text-gray-500">Do you have laundry instructions?</p>
                        <textarea
                            class="mb-4 fmt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Write your laundry instructions here...">
                        </textarea>
                        <p class="mt-4 mb-3 leading-relaxed text-gray-500">Do you have driver instructions?</p>
                        <textarea
                            class="mb-4 fmt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Write your driver instructions here...">
                        </textarea>
                    </div>

                    <div class="grid grid-rows-1 grid-flow-col gap-4 p-3">
                        <Link to="/order/pick_drop" className='mx-1'>
                            <button class="flex justify-center font-bold bg-gray-100 border-0 focus:outline-none hover:bg-gray-200 rounded text-base w-full p-2">
                                {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg> */}
                                Kurang yakin..
                            </button>
                        </Link>
                        <Link to="/order/payment" className='mx-1'>
                            <button class="flex justify-center font-bold text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded text-base w-full p-2">
                                {/* <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                Udah bener, Lanjut!
                            </button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}