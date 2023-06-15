import {useEffect} from "react";
import {UserData} from "../../lib/auth";

interface HelpProps {
    user: UserData | null;
}

const Help = ({user}: HelpProps) => {
    useEffect(() => {
        document.title = "MDS | Help"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>HELP CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default Help