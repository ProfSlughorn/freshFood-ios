import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';

const ViewStapleIngredientsScreen = () => {
    const [staples, setStaples] = useState([]);

    useEffect(() => {
        fetchStaples();
    }, []);

    // Fetch the list of staples from the backend
    const fetchStaples = async () => {
        try {
            const response = await fetch('http://appgw-freshfood.australiaeast.cloudapp.azure.com/api/user-preferences/staples/');
            const data = await response.json();
            setStaples(data.staples);
        } catch (error) {
            console.error('Failed to fetch staples:', error);
        }
    };

    // Remove a staple
    const removeStaple = async (ingredientName: any) => {
        try {
            await fetch('http://appgw-freshfood.australiaeast.cloudapp.azure.com/api/user-preferences/staples/remove/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredient_name: ingredientName }),
            });
            fetchStaples(); // Refresh list
        } catch (error) {
            console.error('Failed to remove staple:', error);
        }
    };

    // Clear all staples
    const clearAllStaples = async () => {
        try {
            await fetch('http://appgw-freshfood.australiaeast.cloudapp.azure.com/api/user-preferences/staples/clear/', {
                method: 'DELETE',
            });
            setStaples([]); // Clear list locally
        } catch (error) {
            console.error('Failed to clear staples:', error);
        }
    };

    // @ts-ignore
    const handleDelete = (ingredientName) => {
        Alert.alert(
            'Confirm Delete',
            `Are you sure you want to delete ${ingredientName}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => removeStaple(ingredientName),
                },
            ],
        );
    };

    // @ts-ignore
    const renderStaple = ({ item }) => (
        <View style={styles.stapleContainer}>
            <Text style={styles.stapleText}>{item}</Text>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Staple Ingredients</Text>

            <TouchableOpacity style={styles.clearButton} onPress={clearAllStaples}>
                <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>

            <FlatList
                data={staples}
                keyExtractor={(item) => item}
                renderItem={renderStaple}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stapleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 10,
        borderRadius: 10,
    },
    stapleText: {
        fontSize: 16,
    },
    deleteButton: {
        padding: 8,
        backgroundColor: '#FF6347',
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#FF6347',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ViewStapleIngredientsScreen;
