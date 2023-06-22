import {useEffect} from "react";
import {UserData} from "../../../lib/auth";

interface OverviewProps {
    user: UserData | null;
}

const Overview = ({user}: OverviewProps) => {
    useEffect(() => {
        document.title = "MDS | Overview"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>OVERVIEW CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default Overview