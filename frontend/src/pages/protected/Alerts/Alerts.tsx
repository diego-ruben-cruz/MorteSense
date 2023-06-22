import React, { useEffect } from "react";
import { UserData } from "../../../lib/auth";

interface AlertsProps {
    user: UserData | null;
}

const Alerts = ({ user }: AlertsProps) => {
    useEffect(() => {
        document.title = "MDS | Alerts";
    }, []);

    return (
        <div>
            {user != null && (
                <div>
                    <h1>ALERTS CONTENT</h1>
                    {/* Add your code inside this div */}
                </div>
            )}
        </div>
    );
};

export default Alerts;
