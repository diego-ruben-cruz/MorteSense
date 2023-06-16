import React from "react";
import { UserData } from "../../lib/auth";

interface OverviewProps {
    user: UserData | null;
}

const Overview = ({ user }: OverviewProps) => {
    return (
        <div>
            {user != null && (
                <div>
                    <h1>OVERVIEW CONTENT</h1>
                </div>
            )}
        </div>
    );
};

export default Overview;
