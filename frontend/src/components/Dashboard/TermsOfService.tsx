import {useEffect} from "react";
import {UserData} from "../../lib/auth";

interface TermsOfServiceProps {
    user: UserData | null;
}

const TermsOfService = ({user}: TermsOfServiceProps) => {
    useEffect(() => {
        document.title = "MDS | Terms Of Service"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>TERMS OF SERVICE CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default TermsOfService