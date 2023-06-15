import {useEffect} from "react";
import {UserData} from "../../lib/auth";

interface StatusProps {
    user: UserData | null;
}

const Status = ({ user }: StatusProps) => {
    useEffect(() => {
        document.title = "MDS | Status"
    })
    return (
        <div>
            {user != null && (
                <div>
                {/* Add Your Code Inside DIV!!! */}
                <h1>STATUS CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default Status