import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import Home from "./pages/public/Home/Home";
import About from "./pages/public/About/About";
import {handleMe, UserData} from "./lib/auth";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import LandingLayout from "./components/LandingLayout/LandingLayout";
import ScrollToTop from "./hooks/ScrollToTop";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";

const ROLES = {
    'User': "2001",
    'Admin': "5150"
}

function App() {

    const [, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // replace this with a real API call to get user info
            handleMe().then(user => setUser(user)).catch(err => console.error(err));
        }
    }, []);

    return (

        <Routes>
            <Route path="/" element={<LandingLayout/>}>
                {ScrollToTop()}
                {/* Public Routes */}
                {/*<Route path="/" element={user ? <Test/> : <Home/>} />*/}
                <Route path="/" element={<Home/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="login" element={<Login setUser={setUser}/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="unauthorized" element={<Unauthorized/>}/>
            </Route>
                {/*<Route path="/" element={<Test/>}/>*/}
            <Route path="/dashboard/*" element={<DashboardLayout />} />

            {/*<Route path "settings" element={<Settings/>}/>*/}
                {/* Protected Routes */}
                {/*<Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>*/}
                {/*    <Route path="/overview" element={<Overview/>}/>*/}
                {/*</Route>*/}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
                    <Route path="dashboard/admin" element={<AdminDashboard/>}/>
                </Route>
                {/* Catch About Not Found Exception */}
                <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;