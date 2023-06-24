import React, {Fragment, useContext, useEffect, useState} from 'react'
import {useNavigate, useRoutes} from "react-router-dom";
import {Dialog, Menu, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon, UserIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Link, NavLink, useLocation} from "react-router-dom";
import {handleMe, logoutUser, UserData} from "../../lib/auth";
import {NavbarProps, Navigation} from "../../lib/types";
import AuthContext from "../../context/AuthProvider";

const navigation: Navigation[] = [
    {name: 'Overview', href: '/dashboard/overview', icon: HomeIcon},
    {name: 'Alerts', href: '/dashboard/alerts', icon: UsersIcon},
    {name: 'Status', href: '/dashboard/status', icon: CalendarIcon},
    {name: 'History', href: '/dashboard/history', icon: FolderIcon},
    {name: 'Analysis', href: '/dashboard/analysis', icon: DocumentDuplicateIcon},
    {name: 'Help', href: '/dashboard/help', icon: ChartPieIcon},
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({authRoutes}: NavbarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const {setAuth}: any = useContext(AuthContext);
    const [avatar, setAvatar] = useState(user?.avatar || '/male.svg');

    useEffect(() => {
        if (user && user.avatar) {
            setAvatar(user.avatar);
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setAuth({});
            navigate("/");
        } catch (error) {
            // Handle error
            console.error("Failed to logout:", error);
        }
    };

    const userNavigation = [
        {name: 'Sign out', href: "/", onClick: handleLogout},
    ]

    const handleSidebarNavLinkClick = () => {
        if (sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await handleMe();
                setUser(userData);
            } catch (error) {
                // Handle error
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const routing = useRoutes(authRoutes);

    return (
        <>
            <div>
                {/* Mobile Screen */}
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden " onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-gray-900/80"/>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full">
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1 ">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0">
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5 ">
                                            <button type="button" className="-m-2.5 p-2.5"
                                                    onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <NavLink to="/dashboard/overview">
                                                <img
                                                    className="h-8 w-auto"
                                                    src="/logo.png"
                                                    alt="Logo"
                                                />
                                            </NavLink>
                                        </div>
                                        <nav className="flex flex-1 flex-col ">
                                            <ul className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul className="-mx-2 space-y-1">
                                                        {navigation.map((item, index) => (
                                                            <li key={item.name}>
                                                                <NavLink key={index} to={item.href}
                                                                         onClick={handleSidebarNavLinkClick}
                                                                         className={classNames(
                                                                             item.href === location.pathname
                                                                                 ? "bg-gray-50 text-rose-900"
                                                                                 : "text-gray-700 hover:text-rose-900 hover:bg-gray-50",
                                                                             "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                         )}>
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.href === location.pathname ? 'text-rose-900' : 'text-gray-400 group-hover:text-rose-900',
                                                                            'h-6 w-6 shrink-0'
                                                                        )}
                                                                        aria-hidden="true"/>
                                                                    {item.name}
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li className="mt-auto">
                                                    <NavLink
                                                        onClick={handleSidebarNavLinkClick}
                                                        to="/dashboard/settings"
                                                        className={classNames(
                                                            location.pathname === "/dashboard/settings"
                                                                ? "bg-gray-50 text-rose-900"
                                                                : "text-gray-700 hover:text-rose-900 hover:bg-gray-50",
                                                            "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                                        )}>
                                                        <Cog6ToothIcon
                                                            className={classNames(
                                                                location.pathname === "dashboard/settings" ? "text-rose-900" : "text-gray-400 group-hover:text-rose-900",
                                                                "h-6 w-6 shrink-0"
                                                            )}
                                                            aria-hidden="true"/>
                                                        Settings
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>
                {/* Desktop Screen */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <NavLink to="/dashboard/overview"><img className="h-8 w-auto" src="/logo.png" alt="Logo"/></NavLink>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link to={item.href}
                                                      className={classNames(
                                                          item.href === location.pathname
                                                              ? 'bg-gray-50 text-rose-900'
                                                              : 'text-gray-700 hover:text-rose-900 hover:bg-gray-50',
                                                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                      )}>
                                                    <item.icon
                                                        className={classNames(
                                                            item.href === location.pathname ? 'text-rose-900' : 'text-gray-400 group-hover:text-rose-900',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"/>
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <NavLink
                                        to="/dashboard/settings"
                                        className={classNames(
                                            location.pathname === "/dashboard/settings"
                                                ? "bg-gray-50 text-rose-900"
                                                : "text-gray-700 hover:text-rose-900 hover:bg-gray-50",
                                            "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                        )}>
                                        <Cog6ToothIcon
                                            className={classNames(
                                                location.pathname === "/dashboard/settings" ? "text-rose-900" : "text-gray-400 group-hover:text-rose-900",
                                                "h-6 w-6 shrink-0"
                                            )} aria-hidden="true"/>
                                        Settings
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="lg:pl-72">
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                                onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                        {/* Separator */}
                        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"/>
                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">

                            <form className="relative flex flex-1" action="#" method="GET">
                                <div
                                    className="flex py-1 mt-2 text-gray-900  placeholder:text-gray-400 focus:ring-0 sm:text-sm">
                                    {/*{location.pathname === "/dashboard/settings" && (*/}
                                    {/*    <div className="flex gap-x-2">*/}
                                    {/*        {subSettings.map((item, index) => (*/}
                                    {/*            <NavLink*/}
                                    {/*                key={index}*/}
                                    {/*                to={item.href}*/}
                                    {/*                className={classNames(*/}
                                    {/*                    "text-gray-700 hover:text-indigo-600  hover:bg-gray-50",*/}
                                    {/*                    "group rounded-md p-2 text-sm font-semibold leading-6"*/}
                                    {/*                )}*/}
                                    {/*            >*/}
                                    {/*                {item.name}*/}
                                    {/*            </NavLink>*/}
                                    {/*        ))}*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </div>
                            </form>

                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                                <a href="/admin">
                                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Admin Page</span>
                                        <UserIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </a>
                                {/* Separator */}
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true"/>
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full bg-gray-50" src={avatar} alt=""/>
                                        <span className="hidden lg:flex lg:items-center">
                                            <span className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                                  aria-hidden="true">
                                                {user && (<div>{user.username}</div>)}
                                            </span>
                                            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({active}) => (
                                                        item.name === 'Sign out'
                                                            ? <button onClick={item.onClick}
                                                                      className='block px-3 py-1 hover:text-rose-600 text-sm leading-6 text-gray-900'>
                                                                {item.name}
                                                            </button>
                                                            : <NavLink to={item.href}
                                                                       className={classNames(
                                                                           item.href === location.pathname ? 'bg-gray-50' : '',
                                                                           'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                                       )}>
                                                                {item.name}
                                                            </NavLink>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <main>
                        <div className="py-5 px-4 sm:px-6 lg:px-8">
                            {routing}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}