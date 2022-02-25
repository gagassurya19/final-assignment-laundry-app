export default function Timeline(props) {
    let a;
    let b;
    let c;
    const next = (prop) => {
        switch (prop) {
            case 1:
                return a = true, b = false, c = false
            case 2:
                return a = true, b = true, c = false
            case 3:
                return a = true, b = true, c = true
            default:
                return a = false, b = false, c = false
        }
    }
    next(parseInt(props.page));

    return (
        <div className="w-full">
            <div class="mx-auto pt-10">
                <div class="flex">
                    <div class="w-1/3">
                        <div class="relative mb-2 -z-50">
                            {a === true ? (
                                <>
                                    <div class="w-10 h-10 mx-auto bg-indigo-500 rounded-full text-lg text-white flex items-center">
                                        <span class="text-center text-white w-full">
                                            <svg class="w-full h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div class="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                                        <span class="text-center text-gray-600  w-full">
                                            <svg class="w-full h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path></svg>
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div class="w-1/3">
                        <div class="relative mb-2 -z-50">
                            {b === true ? (
                                <>
                                    <div class="absolute flex align-center items-center align-middle content-center" style={{ width: "calc(100% - 2.5rem - 1rem)", top: "50%", transform: "translate(-50%, -50%)" }}>
                                        <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                            <div class="w-0 bg-indigo-300 py-1 rounded" style={{ width: "100%" }}></div>
                                        </div>
                                    </div>
                                    <div class="w-10 h-10 mx-auto bg-indigo-500 rounded-full text-lg text-white flex items-center">
                                        <span class="text-center text-white w-full">
                                            <svg class="w-full h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div class="absolute flex align-center items-center align-middle content-center" style={{ width: "calc(100% - 2.5rem - 1rem)", top: "50%", transform: "translate(-50%, -50%)" }}>
                                        <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                            <div class="w-0 bg-indigo-300 py-1 rounded" style={{ width: "0%" }}></div>
                                        </div>
                                    </div>
                                    <div class="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                                        <span class="text-center text-gray-600  w-full">
                                            <svg class="w-full h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div class="w-1/3">
                        <div class="relative mb-2 -z-50">
                            {c === true ? (
                                <>
                                    <div class="absolute flex align-center items-center align-middle content-center" style={{ width: "calc(100% - 2.5rem - 1rem)", top: "50%", transform: "translate(-50%, -50%)" }}>
                                        <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                            <div class="w-0 bg-indigo-300 py-1 rounded" style={{ width: "100%" }}></div>
                                        </div>
                                    </div>
                                    <div class="w-10 h-10 mx-auto bg-indigo-500 rounded-full text-lg text-white flex items-center">
                                        <span class="text-center text-white w-full">
                                            <svg class="w-full h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div class="absolute flex align-center items-center align-middle content-center" style={{ width: "calc(100% - 2.5rem - 1rem)", top: "50%", transform: "translate(-50%, -50%)" }}>
                                        <div class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                            <div class="w-0 bg-indigo-300 py-1 rounded" style={{ width: "0%" }}></div>
                                        </div>
                                    </div>

                                    <div class="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                                        <span class="text-center text-gray-600 w-full">
                                            <svg class="w-full h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}