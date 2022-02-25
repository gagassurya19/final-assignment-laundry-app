export default function Statistic(props){
    return(
        <section class="text-gray-600 body-font">
            <div class="container px-5 mx-auto">
                <div class="flex flex-wrap -m-4 text-center">
                <div class="p-4 sm:w-1/4 w-1/2">
                    <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{props.data.user}</h2>
                    <p class="leading-relaxed">Users</p>
                </div>
                <div class="p-4 sm:w-1/4 w-1/2">
                    <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{props.data.total_subscribers}</h2>
                    <p class="leading-relaxed">Subscribes</p>
                </div>
                <div class="p-4 sm:w-1/4 w-1/2">
                    <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{props.data.total_laundry}</h2>
                    <p class="leading-relaxed">Laundried</p>
                </div>
                <div class="p-4 sm:w-1/4 w-1/2">
                    <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{props.data.total_outlet}</h2>
                    <p class="leading-relaxed">Outlets</p>
                </div>
                </div>
            </div>
        </section>
    )
}