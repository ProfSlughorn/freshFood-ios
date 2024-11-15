import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import LeftoverRecommenderScreen from './screens/LeftoverRecommenderScreen';

// Define navigation types
type RootStackParamList = {
    Home: undefined;
    ShoppingList: undefined;
    LeftoverRecommender: undefined;
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
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
