import React, {FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./auth.css";
import {handleLogin, UserData} from "../../lib/auth";
import {CheckCircleIcon, ExclamationCircleIcon} from "@heroicons/react/20/solid";

interface LoginProps {
    setUser: (user: UserData | null) => void;
}

const Login = ({setUser}: LoginProps) => {

    useEffect(() => {
        document.title = "MDS | Login";
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [requestSent, setRequestSent] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const data: UserData = {
            email,
            password,
        };

        try {
            const response = await handleLogin(data);
            if (response === undefined) {
                console.log("Error occurred during login");
            } else {
                setUser(response);
                navigate("/dashboard/overview", {replace: true});
            }
            setRequestSent("success");
            setEmail("");
            setPassword("");
        } catch (error:any) {
            if (error.response && error.response.status === 401) {
                setRequestSent("failure");
            } else {
                setRequestSent("disaster");
            }
        }
        finally {
            setTimeout(() =>
                setRequestSent(""), 3000);
        }
    };


    return (
        <div className="login-container ">
            <div className="xs:mx-auto xs:w-full xs:max-w-md">
                <h2 className="title text-rose-900">Sign in to your account</h2>
            </div>
            <div className="xs:mx-auto xs:w-full xs:max-w-md">
                {requestSent && (
                    <div
                        className={`rounded-md fixed md:top-44 md:left-52 md:right-52 xs:top-32 xs:right-20 xs:left-20 bg-green-50 p-4 text-center z-50 shadow-md ${
                            requestSent === "success" ? "block" : "hidden"
                        }`}
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">Welcome to Dashboard</p>
                            </div>
                        </div>
                    </div>
                )}
                {requestSent && (
                    <div
                        className={`rounded-md fixed md:top-44 md:left-52 md:right-52 xs:top-32 xs:right-20 xs:left-20 bg-red-50 p-4 text-center z-50 shadow-md ${
                            requestSent === "failure" ? "block" : "hidden"
                        }`}
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">Account doesn't exist.</p>
                            </div>
                        </div>
                    </div>
                )}
                {requestSent && (
                    <div
                        className={`rounded-md fixed md:top-44 md:left-52 md:right-52 xs:top-32 xs:right-20 xs:left-20 bg-red-50 p-4 text-center z-50 shadow-md ${
                            requestSent === "disaster" ? "block" : "hidden"
                        }`}
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">CORS error. Please try again.</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <div className="mt-2 ">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="checkbox-container">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="checkbox-input bg-rose-900"
                                />
                                <label htmlFor="remember-me" className="checkbox-label text-gray-600">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    to="#"
                                    className="forgot-password text-gray-600">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                className="sign-in-button bg-rose-900"
                                type="submit"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative sign-up">
                            <div className="sign-up-divider">
                                <div className="sign-up-divider-line"></div>
                                <div className="dont-have-text">
                                    <span>Don't have an account?</span>
                                    <Link
                                        to="/register"
                                        className="dont-have-text font-medium text-rose-900 hover:text-rose-600 ml-1">Sign
                                        Up
                                    </Link>
                                </div>
                                <div className="sign-up-divider-line"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
