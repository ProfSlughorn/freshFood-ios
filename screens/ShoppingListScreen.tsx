import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define navigation types
type RootStackParamList = {
    Home: undefined;
    ShoppingList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ShoppingList'>;

interface ShoppingItem {
    id: string;
    name: string;
    quantity: number;
    expires: string;
}

// Change to default export
const ShoppingListScreen = ({ navigation }: Props) => {
    const sampleItems: ShoppingItem[] = [
        { id: '1', name: 'Milk', quantity: 1, expires: '2024-11-15' },
        { id: '2', name: 'Bread', quantity: 2, expires: '2024-11-12' },
        { id: '3', name: 'Eggs', quantity: 12, expires: '2024-11-20' },
    ];

    const renderItem = ({ item }: { item: ShoppingItem }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>Qty: {item.quantity}</Text>
            <Text style={styles.itemDetails}>Expires: {item.expires}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={sampleItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    listContainer: {
        padding: 16,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    itemDetails: {
        fontSize: 14,
        color: '#666',
    },
});

// Use default export
export default ShoppingListScreen;