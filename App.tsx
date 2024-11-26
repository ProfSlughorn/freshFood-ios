import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import LeftoverRecommenderScreen from './screens/LeftoverRecommenderScreen';
import CameraScreen from './screens/CameraScreen'; // Import the CameraScreen
import RecipeListScreen from './screens/Recipes'; // Import the Recipes
import RecipeDetailScreen from './screens/RecipeDetail'; // Import the RecipeDetails

// Define navigation types
type RootStackParamList = {
    Home: undefined;
    ShoppingList: undefined;
    LeftoverRecommender: { recognizedIngredients?: string[] }; // Add recognizedIngredients
    Camera: undefined;
    RecipeList: { recipes: Array<{ recipe_name: string; cooking_time: string; match_percentage: number }> }; // Add RecipeList
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

                    {/* Shopping List Screen */}
                    <Stack.Screen
                        name="ShoppingList"
                        component={ShoppingListScreen}
                        options={{
                            headerStyle: { backgroundColor: '#4CAF50' },
                            headerTintColor: '#fff',
                            headerTitle: 'Shopping List',
                        }}
                    />

                    {/* Leftover Recommender Screen */}
                    <Stack.Screen
                        name="LeftoverRecommender"
                        component={LeftoverRecommenderScreen}
                        options={{
                            headerStyle: { backgroundColor: '#2196F3' },
                            headerTintColor: '#fff',
                            headerTitle: 'Leftover Manager',
                        }}
                    />

                    {/* Camera Screen */}
                    <Stack.Screen
                        name="Camera"
                        component={CameraScreen}
                        options={{
                            headerStyle: { backgroundColor: '#000' },
                            headerTintColor: '#fff',
                            headerTitle: 'Camera',
                        }}
                    />

                    {/* Recipe List Screen */}
                    <Stack.Screen
                        name="RecipeList"
                        component={RecipeListScreen}
                        options={{
                            headerStyle: { backgroundColor: '#FF9800' },
                            headerTintColor: '#fff',
                            headerTitle: 'Recommended Recipes',
                        }}
                    />
                    {/*Recipe Details Screen*/}
                    <Stack.Screen name="RecipeDetail" 
                    component={RecipeDetailScreen} 
                    options={{
                        headerStyle: { backgroundColor: '#FF9800' },
                        headerTintColor: '#fff',
                        headerTitle: 'Recommended Recipes',
                    }}
                    />
      
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
