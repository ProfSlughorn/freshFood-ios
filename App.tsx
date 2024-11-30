import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import LeftoverRecommenderScreen from './screens/LeftoverRecommenderScreen';
import CameraScreen from './screens/CameraScreen';
import RecipeListScreen from './screens/Recipes'; // Import the correct screen
import RecipeDetailScreen from './screens/RecipeDetail';
import UserPreferencesScreen from './screens/UserPreferencesScreen';
import ViewStapleIngredientsScreen from './screens/ViewStapleIngredientScreen';
import AddStapleIngredientsScreen from './screens/AddStapleIngredientsScreen';

// Define a summary of the recipe for listing purposes
export type RecipeSummary = {
    recipe_id: string;
    recipe_name: string;
    cooking_time: string;
    preparation_time: string;
    match_percentage: number;
    recipe_image: string;
    matched_ingredients: string[];
    missing_ingredients: string[];
};

// Define the full recipe details for the RecipeDetailScreen
export type RecipeDetail = {
    recipe_name: string;
    recipe_description: string;
    preparation_time: string;
    cooking_time: string;
    serving_size: string;
    recipe_image: string;
    nutritional_info: {
        calcium: string;
        calories: string;
        carbohydrate: string;
        cholesterol: string;
        fat: string;
        fiber: string;
        iron: string;
        monounsaturated_fat: string;
        polyunsaturated_fat: string;
        potassium: string;
        protein: string;
        saturated_fat: string;
        serving_size: string;
        sodium: string;
        sugar: string;
        trans_fat: string;
        vitamin_a: string;
        vitamin_c: string;
    };
    ingredients: {
        food_name: string;
        ingredient_description: string;
    }[];
    directions: {
        direction_number: string;
        direction_description: string;
    }[];
};

// Define navigation types
export type RootStackParamList = {
    Home: undefined;
    ShoppingList: undefined;
    LeftoverRecommender: { recognizedIngredients?: string[] };
    Camera: undefined;
    RecipeList: { recipes: RecipeSummary[] }; // Uses RecipeSummary for listing
    RecipeDetail: { recipe: RecipeDetail };   // Uses RecipeDetail for full details
    UserPreferences: undefined;
    ViewStapleIngredients: undefined;
    AddStapleIngredients: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    {/* Home Screen */}
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    {/* Other screens */}
                    <Stack.Screen name="ShoppingList" component={ShoppingListScreen} options={{ headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitle: 'Shopping List' }} />
                    <Stack.Screen name="LeftoverRecommender" component={LeftoverRecommenderScreen} options={{ headerStyle: { backgroundColor: '#2196F3' }, headerTintColor: '#fff', headerTitle: 'Leftover Manager' }} />
                    <Stack.Screen name="Camera" component={CameraScreen} options={{ headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff', headerTitle: 'Camera' }} />
                    <Stack.Screen name="RecipeList" component={RecipeListScreen} options={{ headerStyle: { backgroundColor: '#FF9800' }, headerTintColor: '#fff', headerTitle: 'Recommended Recipes' }} />
                    <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ headerStyle: { backgroundColor: '#FF9800' }, headerTintColor: '#fff', headerTitle: 'Recipe Details' }} />
                    <Stack.Screen name="UserPreferences" component={UserPreferencesScreen} options={{ headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitle: 'User Preferences' }} />
                    <Stack.Screen name="ViewStapleIngredients" component={ViewStapleIngredientsScreen} options={{ headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitle: 'View Staple Ingredients' }} />
                    <Stack.Screen name="AddStapleIngredients" component={AddStapleIngredientsScreen} options={{ headerStyle: { backgroundColor: '#4CAF50' }, headerTintColor: '#fff', headerTitle: 'Add Staple Ingredients' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
