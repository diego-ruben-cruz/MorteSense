import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { UserData, handleMe, logoutUser } from "../../lib/auth";

const Test = () => {
    useEffect(() => {
        document.title = "MDS | Test";
    });

    const { setAuth }: any = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await handleMe();
                setUser(userData);
            } catch (error) {
                // Handle error
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const logout = async () => {
        try {
            await logoutUser();
            setAuth({});
            navigate("/");
        } catch (error) {
            // Handle error
            console.error("Failed to logout:", error);
        }
    };

    return (
        <div>
            <h1>Test</h1>
            This is test page

            asd
            sad
            asd
            {user && (
                <div>
                    <br />
                    {user.name}
                    <br />
                    {user.username}
                    <br />
                    {user.email}
                    <br />
                    {user.id}

                </div>

            )}
            <div className="flex-grow">
                <br />
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    );
};

export default Test;
