import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';

// Define navigation types
type RootStackParamList = {
    Home: undefined;
    ShoppingList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ShoppingList"
                    component={ShoppingListScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#4CAF50',
                        },
                        headerTintColor: '#fff',
                        headerTitle: 'Shopping List',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}