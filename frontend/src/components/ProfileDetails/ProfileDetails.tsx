import {useEffect} from "react";
import {UserData} from "../../lib/auth";

interface ProfileDetailsProps {
    user: UserData | null;
}

const ProfileDetails = ({user}: ProfileDetailsProps) => {
    useEffect(() => {
        document.title = "MDS | Profile Details"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>PROFILE DETAILS CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default ProfileDetails