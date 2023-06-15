import React, {useEffect, useState} from 'react';
import { Route, Routes} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import {Page} from './lib/types';
import Alerts from './pages/Alerts/Alerts';
import History from './pages/History/History';
import Status from './pages/Status/Status';
import Analysis from './pages/Analysis/Analysis';
import Settings from './pages/Settings/Settings';
import Help from './pages/Help/Help';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';
import Overview from "./pages/Overview/Overview";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./components/TermsOfUse/TermsOfService";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {handleMe, UserData} from "./lib/auth";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {

    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // replace this with a real API call to get user info
            handleMe().then(user => setUser(user)).catch(err => console.error(err));
        }
    }, []);

    const pages: Page[] = [
        {
            path: '/login',
            view: <Login setUser={setUser}/>,
        },
        {
            path: '/register',
            view: <Register/>,
        },
        {
            path: '/*',
            view: <Overview user={user}/>,
        },
        {
            path: '/alerts/*',
            view: <Alerts user={user}/>,
        },
        {
            path: '/history/*',
            view: <History user={user}/>,
        },
        {
            path: '/status/*',
            view: <Status user={user}/>,
        },
        {
            path: '/analysis/*',
            view: <Analysis user={user}/>,
        },
        {
            path: '/settings/*',
            view: <Settings user={user}/>,
        },
        {
            path: '/help/*',
            view: <Help user={user}/>,
        },
        {
            path: '/profile-details/*',
            view: <ProfileDetails user={user}/>,
        },
        {
            path: '/privacy-policy/*',
            view: <PrivacyPolicy user={user}/>,
        },
        {
            path: '/terms-of-service/*',
            view: <TermsOfService user={user}/>,
        },
    ];

    const routes = (
        <Routes>
            {pages.map((page: Page, idx: number) => (
                <Route key={idx} path={page.path} element={React.cloneElement(page.view, {setUser})}/>
            ))}
        </Routes>
    );
    return (
        <div className="App flex flex-col min-h-screen">
            {user != null ? (
                <div className="flex flex-col min-h-screen">
                    <ScrollToTop />
                    <Navbar routes={routes} />
                    <main className="flex-grow"></main>
                    <Footer />
                </div>
            ) : (
                <div>
                    <Login setUser={setUser} />
                </div>
            )}
        </div>
    );
}

export default App;

