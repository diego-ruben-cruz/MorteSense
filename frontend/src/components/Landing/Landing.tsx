import React from "react";
import "./Landing.modules.css";
import { NavLink, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";

interface NavigationButton {
    name: string;
    href: string;
}

const navigation: NavigationButton[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
];

const Landing = () => {
    const location = useLocation();

    const activeLg = "text-gray-600 border-b border-gray-600 px-3 py-2 text-sm font-medium";
    const inactiveLg = "text-gray-500 hover:text-gray-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out";
    const activeSm = "block px-3 py-2 rounded-md text-base font-medium text-gray-600 bg-gray-50";
    const inactiveSm = "block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-600 hover:bg-gray-50 duration-150 ease-in-out";

    return (
        <Disclosure as="nav" className="bg-white select-none shadow sticky">
            {({ open }) => (
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center">
                        <NavLink className="" to="/">
                            <img
                                src="/logo.png"
                                className="h-20 w-auto"
                                width={50}
                                height={50}
                                alt=""
                            />
                        </NavLink>
                        <div className="hidden lg:block lg:ml-10 lg:space-x-8">
                            {navigation.map((item, idx) => (
                                <NavLink
                                    key={idx}
                                    to={item.href}
                                    className={location.pathname === item.href ? activeLg : inactiveLg }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                        <div className="flex gap-x-4">
                            <NavLink to="login"
                                     className="text-black px-10 py-2 leading-7
                                active:from-white active:to-gray-200 shadow-sm
                                from-white to-gray-50 hover:bg-gradient-to-bl
                                focus:outline-none focus:ring-gray-200 font-medium rounded-lg
                                text-xs text-center mr-2 mb-2">Login
                            </NavLink>
                            <NavLink to="register"
                                     className="text-white bg-gradient-to-br px-10 py-2 leading-7
                                active:from-gray-600 active:to-zinc-500 shadow-sm
                                from-gray-500 to-zinc-400 hover:bg-gradient-to-bl
                                focus:outline-none focus:ring-gray-200 font-medium rounded-lg
                                text-xs text-center mr-2 mb-2">Register
                            </NavLink>
                        </div>

                        <Disclosure.Button
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 transition duration-150 ease-in-out">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            )}
                        </Disclosure.Button>

                    </div>
                    <Disclosure.Panel className="lg:hidden pt-2 pb-3 px-2 space-y-1">
                        {navigation.map((item, idx) => (
                            <Disclosure.Button as={NavLink}
                                               key={idx}
                                               to={item.href}
                                               className={location.pathname === item.href ? activeSm : inactiveSm}
                            >
                                {item.name}
                            </Disclosure.Button>
                        ))}
                    </Disclosure.Panel>
                </div>

            )}
        </Disclosure>
    );
};
export default Landing;