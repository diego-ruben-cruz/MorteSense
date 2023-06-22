import Footer from "../Dashboard/Footer";
import Navbar from "../Dashboard/Navbar";
import React, { useEffect, useState } from "react";
import { handleMe, UserData } from "../../lib/auth";
import Overview from "../../pages/protected/Overview/Overview";
import Alerts from "../../pages/protected/Alerts/Alerts";
import Status from "../../pages/protected/Status/Status";
import Analysis from "../../pages/protected/Analysis/Analysis";
import Help from "../../pages/protected/Help/Help";
import PrivacyPolicy from "../Dashboard/PrivacyPolicy";
import TermsOfService from "../Dashboard/TermsOfService";
import History from "../../pages/protected/History/History";
import Settings from "../../pages/protected/Settings/Settings";
import AccountDetails from "../../pages/protected/Settings/AccountDetails/AccountDetails";
import NotificationDetails from "../../pages/protected/Settings/NotificationDetails/NotificationDetails";
import SensorDetails from "../../pages/protected/Settings/SensorDetails/SensorDetails";

const DashboardLayout = () => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            handleMe()
                .then((user) => setUser(user))
                .catch((err) => console.error(err));
        }
    }, []);

    const authRoutes = [
        { path: '/overview', element: <Overview user={user} /> },
        { path: '/alerts', element: <Alerts user={user} /> },
        { path: '/history', element: <History user={user} /> },
        { path: '/status', element: <Status user={user} /> },
        { path: '/analysis', element: <Analysis user={user} /> },
        { path: '/help', element: <Help user={user} /> },
        { path: '/privacy-policy', element: <PrivacyPolicy user={user} /> },
        { path: '/terms-of-service', element: <TermsOfService user={user} /> },
        { path: '/settings', element: <Settings user={user} /> },
        { path: '/settings/account-details/', element: <AccountDetails user={user} /> },
        { path: '/settings/notification-details/', element: <NotificationDetails user={user} /> },
        { path: '/settings/sensor-details/', element: <SensorDetails user={user} /> },
    ];



    return (
        <main className="App">
            <>
                <Navbar authRoutes={authRoutes} />
                <Footer />
            </>
        </main>
    );
};

export default DashboardLayout;