
export default function LazyLoad() {
    return (
        <>
            {/* <div class="flex items-center justify-center space-x-2">
                <div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div> */}
            <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-100 opacity-75 flex flex-col items-center justify-center">
                <div class="flex items-center justify-center space-x-2 mb-5">
                    <div class="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <h2 class="text-center text-black text-xl font-semibold">Loading...</h2>
                <p class="w-1/3 text-center text-black">This may take a few seconds, please don't close this page.</p>
            </div>
        </>
    )
}