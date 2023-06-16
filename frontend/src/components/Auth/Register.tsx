import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleRegistration, UserData } from "../../lib/auth";
import "./auth.scss";

const Register = () => {
    useEffect(() => {
        document.title = "MDS | Register";
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: UserData = {
            email,
            password,
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
            <div className="login-container">
                <div className="xs:mx-auto xs:w-full xs:max-w-md">
                    <img
                        className="logo"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="title">Register an account</h2>
                </div>
                <div className="mt-8 xs:mx-auto xs:w-full xs:max-w-md">
                    <div className="form-container">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        className="form-input"
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
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="checkbox-container">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="checkbox-input"
                                    />
                                    <label htmlFor="remember-me" className="checkbox-label">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to="#" className="forgot-password">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button className="sign-in-button" type="submit">
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
                                            className="dont-have-text font-medium text-indigo-600 hover:text-indigo-500 ml-1">
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
