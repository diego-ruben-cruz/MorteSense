import {useEffect} from "react";
import {UserData} from "../../lib/auth";

interface HistoryProps {
    user: UserData | null;
}

const History = ({ user }: HistoryProps) => {
    useEffect(() => {
        document.title = "MDS | History"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>HISTORY CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default History