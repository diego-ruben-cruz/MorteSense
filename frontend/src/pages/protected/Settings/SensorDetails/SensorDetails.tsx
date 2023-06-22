import {useEffect} from "react";
import {UserData} from "../../../../lib/auth";


interface SensorDetailsProps {
    user: UserData | null;
}

const SensorDetails = ({ user }: SensorDetailsProps) => {
    useEffect(() => {
        document.title = "MDS | Sensor Details"
    })
    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <h1>SENSOR DETAILS CONTENT</h1>

                    SENS SENS SENS
                </div>
            )}
        </div>
    );
}

export default SensorDetails