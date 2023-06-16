import React, {useEffect, useState} from "react";
import {UserData} from "../../lib/auth";
import {Page} from "../../lib/types";
import AccountDetails from "./AccountDetails/AccountDetails";
import NotificationDetails from "./NotificationDetails/NotificationDetails";
import SensorDetails from "./SensorDetails/SensorDetails";
import {Link, Route, Routes, useLocation} from "react-router-dom";

interface SettingsProps {
    user: UserData | null;
}

const Settings = ({user}: SettingsProps) => {
    useEffect(() => {
        document.title = "MDS | Settings";
    }, []);

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [, setUser] = useState<UserData | null>(null);
    const location = useLocation();
    const [selectedSettings, setSelectedSettings] = useState("Account");

    const routes: Page[] = [
        {
            path: "/settings/account-details/*",
            view: <AccountDetails user={user}/>,
        },
        {
            path: "/settings/notification-details/*",
            view: <NotificationDetails user={user}/>,
        },
        {
            path: "/settings/sensor-details/*",
            view: <SensorDetails user={user}/>,
        },
    ];

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleUpdateProfile = (event: React.FormEvent) => {
        event.preventDefault();
        // Add your update logic here, it will likely involve making an API request
    };

    const settingsNavigation = [
        {
            id: "Account",
            name: "Account",
            href: "/settings/account-details",
            current: location.pathname.startsWith("/settings/account-details"),
        },
        {
            id: "Notifications",
            name: "Notifications",
            href: "/settings/notification-details",
            current: location.pathname.startsWith("/settings/notification-details"),
        },
        {
            id: "Sensor",
            name: "Sensor",
            href: "/settings/sensor-details",
            current: location.pathname.startsWith("/settings/sensor-details"),
        },
    ];

    return (
        <div>
            {user != null && (
                <div>
                    <header className="border-b flex border-gray-300">
                        <nav className="flex overflow-x-auto pb-8">
                            <ul className="flex min-w-full flex-none gap-x-10 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8">
                                {settingsNavigation.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.href}
                                            className={item.current ? "text-indigo-400" : ""}
                                            onClick={() => setSelectedSettings(item.id)}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </header>
                    <Routes>
                        {routes.map((page: Page, idx: number) => (
                            <Route key={idx} path={page.path} element={page.view}/>
                        ))}
                    </Routes>
                    {selectedSettings === "Account" && (<AccountDetails user={user}/>)}
                    {selectedSettings === "Notifications" && (<NotificationDetails user={user}/>)}
                    {selectedSettings === "Sensor" && <SensorDetails user={user}/>}
                </div>
            )}
        </div>
    );
};

export default Settings;
