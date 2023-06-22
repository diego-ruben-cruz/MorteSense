import React, {useEffect} from "react";
import {UserData} from "../../../lib/auth";

interface AnalysisProps {
    user: UserData | null;
}

const Analysis = ({user}: AnalysisProps) => {
    useEffect(() => {
        document.title = "MDS | Analysis"
    })


    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>ANALYSIS CONTENT</h1>
                </div>
            )}
        </div>
    );
}

export default Analysis