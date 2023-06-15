import {useEffect} from "react";
import {UserData} from "../../lib/auth";

interface AlertsProps {
    user: UserData | null;
}
const Alerts = ({user}: AlertsProps) => {
    useEffect(() => {
        document.title = "MDS | Alerts"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>ALERTS CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default Alerts