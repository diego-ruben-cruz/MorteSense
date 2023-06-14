import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export interface UserData {
    id?: string;
    email?: string;
    password?: string;
}

export const handleMe = (): Promise<UserData> => {
    const endpoint = "/@me";

    return new Promise<UserData>((resolve, reject) => {
        axios
            .get<UserData>(`${API_BASE_URL}${endpoint}`, { withCredentials: true })
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
                withCredentials: false,
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

    return new Promise<void>((resolve, reject) => {
        axios
            .post(`${API_BASE_URL}${endpoint}`, loginData, { withCredentials: true })
            .then((response) => {
                console.log("Login successful:", response.data);
                resolve();
            })
            .catch((error) => {
                console.error("Login failed:", error);
                reject(error);
            });
    });
};

export const logoutUser = async () => {
    const endpoint = "/logout";

    try {
        await axios.post(`${API_BASE_URL}${endpoint}`, null, {
            withCredentials: true,
        });
        window.location.href = "/";
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
