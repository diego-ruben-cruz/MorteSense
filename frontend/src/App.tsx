import React from 'react';
import {Route, Routes} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import {Page} from './lib/types';
import Navbar from './components/Navbar/Navbar';
import Alerts from './pages/Alerts/Alerts';
import History from './pages/History/History';
import Status from './pages/Status/Status';
import Analysis from './pages/Analysis/Analysis';
import Settings from './pages/Settings/Settings';
import Help from './pages/Help/Help';
import ProfileDetails from './components/ProfileDetails/ProfileDetails';
import Footer from './components/Footer/Footer';
import Overview from "./pages/Overview/Overview";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./components/TermsOfUse/TermsOfService";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";

const pages: Page[] = [
    {
        path: '/login/*',
        view: <Login/>,
    },
    {
        path: '/registration/*',
        view: <Registration/>,
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

function App() {
    const routes = (
        <Routes>
            {pages.map((page: Page, idx: number) => (
                <Route key={idx} path={page.path} element={page.view} />
            ))}
        </Routes>
    );

    return (
        <div className="App flex flex-col min-h-screen">
            <ScrollToTop />
            <Navbar routes={routes} />
            <main className="flex-grow"></main>
            <Footer />
        </div>
    );
}

export default App;
