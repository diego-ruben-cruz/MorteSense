import {useEffect} from "react";
import {UserData} from "../../lib/auth";

interface SettingsProps {
    user: UserData | null;
}

const Settings = ({ user }: SettingsProps) => {
    useEffect(() => {
        document.title = "MDS | Settings"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>SETTINGS CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default Settings