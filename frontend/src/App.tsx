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

function App() {

    const [user, setUser] = useState<UserData | null>(null);
    console.log("My user",user);

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
            view: <Overview/>,
        },
        {
            path: '/alerts/*',
            view: <Alerts/>,
        },
        {
            path: '/history/*',
            view: <History/>,
        },
        {
            path: '/status/*',
            view: <Status/>,
        },
        {
            path: '/analysis/*',
            view: <Analysis/>,
        },
        {
            path: '/settings/*',
            view: <Settings/>,
        },
        {
            path: '/help/*',
            view: <Help/>,
        },
        {
            path: '/profile-details/*',
            view: <ProfileDetails/>,
        },
        {
            path: '/privacy-policy/*',
            view: <PrivacyPolicy/>,
        },
        {
            path: '/terms-of-service/*',
            view: <TermsOfService/>,
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
            <ScrollToTop/>
            {/*<Navbar routes={routes}/>*/}
            {routes}
            <main className="flex-grow">
            </main>
            {/*<Footer/>*/}
        </div>
    );
}
export default App;

