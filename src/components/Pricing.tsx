import Link from 'next/link';

const Pricing = () => {
    const features = [
        { name: "DocBot Chats", free: "10", pro: "Unlimited" },
        { name: "GPT-4", free: "❌", pro: "✔"},
        // { name: "DALL-E 3", free: "❌", pro: "✔" },
        // { name: "Whisper", free: "❌", pro: "✔" },
        { name: "Image Generation", free: "5", pro: "50" },
        { name: "Audio Transcription", free: "5", pro: "50" },
    ];

    return (
        <section className="pb-10 sm:pb-16 lg:pb-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white/90 lg:text-5xl sm:text-5xl">Pricing & Plans</h2>
                    <p className="mt-4 text-xl text-gray-600 dark:text-white/80">Choose the plan that&apos;s right for you</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 font-bold">
                    {['Free', 'Pro'].map((plan, index) => (
                        <div key={plan} className={`rounded-2xl shadow-lg overflow-hidden ${index === 1 ? 'bg-[rgb(15,23,42)]' : 'bg-white'}`}>
                            <div className="p-8">
                                <h3 className={`text-2xl font-bold ${index === 1 ? 'text-white' : 'text-gray-900'}`}>{plan}</h3>
                                <p className={`mt-4 text-5xl font-extrabold ${index === 1 ? 'text-white' : 'text-gray-900'}`}>
                                    ${index === 0 ? '0' : '20'}
                                    <span className={`text-xl font-normal ${index === 1 ? 'text-white' : 'text-gray-500'}`}>/month</span>
                                </p>
                                <ul className="mt-8 space-y-4">
                                    {features.map((feature) => (
                                        <li key={feature.name} className="flex items-center">
                                            <span className={`ml-3 ${index === 1 ? 'text-white' : 'text-gray-600'}`}>
                                                {feature.name}: {index === 0 ? feature.free : feature.pro}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="px-8 pb-8">
                                <Link href="/signup" className={`block w-full px-6 py-3 text-center font-medium rounded-lg ${index === 1
                                        ? 'bg-white text-[rgb(15,23,42)] hover:bg-gray-50'
                                        : 'bg-[rgb(15,23,42)] text-white hover:bg-gray-800'
                                    }`}>
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;