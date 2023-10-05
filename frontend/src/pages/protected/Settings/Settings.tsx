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
    ];

    return (
        <div>
            {user != null && (
                <div>
                    {/*<AccountDetails user={user} />*/}
                    {selectedNavigation === 'Account' && <AccountDetails user={user} />}
                    {selectedNavigation === 'Notifications' && <NotificationDetails user={user} />}
                    {selectedNavigation === 'Sensor' && <SensorDetails user={user} />}
                </div>
            )}
        </div>
    );
};

export default Settings;