import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// Helper functions
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

function extractDuplicateKeyErrorMessage(errorString: string) {
    const match = errorString.match(/index:\s([^ ]+)/);
    if (match && match[1]) {
        return `Duplicate key error in index: ${match[1]}`;
    }
    return "An unknown duplicate key error occurred.";
}

const showErrorToast = (message: string, id: string) => {
    if (message.includes("E11000")) {
        message = extractDuplicateKeyErrorMessage(message);
    }
    if (!toast.isActive(id)) {
        toast.error(message, { toastId: id });
    }
};

// Axios request methods
export const axiosRequest = {
    get: <T>(url: string, params?: {}) => 
        axios.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, body: {}, params?: {}, type: any = 'json') =>
        axios.post<T>(url, body, { responseType: type, params }).then(responseBody),
    put: <T>(url: string, body: {}) => 
        axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => 
        axios.delete<T>(url).then(responseBody),
};

// Request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
axios.interceptors.response.use(
    async response => {
        await sleep(1000);
        if (response.data.status === false) {
            showErrorToast(response.data.err, 'responseError');
            throw new Error(response.data.err);
        }
        return response;
    },
    async (error: AxiosError<any>) => {
        if (!error.response) {
            showErrorToast('Network error. Please check your connection.', 'networkError');
        } else {
            const { data, status } = error.response;
            let errorMessage = 'An unexpected error occurred';

            if (data && data.err) {
                errorMessage = data.err;
            } else if (typeof data === 'string') {
                errorMessage = data;
            }

            switch (status) {
                case 400:
                    showErrorToast(errorMessage, 'error400');
                    break;
                case 401:
                case 403:
                    showErrorToast('Unauthorized. Please log in again.', 'error401');
                    localStorage.clear();
                    // window.location.href = 'http://3.18.252.140:5173/login'
                    await sleep(200);
                    break;
                case 404:
                    showErrorToast('Resource not found', 'error404');
                    break;
                default:
                    showErrorToast(errorMessage, 'defaultError');
            }
        }
        return Promise.reject(error);
    }
); 