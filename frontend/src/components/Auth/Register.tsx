import React, {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {handleRegistration, UserData} from "../../lib/auth";

const Register = () => {
    useEffect(() => {
        document.title = "MDS | Register"
    })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: UserData = {
            email: email,
            password: password,
        };
        try {
            await handleRegistration(data);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-12 w-auto"
                         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                         alt="Your Company"/>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register an
                        account</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" onSubmit={handleSubmit} method="POST">

                            {/*<div>*/}
                            {/*    <label htmlFor="username"*/}
                            {/*           className="block text-sm font-medium leading-6 text-gray-900">Username</label>*/}
                            {/*    <div className="mt-2">*/}
                            {/*        <input*/}
                            {/*            id="username"*/}
                            {/*            name="username"*/}
                            {/*            type="username"*/}
                            {/*            autoComplete="username"*/}
                            {/*            onChange={e => setUsername(e.target.value)}*/}
                            {/*            required*/}
                            {/*            className="block mr-4 w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                {/* Connect Flask Here */}
                                <div className="text-sm">
                                    <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    type="submit">
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"/>
                                </div>

                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">Already have an account ?
                                    <Link to="/login"
                                          className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">Login</Link>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register