// api/shopping-list.ts

import { apiClient, API_ENDPOINTS } from "../config/api.config";
// @ts-ignore
import { AxiosError, AxiosResponse } from 'axios';

export interface ShoppingListItem {
    id: number;
    name: string;
    quantity: number;
}

export interface CreateShoppingListItem {
    name: string;
    quantity: number;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    data?: any;
}

const validateShoppingListData = (data: any): data is ShoppingListItem[] => {
    if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return false;
    }

    return data.every(item =>
        typeof item === 'object' &&
        'id' in item &&
        'name' in item &&
        'quantity' in item
    );
};

const handleApiError = (error: unknown): never => {
    console.error('Full error object:', error);

    const apiError: ApiError = {
        message: 'An error occurred while fetching data'
    };

    if (error instanceof Error) {
        if ((error as AxiosError).response) {
            const axiosError = error as AxiosError;
            console.log('Response data:', axiosError.response?.data);
            console.log('Response status:', axiosError.response?.status);
            console.log('Response headers:', axiosError.response?.headers);
            apiError.message = `Server error: ${axiosError.response?.status}`;
            apiError.status = axiosError.response?.status;
            apiError.data = axiosError.response?.data;
        } else {
            console.log('Error message:', error.message);
            apiError.message = error.message;
        }
    } else {
        apiError.message = String(error);
    }

    console.error('Formatted API Error:', apiError);
    throw apiError;
};

export const shoppingListAPI = {
    async getShoppingList(): Promise<ShoppingListItem[]> {
        try {
            console.log('Starting shopping list fetch...');

            const response: AxiosResponse = await apiClient.get("SHOPPING_LIST");
            console.log('Raw response data:', response.data);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            if (!validateShoppingListData(response.data)) {
                console.error('Invalid data structure received:', response.data);
                throw new Error('Invalid data structure received from server');
            }

            console.log('Shopping list fetched successfully:', response.data);
            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },
    async addShoppingListItem(item: CreateShoppingListItem): Promise<ShoppingListItem> {
        try {
            return await apiClient.post("SHOPPING_LIST", item)
        } catch (error) {
            console.error(`Error adding shopping list:`, error);
            return handleApiError(error);
        }
    },
    async deleteShoppingListItem(id: number): Promise<void> {
        try {
            await apiClient.delete("SHOPPING_LIST", id)
        }
        catch(error: unknown) {
            console.error(`Error deleting shopping list:`, error);
        }
    }
};

// Export the function reference
export const getShoppingListItems = shoppingListAPI.getShoppingList;
export const addShoppingListItem = shoppingListAPI.addShoppingListItem;
export const deleteShoppingListItem = shoppingListAPI.deleteShoppingListItem;