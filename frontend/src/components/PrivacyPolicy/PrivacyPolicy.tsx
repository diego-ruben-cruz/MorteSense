import {useEffect} from "react";
import {UserData} from "../../lib/auth";

interface PrivacyPolicyProps {
    user: UserData | null;
}

const PrivacyPolicy = ({user}: PrivacyPolicyProps) => {
    useEffect(() => {
        document.title = "MDS | Privacy Policy"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>PRIVACY POLICY CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default PrivacyPolicy