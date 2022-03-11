import React from "react"
import { Modal } from "../../../components"

export default class modal_package extends React.Component {
    dummyData = [
        {
            id: 1,
            package_name: 'paket hemat',
            package_price: '5000'
        },
        {
            id: 2,
            package_name: 'paket cepat',
            package_price: '10000'
        }
    ];

    constructor() {
        super()
        this.state = {
            modal: "hidden",
            modal_content: {
                modal_title: 'Choose Package',
                modal_subTitle: 'Pilih tipe paket anda',
                modal_desc: 'Syarat Penggunaan: <br /> - Wajib memasukan semua kolom'
            },
            packageData: {
                package_name: '',
                package_price: ''
            }
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmitChangeList = this.onSubmitChangeList.bind(this);
    }

    // ambil value dari sessionStorage
    getSessionValue(){
        if(sessionStorage.getItem("packageIndex")){
            this.setState({
                packageData: {
                    package_name: this.dummyData[JSON.parse(sessionStorage.getItem("packageIndex"))].package_name,
                    package_price: this.dummyData[JSON.parse(sessionStorage.getItem("packageIndex"))].package_price,
                }
            });
        }
    }
    
    // ambil value dari data radio button
    onValueChange(event) {
        this.setState({
            selectedIndex: event.target.value
        });
    }

    // submit ke state
    async onSubmitChangeList(event) {
        event.preventDefault();
        await this.setState({
            packageData: {
                package_name: this.dummyData[this.state.selectedIndex].package_name,
                package_price: this.dummyData[this.state.selectedIndex].package_price
            }
        });
        await sessionStorage.setItem("packageIndex", this.state.selectedIndex);
    }

    toggleModal = (isOpen) => {
        if (isOpen) {
            this.setState({ modal: "flex" })
        } else {
            this.setState({ modal: "hidden" })
        }
    }

    componentDidMount() {
        this.getSessionValue()
    }

    render() {
        return (
            <>
                <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2"
                    onClick={() => { this.toggleModal(true) }}>
                    <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />  <line x1="3" y1="9" x2="7" y2="9" /></svg>
                    <span class="flex flex-col text-left pl-2">
                        {this.state.packageData.package_name ? (
                            <>
                                <span class="title-font font-medium text-gray-900">{this.state.packageData.package_name}</span>
                                <span class="text-gray-500 text-sm">{this.state.packageData.package_price}</span>
                            </>
                        ) : (
                            <>
                                <span class="title-font font-medium text-gray-900">Package</span>
                                <span class="text-gray-500 text-sm">Isi dengan jenis paket anda</span>
                            </>
                        )}
                    </span>
                </button>
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
                        <form method="POST" onSubmit={this.onSubmitChangeList}>
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-12 sm:col-span-12 w-full">
                                        {this.dummyData.map((data, index) => (
                                            <button type="button" class="inline-flex relative items-center py-5 px-4 w-full text-sm font-medium border-b hover:bg-gray-100 focus:z-10 focus:ring-2">
                                                <label class="inline-flex items-center">
                                                    <input type="radio" class="form-radio mr-2" name="accountType"
                                                        value={index}
                                                        onChange={this.onValueChange} />
                                                    <div class="flex justify-between">
                                                        <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="7" cy="17" r="2" />  <circle cx="17" cy="17" r="2" />  <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />  <line x1="3" y1="9" x2="7" y2="9" /></svg>
                                                        <span class="flex flex-col text-left pl-2">
                                                            <span class="title-font font-medium text-gray-900">{data.package_name}</span>
                                                            <span class="text-gray-500 text-sm">{data.package_price}</span>
                                                        </span>
                                                    </div>
                                                </label>
                                            </button>
                                        ))}
                                    </div>
                                </div>
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
                                    type="submit"
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