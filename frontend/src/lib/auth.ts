import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export interface UserData {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    current_password?: string;
    new_password?: string;
    confirm_password?: string;
    avatar?: string;
    token?: string;
    phone?: string;
    roles?: string[];
}


export const handleMe = (): Promise<UserData> => {
    const endpoint = "/@me";

    return new Promise<UserData>((resolve, reject) => {
        axios
            .get<UserData>(`${API_BASE_URL}${endpoint}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                withCredentials: true
            })
            .then((response:any) => {
                console.log("Data is set successfully:", response.data);
                resolve(response.data);
            })
            .catch((error:any) => {
                console.error("Data is set failed:", error);
                reject(error);
            });
    });
};

export const handleRegistration = (registrationData: UserData) => {
    const endpoint = "/register";

    return new Promise<void>((resolve, reject) => {
        axios
            .post(`${API_BASE_URL}${endpoint}`, registrationData, {
                withCredentials: true,
            })
            .then((response:any) => {
                console.log("Registered successfully:", response.data);
                resolve();
            })
            .catch((error:any) => {
                console.error("Registration failed:", error);
                reject(error);
            });
    });
};

export const handleLogin = (loginData: UserData) => {
    const endpoint = "/login";

    return new Promise<UserData>((resolve, reject) => {
        axios
            .post<UserData>(`${API_BASE_URL}${endpoint}`, loginData, { withCredentials: true })
            .then((response:any) => {
                console.log("Server response:", response.data); // Add this line
                // Check if token is not undefined before storing in localStorage
                if (response.data.token) {
                    console.log("Saving token:", response.data.token); // And this one
                    localStorage.setItem('token', response.data.token);
                }
                console.log("Login successful:", response.data);
                // Pass the response data when resolving the promise
                resolve(response.data);
            })
            .catch((error: any) => {
                console.error("Login failed:", error);
                reject(error);
            });
    });
};

export const logoutUser = async () => {
    console.log("Entering logoutUser"); // Debugging log

    const endpoint = "/logout";
    try {
        console.log("Page to make logout request"); // Debugging log
        await axios.post(`${API_BASE_URL}${endpoint}`, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true,
        });
        console.log("Logout successful"); // Debugging log

        // Remove JWT token from local storage
        localStorage.removeItem('token');
    } catch (error) {
        console.error("Logout failed:", error);
    }
};


export const deleteAccount = () => {
    const endpoint = "/delete_account";

    return new Promise<void>((resolve, reject) => {
        axios
            .delete(`${API_BASE_URL}${endpoint}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                withCredentials: true,
            })
            .then(() => {
                console.log("Account deleted successfully");
                localStorage.removeItem('token'); // Remove token from storage
                resolve();
            })
            .catch((error:any) => {
                console.error("Account deletion failed:", error);
                reject(error);
            });
    });
};

export const changePassword = (passwordData: {current_password: string, new_password: string, confirm_password: string}) => {
    const endpoint = "/change_password";
    const token = localStorage.getItem('token');

    console.log('Sending request with token:', token);
    console.log('Sending request with data:', passwordData);

    return new Promise<void>((resolve, reject) => {
        axios
            .post(`${API_BASE_URL}${endpoint}`, passwordData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            })
            .then(() => {
                console.log("Password updated successfully");
                resolve();
            })
            .catch((error: any) => {
                console.error("Password update failed:", error.response?.data);
                reject(error);
            });
    });
};


export const uploadImage = (file: File) => {
    const endpoint = "/upload_image";
    const formData = new FormData();
    formData.append('file', file);

    return new Promise<string>((resolve, reject) => {
        axios
            .post(`${API_BASE_URL}${endpoint}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((response:any) => {
                console.log("Image uploaded successfully:", response.data);
                resolve(response.data.filename);
            })
            .catch((error:any) => {
                console.error("Image upload failed:", error);
                reject(error);
            });
    });
};

export const handleEditUser = (userData: UserData) => {
    const endpoint = "/edit_user";

    return new Promise<void>((resolve, reject) => {
        axios
            .post(`${API_BASE_URL}${endpoint}`, userData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                withCredentials: true,
            })
            .then(() => {
                console.log("User details updated successfully");
                resolve();
            })
            .catch((error: any) => {
                console.error("User details update failed:", error);
                reject(error);
            });
    });
};