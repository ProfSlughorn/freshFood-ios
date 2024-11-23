// // api.ts
//
// import axios from 'axios';
//
// const API_URL = 'https://keepitfresh-d0evbuaud4afdqd7.australiaeast-01.azurewebsites.net/api/shopping-list/items/';
//
// export interface ShoppingListItem {
//   id: number;
//   name: string;
//   quantity: number;
// }
//
// // Fetch shopping list items
// export const getShoppingList = async (): Promise<ShoppingListItem[]> => {
//   const response = await axios.get<ShoppingListItem[]>(API_URL);
//   return response.data;
// };
//
// // Add an item to the shopping list
// export const addShoppingListItem = async (item: Partial<ShoppingListItem>): Promise<ShoppingListItem> => {
//   const response = await axios.post<ShoppingListItem>(API_URL, item);
//   return response.data;
// };
//
// // Delete an item from the shopping list
// export const deleteShoppingListItem = async (id: number): Promise<void> => {
//   await axios.delete(`${API_URL}${id}/`);
// };
