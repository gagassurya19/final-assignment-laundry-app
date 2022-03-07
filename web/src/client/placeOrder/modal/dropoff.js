import React from "react"
import { Modal } from "../../../components"

import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/airbnb.css";

export default class Modal_dropoff extends React.Component {
    constructor() {
        super()
        this.state = {
            modal: "hidden",
            addAddress: false,
            modal_content: {
                modal_title: 'Choose Drop Off Schedule',
                modal_subTitle: 'Pilih jadwal pengantaran',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            date: new Date(),
            selected_date: "",
            time: new Date(),
            selected_time: ""
        }
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    addAddress = (isOpen) => {
        this.setState({ addAddress: isOpen })
    }

    deleteInputDatePicker = () => {
        var elements = document.querySelectorAll(".flatpickr-input");
        elements.forEach(element => {
            element.remove();
        });
    }

    componentDidMount() {
        this.deleteInputDatePicker()
    }

    render() {
        const { date, time } = this.state;
        return (
            <>
                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2"
                    onClick={() => { this.toggleModal(true) }}>
                    <svg class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span class="flex flex-col text-left pl-2">
                        {this.state.selected_date && this.state.selected_time !== "" ? (
                            <>
                                <span class="title-font font-medium text-gray-900">Drop Off</span>
                                <span class="text-gray-500 text-sm">Akan di Drop Off pada <span class="font-semibold">{this.state.selected_date}</span> di jam <span class="font-semibold">{this.state.selected_time}</span></span>
                            </>
                        ) : (
                            <>
                                <span class="title-font font-medium text-gray-900">Drop Off</span>
                                <span class="text-gray-500 text-sm">Pilih tanggal dan jam penjemputan</span>
                            </>
                        )}
                    </span>
                </button>
                {/* modal */}
                <Modal modal={this.state.modal}>
                    {/* notes */}
                    <div class="flex flex-col space-y-9">
                        <div>
                            <h3 class="text-lg font-medium leading-6 text-gray-900">{this.state.modal_content.modal_title}</h3>
                            <p class="mb-8 leading-relaxed text-gray-500">{this.state.modal_content.modal_subTitle}</p>
                            <p class="mt-1 text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: this.state.modal_content.modal_desc }}></p>
                        </div>
                        {this.state.selected_date && this.state.selected_time !== "" ? (
                            <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative my-5 text-center">
                                <h3 class="text-lg font-medium leading-6 text-gray-900">
                                    Laundry kamu akan dikirim pada tanggal {this.state.selected_date} di jam {this.state.selected_time}
                                </h3>
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                    {/* Form */}
                    <div>
                    <form method="POST" >
                            <div className="p-5 pl-5 content-center" id="date-modal">
                                {/* <DatePicker /> */}
                                <h3 class="text-lg font-medium leading-6 text-gray-900">Select Date: {this.state.selected_date}</h3>
                                <Flatpickr
                                    value={date}
                                    options={{
                                        minDate: 'today',
                                        inline: true,
                                        disable: [
                                            function (date) {
                                                // return true to disable
                                                return (date.getDay() === 0 || date.getDay() === 6);
                                            }
                                        ],
                                    }}
                                    onChange={date => {
                                        this.setState({ date });
                                        this.setState({ selected_date: date[0].toLocaleDateString() })
                                    }}
                                />
                                <h3 class="text-lg font-medium leading-6 text-gray-900 mt-5">Select Time: {this.state.selected_time}</h3>
                                <Flatpickr
                                    value={time}
                                    options={{
                                        inline: true,
                                        enableTime: true,
                                        noCalendar: true,
                                        dateFormat: "H:i",
                                        minTime: "09:00",
                                        maxTime: "15:30",
                                        time_24hr: true
                                    }}
                                    onChange={time => {
                                        this.setState({ time });
                                        this.setState({ selected_time: time[0].toLocaleTimeString() })
                                    }}
                                />
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => this.toggleModal(false)}>
                                    Close
                                </button>
                                <button
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    type="button"
                                    onClick={() => this.toggleModal(false)}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal >
            </>
        )
    }
}