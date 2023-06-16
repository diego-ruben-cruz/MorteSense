import React, {FormEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {handleLogin, UserData} from "../../lib/auth";
import {useNavigate} from "react-router-dom";
import "./auth.scss";

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: UserData = {
            email,
            password,
        };
        const response = await handleLogin(data);
        if (response === undefined) {
            console.log("Error occurred during login");
        } else {
            setUser(response);
            navigate("/*");
        }
    };

    return (
        <div className="login-container">
            <div className="xs:mx-auto xs:w-full xs:max-w-md">
                <img
                    className="logo"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="title">Sign in to your account</h2>
            </div>
            <div className="xs:mx-auto xs:w-full xs:max-w-md">
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
                                    className=" form-input"
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
                                <Link
                                    to="#"
                                    className="forgot-password"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                className="sign-in-button"
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
                                        className="dont-have-text font-medium text-indigo-600 hover:text-indigo-500 ml-1">Sign Up
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
