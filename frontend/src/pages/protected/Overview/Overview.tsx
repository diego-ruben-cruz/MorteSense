import React, {useEffect, useState} from "react";
import {UserData} from "../../../lib/auth";
import {CheckCircleIcon, ExclamationCircleIcon, PlusIcon} from "@heroicons/react/20/solid";
import {
    DeviceData,
    handleCreateDevice,
    handleDeleteDevice,
    handleDevices,
    handleUpdateDevice
} from "../../../lib/device";
import {Device} from "../../../lib/types";
import CreateDevice from "../../../hooks/CreateDevice";

interface OverviewProps {
    user: UserData | null;
}

const Overview: React.FC<OverviewProps> = ({user}) => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isCreateDeviceModalOpen, setIsCreateDeviceModalOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [editMode, setEditMode] = useState(false); // State variable to toggle edit mode
    const [newDeviceName, setNewDeviceName] = useState('');
    const [requestSent, setRequestSent] = useState("");

    const handleDeviceCreate = async () => {
        if (newDeviceName.trim() !== "") {
            try {
                const response = await handleCreateDevice({name: newDeviceName});
                if (response === undefined) {
                    console.log("Error occurred during device creation");
                }
                setRequestSent("success");
            } catch (error) {
                setRequestSent("failure");
                console.error("Failed to create device: OVERVIEW", error);
            } finally {
                setTimeout(() => setRequestSent(""), 3000);
            }
        }
    };

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const fetchedDevices = await handleDevices();
                setDevices(fetchedDevices as Device[]);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };
        fetchDevices();
    }, []);


    const handleDeviceDelete = async (deviceData: DeviceData) => {
        try {
            await handleDeleteDevice(deviceData);
            console.log("Device deletion successful");
            window.location.reload();
        } catch (error) {
            console.error("Device deletion failed:", error);
        }
    }

    useEffect(() => {
        document.title = "MDS | Overview";
    }, []);

    const openCreateDeviceModal = () => {
        setIsCreateDeviceModalOpen(true);
    };

    const closeCreateDeviceModal = () => {
        setIsCreateDeviceModalOpen(false);
    };

    const handleEditClick = (e: any) => {
        e.preventDefault();
        setEditMode(true);
    };


    const handleSaveClick = async (device: Device) => {
        try {

            const updatedDevice = {
                ...device,
                name: newDeviceName,
            };

            await handleUpdateDevice(updatedDevice);

            setDevices((prevDevices) => {
                return prevDevices.map((d) => {
                    if (d.id === updatedDevice.id) {
                        return updatedDevice;
                    }
                    return d;
                });
            });
            setEditMode(false); // Disable edit mode after saving
        } catch (error) {
            console.error("Failed to update device data:", error);
        }
    };


    const handleCancelClick = () => {
        setEditMode(false);
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
                            <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
                            Create Device
                        </button>
                    </div>

                    {requestSent && (
                        <div
                            className={`rounded-md fixed md:top-44 md:left-52 md:right-52 xs:top-32 xs:right-20 xs:left-20 bg-green-50 p-4 text-center z-50 shadow-md ${
                                requestSent === "success" ? "block" : "hidden"
                            }`}
                        >
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">Account has been registered
                                        successfully</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {requestSent && (
                        <div
                            className={`rounded-md fixed md:top-44 md:left-52 md:right-52 xs:top-32 xs:right-20 xs:left-20 bg-red-50 p-4 text-center z-50 shadow-md ${
                                requestSent === "failure" ? "block" : "hidden"
                            }`}
                        >
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">CORS error. Please try
                                        again.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <hr className="my-4 border-t border-gray-300"/>

                    <div className="flex flex-wrap">
                        {devices.map((device, index) => (
                            <div
                                key={index}
                                className={`w-full md:w-full lg:w-1/2 xl:w-1/2 p-4 relative ${
                                    hoveredIndex === index ? "hovered" : ""
                                }`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div
                                    className="relative bg-white shadow-md rounded-t-lg p-6 h-32 flex flex-col justify-center">
                                    {editMode ? (
                                        <input
                                            placeholder="Name"
                                            value={newDeviceName}
                                            onChange={(e) => setNewDeviceName(e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                        />
                                    ) : (
                                        <>
                                            <p className="text-center">
                                                {device.name}
                                            </p>
                                            <p className="text-center">
                                                <strong>Device ID:</strong> {device.id}
                                            </p>
                                            <p className="text-center">
                                                <strong>User ID:</strong> {device.user_id}
                                            </p>
                                        </>


                                    )}
                                </div>
                                {hoveredIndex === index && (
                                    <div
                                        className="bg-gray-50 rounded-b-lg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        {editMode ? (
                                            <>
                                                <button
                                                    onClick={() => handleSaveClick(device)}
                                                    className="text-white bg-gradient-to-br px-10 py-2 leading-7
            active:from-rose-900 active:to-red-800 shadow-sm
            from-rose-900 to-red-700 hover:bg-gradient-to-bl
            focus:outline-none focus:ring-red-200 font-medium rounded-lg
            text-xs text-center mr-2 mb-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelClick}
                                                    className="text-white bg-gradient-to-br px-10 py-2 leading-7
            active:from-rose-900 active:to-red-800 shadow-sm
            from-rose-900 to-red-700 hover:bg-gradient-to-bl
            focus:outline-none focus:ring-red-200 font-medium rounded-lg
            text-xs text-center mr-2 mb-2"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    className="text-white bg-gradient-to-br px-10 py-2 leading-7
            active:from-rose-900 active:to-orange-800 shadow-sm
            from-rose-900 to-orange-700 hover:bg-gradient-to-bl
            focus:outline-none focus:ring-orange-200 font-medium rounded-lg
            text-xs text-center mr-2 mb-2"
                                                    onClick={handleEditClick}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeviceDelete({id: device.id})}
                                                    className="text-white bg-gradient-to-br px-10 py-2 leading-7
            active:from-rose-900 active:to-red-800 shadow-sm
            from-rose-900 to-red-700 hover:bg-gradient-to-bl
            focus:outline-none focus:ring-red-200 font-medium rounded-lg
            text-xs text-center mr-2 mb-2"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isCreateDeviceModalOpen && (
                <CreateDevice open={true} onClose={closeCreateDeviceModal} onCreate={handleDeviceCreate}/>
            )}
        </div>
    );
};

export default Overview;
