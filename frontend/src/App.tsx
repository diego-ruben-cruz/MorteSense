import React, {useEffect, useState} from 'react';
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
import Register from "./components/Auth/Register";
import {handleMe, UserData} from "./lib/auth";


const pages: Page[] = [
    {
        path: '/login',
        view: <Login/>,
        // view: <LoginPage/>,
    },
    {
        path: '/register',
        view: <Register/>,
        // view: <RegisterPage/>,
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
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        handleMe()
            .then((response) => {
                setUser(response);
            })
            .catch((error) => {
                console.log("Error:", error);
                console.log("Not authenticated");
            });
    }, []);

    const routes = (
        <Routes>
            {pages.map((page: Page, idx: number) => (
                <Route key={idx} path={page.path} element={React.cloneElement(page.view, { setUser })} />
            ))}
        </Routes>
    );
    return (
        <div className="App flex flex-col min-h-screen">
            <ScrollToTop/>
            {user != null ? (
                <div>
                    <h2>Logged in</h2>
                    <h3>ID: {user.id}</h3>
                    <h3>Email: {user.email}</h3>

                </div>
            ) : (
                <div>
                    <p>You are not logged in</p>
                    <div>
                        <a href="/login">
                            <button>Login</button>
                        </a>
                        <a href="/register">
                            <button>Register</button>
                        </a>
                    </div>
                </div>
            )}
            <Navbar routes={routes}/>
            <main className="flex-grow"></main>
            <Footer/>
        </div>
    );
}

export default App;