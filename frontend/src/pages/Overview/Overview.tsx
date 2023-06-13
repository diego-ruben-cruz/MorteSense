import {useEffect} from "react";

const Overview = () => {
    useEffect(() => {
        document.title = "MDS | Overview"
    })
    return (
        <div>
            OVERVIEW CONTENT
        </div>
    )
}

export default Overview