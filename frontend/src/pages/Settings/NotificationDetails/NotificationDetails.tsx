import {useEffect} from "react";
import {UserData} from "../../../lib/auth";

interface NotificationDetailsProps {
    user: UserData | null;
}

const NotificationDetails = ({ user }: NotificationDetailsProps) => {
    useEffect(() => {
        document.title = "MDS | Notification Details"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>NOTIFICATION DETAILS CONTENT</h1>

                    NOTIF NOTIF NOTIF
                </div>
            )}
        </div>
    );
}

export default NotificationDetails