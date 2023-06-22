import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
    useEffect(() => {
        document.title = "MDS | Home";
    }, []);


    return (
        <>
            <div className="flex justify-center text-center flex-col py-10 items-center">
                <div className="py-10 bg-gray-50 content-width overflow-hidden rounded-lg xs:px-96 lg:px-0 ">
                    <div className="py-5 text-3xl md:text-6xl font-bold">
                        <h1>Unleash Intelligent Motion Tracking</h1>
                    </div>
                    <div className="px-4 py-5 mx-4 text-lg lg:text-2xl sm:p-6">
                        <p>
                            Experience the power of intelligent motion tracking with our state-of-the-art sensor
                            technology that utilizes microwaves for accurate detection. Monitor and analyze the detected
                            motion in real-time through our cutting-edge dashboard, providing you with actionable
                            insights and complete control over your tracking hardware.
                        </p>
                    </div>
                    <NavLink to="register"
                             className="text-white bg-gradient-to-br px-10 py-4 leading-7
                                active:from-gray-600 active:to-zinc-500 shadow-sm
                                from-gray-500 to-zinc-400 hover:bg-gradient-to-bl
                                focus:outline-none focus:ring-gray-200 font-medium rounded-lg
                                text-xs text-center mr-2 mb-2">Get Started
                    </NavLink>
                </div>

                <div className="flex justify-center content-width items-center flex-col py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="p-10 xs:mx-96 lg:mx-0 bg-gray-50  rounded-lg">
                            <h2 className="text-xl md:text-2xl font-bold text-center">Real-time Monitoring</h2>
                            <p className="mt-4">
                                Keep track of the motion activities in your space with our real-time monitoring feature.
                                Receive instant updates and notifications whenever motion is detected.
                            </p>
                        </div>
                        <div className="p-10 xs:mx-96 lg:mx-0 bg-gray-50 rounded-lg">
                            <h2 className="text-xl md:text-2xl font-bold text-center">Advanced Analytics</h2>
                            <p className="mt-4">
                                Gain valuable insights from the captured motion data with our advanced analytics
                                capabilities. Make data-driven decisions to optimize your space and improve security
                                measures.
                            </p>
                        </div>
                        <div className="p-10 xs:mx-96 lg:mx-0 bg-gray-50 rounded-lg">
                            <h2 className="text-xl md:text-2xl font-bold text-center">Easy Integration</h2>
                            <p className="mt-4">
                                Seamlessly integrate our intelligent motion tracking system into your existing
                                infrastructure. Our solution is compatible with various platforms and can be easily
                                customized to meet your specific needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default Home;
