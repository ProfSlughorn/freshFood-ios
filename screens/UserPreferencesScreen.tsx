import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    UserPreferences: undefined;
    ViewStapleIngredients: undefined; // Replace with the actual component for viewing staples
    AddStapleIngredients: undefined;  // Replace with the actual component for adding staples
};

type Props = NativeStackScreenProps<RootStackParamList, 'UserPreferences'>;

const UserPreferencesScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Preferences</Text>
            <Text style={styles.description}>
                Manage your staple ingredients here.
            </Text>

            {/* View Staple Ingredients Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('ViewStapleIngredients'); // Navigate to view staple ingredients screen
                }}
            >
                <Text style={styles.buttonText}>View Staple Ingredients</Text>
            </TouchableOpacity>

            {/* Add Staple Ingredients Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('AddStapleIngredients'); // Navigate to add staple ingredients screen
                }}
            >
                <Text style={styles.buttonText}>Add Staple Ingredients</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default UserPreferencesScreen;
