import {useEffect} from "react";

const Overview = () => {
    useEffect(() => {
        document.title = "MDS | Overview";
    }, []);


    return (
        <div>
            <h1>Overview</h1>
        </div>
    );
};

export default Overview;
