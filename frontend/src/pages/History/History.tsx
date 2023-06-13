import {useEffect} from "react";

const History = () => {
    useEffect(() => {
        document.title = "MDS | History"
    })
    return (
        <div>
            <h1>HISTORY CONTENT</h1>
        </div>
    )
}

export default History