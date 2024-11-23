// config/api.config.ts

// @ts-ignore
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://appgw-freshfood.australiaeast.cloudapp.azure.com/api';

export const API_ENDPOINTS = {
    SHOPPING_LIST: `${BASE_URL}/shopping-list/items/`,
    LEFTOVER_RECOMMENDATION: `${BASE_URL}/leftover-recommendation/recommend/`,
    IMAGE_RECOGNITION: `${BASE_URL}/image-recognition/analyze-image/`,
} as const;

export type ApiEndpoint = keyof typeof API_ENDPOINTS;

// Create axios instance with config
const axiosInstance = axios.create({
    timeout: 30000, // 30 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    validateStatus: (status) => status >= 200 && status < 300,
});

// Add logging interceptors for debugging
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request:', {
            url: config.url,
            method: config.method,
        });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response Status:', response.status);
        return response;
    },
    (error) => {
        console.error('Response Error:', {
            message: error.message,
            code: error.code,
        });
        return Promise.reject(error);
    }
);

export const apiClient = {
    async post(endpoint: ApiEndpoint, data?: FormData | object): Promise<AxiosResponse> {
        try {
            const headers: Record<string, string> = {};

            if (data instanceof FormData) {
                headers['Content-Type'] = 'multipart/form-data';
            }

            return await axiosInstance.post(API_ENDPOINTS[endpoint], data, { headers });
        } catch (error) {
            console.error(`Error posting to ${endpoint}:`, error);
            throw error;
        }
    },

    async get(endpoint: ApiEndpoint): Promise<AxiosResponse> {
        try {
            return await axiosInstance.get(API_ENDPOINTS[endpoint]);
        } catch (error) {
            console.error(`Error getting ${endpoint}:`, error);
            throw error;
        }
    },

    async delete(endpoint: ApiEndpoint, id: number): Promise<AxiosResponse> {
        try {
            return await axiosInstance.delete(`${API_ENDPOINTS[endpoint]}${id}/`);
        } catch (error) {
            console.error(`Error deleting from ${endpoint}:`, error);
            throw error;
        }
    }
};