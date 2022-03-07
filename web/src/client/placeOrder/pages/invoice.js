import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../../components';

export default function Invoice() {
    let { invoice } = useParams();
    return (
        <section class="bg-gray-100">
            <div className="container mx-auto">
                <div class=" mx-auto py-10 md:py-16">
                    <h1 class="title-font sm:text-3xl text-2xl mb-1 font-medium text-gray-900">Order Success</h1>
                    <p class="mb-11 leading-relaxed text-gray-500">This is your invoices {invoice}</p>
                    <article class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
                        <div class="md:rounded-b-md  bg-white">
                            <div class="p-9 border-b border-gray-200">
                                <div class="space-y-6">
                                    <div class="flex justify-between items-top">
                                        <div class="space-y-4">
                                            <div>
                                                <div className="mb-5 flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                                    <div className="flex-shrink-0 flex items-center title-font font-medium text-gray-900">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="hidden lg:block h-10 w-auto text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                                        </svg>
                                                        <Link to="/">
                                                            <span class="ml-3 text-xl hidden sm:block">Laundryku</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <p class="font-bold text-lg"> Invoice </p>
                                                <p> Laundryku </p>
                                            </div>
                                            <div>
                                                <p class="font-medium text-sm text-gray-400"> Billed To </p>
                                                <p> Tony Stark </p>
                                                <p> tony@starkindustriesxyz.com </p>
                                                <p> (02) 1234 1234 </p>
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <div>
                                                <p class="font-medium text-sm text-gray-400"> Invoice Number </p>
                                                <p> INV-MJ0001 </p>
                                            </div>
                                            <div>
                                                <p class="font-medium text-sm text-gray-400"> Invoice Date </p>
                                                <p> 31 December 2021 </p>
                                            </div>
                                            <div>
                                                <p class="font-medium text-sm text-gray-400"> ABN </p>
                                                <p> 57 630 182 446 </p>
                                            </div>
                                            <div>
                                                <a href="#" target="_blank" class="inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 "> Download PDF <svg class="ml-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                                </svg>
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#" target="_blank" class="inline-flex items-center text-sm font-medium text-blue-500 hover:opacity-75 "> Pay Balance <svg class="ml-0.5 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                                </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-9 border-b border-gray-200">
                                <p class="font-medium text-sm text-gray-400"> Note </p>
                                <p class="text-sm"> Thank you for your order. </p>
                            </div>
                            <table class="w-full divide-y divide-gray-200 text-sm">
                                <thead>
                                    <tr>
                                        <th scope="col" class="px-9 py-4 text-left font-semibold text-gray-400"> Item </th>
                                        <th scope="col" class="py-3 text-left font-semibold text-gray-400">  </th>
                                        <th scope="col" class="py-3 text-left font-semibold text-gray-400"> Amount </th>
                                        <th scope="col" class="py-3 text-left font-semibold text-gray-400"> Discount </th>
                                        <th scope="col" class="py-3 text-left font-semibold text-gray-400"></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    <tr>
                                        <td class="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                                            <div>
                                                <p> Jericho III (YA-4) </p>
                                                <p class="text-sm text-gray-400"> Nuclear-armed ICBM </p>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap text-gray-600 truncate"></td>
                                        <td class="whitespace-nowrap text-gray-600 truncate"> $380,000.00 </td>
                                        <td class="whitespace-nowrap text-gray-600 truncate"> 0% </td>
                                    </tr>
                                    <tr>
                                        <td class="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                                            <div>
                                                <p> Pym Particles (Pack of 10,000) </p>
                                                <p class="text-sm text-gray-400"> Redacted Description </p>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap text-gray-600 truncate"></td>
                                        <td class="whitespace-nowrap text-gray-600 truncate"> $280,000.00 </td>
                                        <td class="whitespace-nowrap text-gray-600 truncate"> 0% </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="p-9 border-b border-gray-200">
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <div>
                                            <p class="text-gray-500 text-sm"> Subtotal </p>
                                        </div>
                                        <p class="text-gray-500 text-sm"> $660,000.00 </p>
                                    </div>
                                    <div class="flex justify-between">
                                        <div>
                                            <p class="text-gray-500 text-sm"> Tax </p>
                                        </div>
                                        <p class="text-gray-500 text-sm"> $0.00 </p>
                                    </div>
                                    <div class="flex justify-between">
                                        <div>
                                            <p class="text-gray-500 text-sm"> Total </p>
                                        </div>
                                        <p class="text-gray-500 text-sm"> $660,000.00 </p>
                                    </div>
                                </div>
                            </div>
                            <div class="p-9 border-b border-gray-200">
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <div>
                                            <p class="font-bold text-black text-lg"> Amount Due </p>
                                        </div>
                                        <p class="font-bold text-black text-lg"> $360.00 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <Footer />
            </div>
        </section>
    )
}