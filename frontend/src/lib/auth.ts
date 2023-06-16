import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export interface UserData {
    id?: string;
    email?: string;
    password?: string;
    token?: string;
    name?: string;
    username?: string;
    phone?: string;
    avatar?: string;
}

export const handleMe = (): Promise<UserData> => {
    const endpoint = "/@me";

    return new Promise<UserData>((resolve, reject) => {
        axios
            .get<UserData>(`${API_BASE_URL}${endpoint}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                withCredentials: true
            })
            .then((response) => {
                console.log("Data is set successfully:", response.data);
                resolve(response.data);
            })
            .catch((error) => {
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
            .then((response) => {
                console.log("Registered successfully:", response.data);
                resolve();
            })
            .catch((error) => {
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
            .then((response) => {
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
            .catch((error) => {
                console.error("Login failed:", error);
                reject(error);
            });
    });
};

export const logoutUser = async () => {
    console.log("Entering logoutUser"); // Debugging log

    const endpoint = "/logout";
    try {
        console.log("About to make logout request"); // Debugging log
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