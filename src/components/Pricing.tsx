import Link from 'next/link';

const Pricing = () => {
    return (
        <section className="py-10 bg-white sm:py-16 lg:py-24 bg-gradient-to-r from-rose-100 to-teal-100">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">Pricing &amp; Plans</h2>
                </div>

                {/* Desktop/Tablet version */}
                <div className="hidden mt-16 lg:block">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="py-8 pr-4"></th>

                                <th className="px-4 py-8 text-center">
                                    <span className="text-base font-medium text-blue-600"> Free </span>
                                    <p className="mt-6 text-6xl font-bold">$0</p>
                                    <p className="mt-2 text-base font-normal text-gray-500">Per month</p>
                                </th>

                                <th className="px-4 py-8 text-center bg-gray-900 rounded-t-xl">
                                    <span className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-full"> Pro </span>
                                    <p className="mt-6 text-6xl font-bold text-white">$20</p>
                                    <p className="mt-2 text-base font-normal text-gray-200">Per month</p>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="py-4 pr-4 font-medium border-b border-gray-200">DocBot Chats</td>
                                <td className="px-4 py-4 text-center border-b border-gray-200">10</td>
                                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">Unlimited</td>
                            </tr>

                            <tr>
                                <td className="py-4 pr-4 font-medium border-b border-gray-200">GPT-4</td>
                                <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                                    <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-4 pr-4 font-medium border-b border-gray-200">DALL-E 3</td>
                                <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                                    <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-4 pr-4 font-medium border-b border-gray-200">Whisper</td>
                                <td className="px-4 py-4 text-center border-b border-gray-200">-</td>
                                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">
                                    <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-4 pr-4 font-medium border-b border-gray-200">Image Generation</td>
                                <td className="px-4 py-4 text-center border-b border-gray-200">5</td>
                                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">50</td>
                            </tr>

                            <tr>
                                <td className="py-4 pr-4 font-medium border-b border-gray-200">Audio Transcription</td>
                                <td className="px-4 py-4 text-center border-b border-gray-200">5</td>
                                <td className="px-4 py-4 text-center text-white bg-gray-900 border-b border-white/20">50</td>
                            </tr>

                            <tr>
                                <td className="py-6 pr-4"></td>
                                <td className="px-4 py-6 text-center">
                                    <Link href="/signup" title="" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                                        Get Started
                                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                </td>
                                <td className="px-4 py-6 text-center text-white bg-yellow-500 rounded-b-xl">
                                    <Link href="/signup" title="" className="inline-flex items-center font-semibold text-white">
                                        Get Started
                                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Mobile version */}
                <div className="mt-12 border-t border-b border-gray-200 divide-y divide-gray-200 lg:hidden">
                    <div className="px-4 py-4 text-center">
                        <div className="text-base font-medium text-blue-600"> Free </div>
                        <p className="mt-2 text-6xl font-bold">$0</p>
                        <p className="mt-2 text-base font-normal text-gray-500">Per month</p>
                    </div>

                    <div className="px-4 py-4 text-center bg-gray-900 rounded-t-xl">
                        <div className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-full"> Pro </div>
                        <p className="mt-2 text-6xl font-bold text-white">$20</p>
                        <p className="mt-2 text-base font-normal text-gray-200">Per month</p>
                    </div>

                    {/* Feature rows for mobile */}
                    <div className="divide-y divide-gray-200">
                        <div className="flex items-center justify-between py-4 px-4">
                            <div className="font-medium">DocBot Chats</div>
                            <div className="text-center">10</div>
                            <div className="text-center text-white bg-gray-900 rounded-full">Unlimited</div>
                        </div>

                        <div className="flex items-center justify-between py-4 px-4">
                            <div className="font-medium">GPT-4</div>
                            <div className="text-center">-</div>
                            <div className="text-center text-white bg-gray-900 rounded-full">
                                <svg className="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Additional feature rows (repeat as needed) */}

                    </div>

                    <div className="px-4 py-6 text-center">
                        <Link href="/signup" title="" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                            Get Started
                            <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
