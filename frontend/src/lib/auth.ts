import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000";

export interface UserData {
    username?: string;
    email?: string;
    password?: string;
}


export const handler = (endpoint: string, data: UserData): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
            resolve(response);
            console.log(response);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

// Example usage for registration
const handleRegistration = (registrationData: UserData) => {
    handler("/register", registrationData)
        .then((response) => {
            // Handle success response
            console.log("Registration successful:", response.data);
        })
        .catch((error) => {
            // Handle error
            console.error("Registration failed:", error);
        });
};

// Example usage for login
const handleLogin = (loginData: UserData) => {
    handler("/login", loginData)
        .then((response) => {
            // Handle success response
            console.log("Login successful:", response.data);
        })
        .catch((error) => {
            // Handle error
            console.error("Login failed:", error);
        });
};