import React, {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./auth.css";
import {handleRegistration, UserData} from "../../lib/auth";

const Register = () => {
    useEffect(() => {
        document.title = "MDS | Register";
    }, []);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: UserData = {
            name,
            username,
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
                    <h2 className="title">Register an account</h2>
                </div>
                <div className="mt-8 xs:mx-auto xs:w-full xs:max-w-md">
                    <div className="form-container">
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
                                        className="form-input"
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
                                        className="form-input"
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
