import {useEffect, useState} from "react";
import {UserData} from "../../lib/auth";
import {Link} from "react-router-dom";

const Overview = () => {
    useEffect(() => {
        document.title = "MDS | Overview";
    }, []);

    const [user] = useState<UserData>();

    return (
        <div>
            {user != null ? (
                <div>
                    <h2>Logged in</h2>
                    <h3>ID: {user.id}</h3>
                    <h3>Email: {user.email}</h3>

                </div>
            ) : (
                <div>
                    <p>You are not logged in</p>
                    <br />
                    <br />
                    <br />
                    <br />

                    <div>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/register">
                            <button>Register</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Overview;
