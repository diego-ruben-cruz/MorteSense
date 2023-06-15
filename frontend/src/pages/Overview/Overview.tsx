import { useEffect } from "react";
import { UserData } from "../../lib/auth";

interface OverviewProps {
    user: UserData | null;
}

const Overview = ({ user }: OverviewProps) => {
    useEffect(() => {
        document.title = "MDS | Overview";
    }, []);

    return (
        <div>
            {user != null && (
                <div>
                    <h2>Logged in</h2>
                    <h3>ID: {user.id}</h3>
                    <h3>Email: {user.email}</h3>
                </div>
            )}
        </div>
    );
};

export default Overview;