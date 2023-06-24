import React, {useEffect, useState} from 'react';
import { UserData } from '../../../lib/auth';
import AccountDetails from "./AccountDetails/AccountDetails";
import NotificationDetails from "./NotificationDetails/NotificationDetails";
import SensorDetails from "./SensorDetails/SensorDetails";
import {subSettings} from "../../../lib/types";
import {Link} from "react-router-dom";

interface SettingsProps {
    user: UserData | null;
}

const Settings = ({ user }: SettingsProps) => {
    useEffect(() => {
        document.title = 'MDS | Settings';
    }, []);

    const [selectedNavigation, setSelectedNavigation] = useState('Account');

    const handleNavLink = (event:any, name:any) => {
        event.preventDefault();
        setSelectedNavigation(name);
    };

    const secondaryNavigation:subSettings[] = [
        {name: 'Account', href: '/dashboard/settings/account-details'},
        {name: 'Notifications', href: '/dashboard/settings/notification-details'},
        {name: 'Sensor', href: '/dashboard/settings/sensor-details'},
    ];


    return (
        <div>
            {user != null && (
                <div>
                    {/*<AccountDetails user={user} />*/}

                    <nav className="flex overflow-x-auto rounded-lg py-4 bg-gray-100">
                        <ul className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8">
                            {secondaryNavigation.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.href}
                                        className={
                                            selectedNavigation === item.name
                                                ? 'bg-gray-50  text-rose-900 p-3 rounded-lg'
                                                : 'text-gray-700 hover:text-rose-900 p-3 rounded-lg hover:bg-gray-50'
                                        }
                                        onClick={(event) => handleNavLink(event, item.name)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>


                    {selectedNavigation === 'Account' && <AccountDetails user={user} />}
                    {selectedNavigation === 'Notifications' && <NotificationDetails user={user} />}
                    {selectedNavigation === 'Sensor' && <SensorDetails user={user} />}
                </div>
            )}
        </div>
    );
};

export default Settings;