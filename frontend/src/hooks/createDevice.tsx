// UseCreateDevice.tsx
import React, {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {ExclamationTriangleIcon} from "@heroicons/react/20/solid";
import {handleCreateDevice} from "../lib/device";

interface CreateDeviceProps {
    onClose: () => void;
    onCreate: (deviceName: string) => void;
    open: boolean; // You need to pass the 'open' prop to determine whether the dialog should be open or not.
}

const useCreateDevice: React.FC<CreateDeviceProps> = ({onClose, onCreate, open}) => {
    const [deviceName, setDeviceName] = useState("");
    const [deviceMessage, setDeviceMessage] = useState("");

    const handleCreate = async () => {
        if (deviceName.trim() !== "") {
            await handleCreateDevice({name: deviceName, message: deviceMessage})
                .then(() => {
                    setDeviceName("");
                    setDeviceMessage("");
                    onClose();
                })
                .catch((error) => {
                    console.error("Device creation failed CREATEDEVICE:", error);
                });
        }
    };

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="z-50 opacity-100 fixed inset-0 overflow-y-auto" onClose={onClose}>
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" >
                                <div className={`absolute  inset-0 ${open ? 'bg-neutral-500' : 'bg-gray-500'}`}></div>
                            </div>
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Create device
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Create device and monitor them in real time.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Device Name"
                                        value={deviceName}
                                        onChange={(e) => setDeviceName(e.target.value)}
                                        className="mt-4 w-full p-2 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Device Message"
                                        value={deviceMessage}
                                        onChange={(e) => setDeviceMessage(e.target.value)}
                                        className="mt-4 w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            onClick={handleCreate}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm sm:ml-3 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                            Create
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto">
                                            Cancel
                                        </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default useCreateDevice;
