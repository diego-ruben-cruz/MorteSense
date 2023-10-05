import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export interface DeviceData {
    id?: string;
    user_id?: string;
    name?: string;
}


export const handleCreateDevice = async (createDeviceData: DeviceData) => {
    const endpoint = "/create_device";
    try {
        const response = await axios.post(
            `${API_BASE_URL}${endpoint}`,
            createDeviceData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true,
            }
        );
        console.log("Created device successfully:", response.data);
        window.location.reload();
        return response.data; // You can return the response data if needed
    } catch (error) {
        console.error("Device create failed:", error);
        throw error; // Rethrow the error to be handled elsewhere
    }
};

export const handleDevices = (): Promise<DeviceData> => {
    const endpoint = "/devices";

    return new Promise<DeviceData>((resolve, reject) => {
        axios
            .get<DeviceData>(`${API_BASE_URL}${endpoint}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                withCredentials: true
            })
            .then((response:any) => {
                console.log("Device Data is set successfully:", response.data);
                resolve(response.data);
            })
            .catch((error:any) => {
                console.error("Device Data is set failed:", error);
                reject(error);
            });
    });
}

export const handleDeleteDevice = async (deviceData: DeviceData) => {
    try {
        const { id } = deviceData;

        if (!id) {
            console.error("Device ID is missing");
            return;
        }

        const endpoint = `/delete_device/${id}`;

        const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            withCredentials: true,
        });

        console.log("Device Deleted successfully:", response.data);
    } catch (error) {
        console.error("Device Deletion failed:", error);
        throw error; // Re-throw the error to propagate it further if needed
    }
}

export const handleUpdateDevice = async (updateDeviceData: { id: string }) => {
    try {
        const { id } = updateDeviceData;
        if (!id) {
            console.error("Device ID is missing");
            return;
        }
        const endpoint = `/update_device/${id}`;
        const response = await axios.put(`${API_BASE_URL}${endpoint}`, updateDeviceData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            withCredentials: true,
        });
        console.log("Device updated successfully:", response.data);
    } catch (error) {
        console.error("Device update failed:", error);
        throw error; // Re-throw the error to propagate it further if needed
    }
};
