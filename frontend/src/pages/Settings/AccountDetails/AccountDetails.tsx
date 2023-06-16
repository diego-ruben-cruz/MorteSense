import {useEffect} from "react";
import {UserData} from "../../../lib/auth";

interface AccountDetailsProps {
    user: UserData | null;
}

const AccountDetails = ({ user }: AccountDetailsProps) => {
    useEffect(() => {
        document.title = "MDS | Account Details"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>ACCOUNT DETAILS  CONTENT</h1>

                    ACC ACC ACC

                </div>
            )}
        </div>
    );
}

export default AccountDetails