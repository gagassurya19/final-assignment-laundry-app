import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../../components';

export default class Done extends React.Component {
    constructor() {
        super();
        this.state = {
            isSuccess: true,
            invoice: sessionStorage.getItem('invoice'),
        }
    }
    render() {
        return (
            <section>
                <div className="container mx-auto">
                    <div class=" mx-auto py-10 md:py-16">
                        {this.state.isSuccess ? (
                            <div id="alert-additional-content-3" class="p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200" role="alert">
                                <div class="flex items-center">
                                    <svg class="mr-2 w-5 h-5 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <h3 class="text-lg font-medium text-green-700 dark:text-green-800">Your Transaction is Success</h3>
                                </div>
                                <div class="mt-2 mb-4 text-sm text-green-700 dark:text-green-800">
                                    View the invoice in the button below. You can also print the invoice. <br />
                                </div>
                                <div class="flex">
                                    <Link to={`/order/${this.state.invoice}`} type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-800 dark:hover:bg-green-900">
                                        <svg class="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                                        View Invoice
                                    </Link>
                                    <Link to="/home" type="button" class="text-green-700 bg-transparent border border-green-700 hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-green-800 dark:text-green-800 dark:hover:text-white" data-collapse-toggle="alert-additional-content-3" aria-label="Close">
                                        Dismiss
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div id="alert-additional-content-2" class="p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
                                <div class="flex items-center">
                                    <svg class="mr-2 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <h3 class="text-lg font-medium text-red-700 dark:text-red-800">Your Transaction is Fail</h3>
                                </div>
                                <div class="mt-2 mb-4 text-sm text-red-700 dark:text-red-800">
                                    Please try again. 
                                </div>
                                <div class="flex">
                                    <Link to="/order" type="Button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900">
                                        <svg class="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                                        Try Again
                                    </Link>
                                    <Link to="/home" type="Button" class="text-red-700 bg-transparent border border-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-red-800 dark:text-red-800 dark:hover:text-white" data-collapse-toggle="alert-additional-content-2" aria-label="Close">
                                        Dismiss
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <Footer />
                </div>
            </section>
        )
    }
}