import { Link } from "react-router-dom";
export default function Price(props) {
    return (
        <section id="package" >
            <div class="text-gray-600 body-font overflow-hidden pt-20 pb-10">
                <div class="container px-5 mx-auto">
                    <div class="flex flex-col text-center w-full mb-20">
                        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">{props.data.title}</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">{props.data.subTitle}</p>
                    </div>
                    <div class="flex flex-wrap -m-4 mx-auto ">
                        {props.data.package_offer.map((item) => (
                            <div class="p-4 xl:w-1/3 md:w-1/2 w-full">
                                <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative">
                                    <h2 class="text-sm tracking-widest title-font mb-1 font-medium">Rp{item.price}{item.per}</h2>
                                    <h1 class="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">{item.title}</h1>
                                    <p class="flex items-center text-gray-600 mb-2">
                                        {item.details}
                                    </p>
                                    <Link to="/order">
                                        <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Order Now
                                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {/* basic */}
                    </div>
                </div>
            </div>
        </section>
    )
}