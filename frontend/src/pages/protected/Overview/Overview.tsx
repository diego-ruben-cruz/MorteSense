import React, { useEffect, useState } from "react";
import { UserData } from "../../../lib/auth";
import CreateDevice from "../../../hooks/createDevice";
import {PlusIcon } from "@heroicons/react/20/solid";

interface OverviewProps {
    user: UserData | null;
}

const Overview: React.FC<OverviewProps> = ({ user }) => {
    const [devices, setDevices] = useState<string[]>([]);
    const [isCreateDeviceModalOpen, setIsCreateDeviceModalOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleDeviceCreate = (newDeviceName: string) => {
        if (newDeviceName.trim() !== "") {
            setDevices([...devices, newDeviceName]);
        }
    };

    useEffect(() => {
        document.title = "MDS | Overview";
    }, []);

    const openCreateDeviceModal = () => {
        setIsCreateDeviceModalOpen(true);
    };

    const closeCreateDeviceModal = () => {
        setIsCreateDeviceModalOpen(false);
    };

    return (
        <div>
            {user != null && (
                <div>
                    <div>
                        <button
                            onClick={openCreateDeviceModal}
                            type="button"
                            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                            Create Device
                        </button>
                    </div>

                    <hr className="my-4 border-t border-gray-300" />
                    
                    <div className="flex flex-wrap">
                        {devices.map((device, index) => (
                            <div
                                key={index}
                                className={`w-full md:w-full lg:w-1/2 xl:w-1/2 p-4 relative ${
                                    hoveredIndex === index ? "hovered" : ""}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}>
                                <div className="relative bg-white shadow-md rounded-t-lg p-6 h-32 flex flex-col justify-center">
                                    <p className="text-center">{device}</p>
                                </div>
                                {hoveredIndex === index && (
                                    <div className="bg-gray-50 rounded-b-lg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isCreateDeviceModalOpen && (
                <CreateDevice open={true} onClose={closeCreateDeviceModal} onCreate={handleDeviceCreate} />
            )}
        </div>
    );
};

export default Overview;
