import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AddStapleIngredientsScreen = () => {
    const [ingredient, setIngredient] = useState('');

    // Function to add a new staple ingredient
    const addStaple = async () => {
        if (!ingredient) {
            Alert.alert('Error', 'Please enter an ingredient name.');
            return;
        }

        try {
            await fetch('http://appgw-freshfood.australiaeast.cloudapp.azure.com/api/user-preferences/staples/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredient_name: ingredient }),
            });
            setIngredient(''); // Clear input field
            Alert.alert('Success', `${ingredient} added to staples.`);
        } catch (error) {
            console.error('Failed to add staple:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Staple Ingredient</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter ingredient name"
                value={ingredient}
                onChangeText={setIngredient}
            />
            <TouchableOpacity style={styles.addButton} onPress={addStaple}>
                <Text style={styles.addButtonText}>Add Ingredient</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 16,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddStapleIngredientsScreen;
