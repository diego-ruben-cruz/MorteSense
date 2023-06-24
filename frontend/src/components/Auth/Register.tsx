import React, {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./auth.css";
import { handleRegistration, UserData} from "../../lib/auth";
import {CheckCircleIcon, ExclamationCircleIcon} from "@heroicons/react/20/solid";

const Register = () => {
    useEffect(() => {
        document.title = "MDS | Register";
    }, []);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [requestSent, setRequestSent] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: UserData = {
            name,
            username,
            email,
            password,
        };

        try {
            const response = await handleRegistration(data);
            if (response === undefined) {
                console.log("Error occurred during registration");
            }
            else {
                navigate("/login");
            }
            setRequestSent("success");
            setName("");
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error:any) {
            if (error.response && error.response.status === 403) {
                setRequestSent("failure");
            }
        }
        finally {
            setTimeout(() =>
                setRequestSent(""), 3000);
        }
    };

    return (
        <div>
            <div className="login-container">
                <div className="xs:mx-auto xs:w-full xs:max-w-md">
                    <h2 className="title text-rose-900">Register an account</h2>
                </div>
                <div className="mt-8 xs:mx-auto xs:w-full xs:max-w-md">
                    <div className="form-container">
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
                                        <p className="text-sm font-medium text-green-800">Account has been registered
                                            successfully</p>
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
                                        <p className="text-sm font-medium text-red-800">CORS error. Please try
                                            again.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                    />
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

                            <div>
                                <button className="sign-in-button bg-rose-900" type="submit">
                                    Sign up
                                </button>
                            </div>
                        </form>
                        <div className="mt-6">
                            <div className="relative sign-up">
                                <div className="sign-up-divider">
                                    <div className="sign-up-divider-line"></div>
                                    <div className="dont-have-text">
                                        <span>Already have an account?</span>
                                        <Link
                                            to="/login"
                                            className="dont-have-text font-medium text-rose-900 hover:text-rose-500 ml-1">
                                            Login
                                        </Link>
                                    </div>
                                    <div className="sign-up-divider-line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
