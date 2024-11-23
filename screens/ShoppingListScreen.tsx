import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import {
  addShoppingListItem,
  deleteShoppingListItem,
  getShoppingListItems,
  ShoppingListItem,
  CreateShoppingListItem
} from "../api/shopping-list";

const ShoppingListScreen: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const fetchShoppingList = async () => {
    try {
      const data = await getShoppingListItems();
      setShoppingList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch shopping list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItemName.trim()) return;

    const newItem: CreateShoppingListItem = {
      name: newItemName.trim(),
      quantity: Math.max(1, Math.min(10, newItemQuantity)) // Ensure quantity is between 1 and 10
    };

    try {
      const addedItem = await addShoppingListItem(newItem);
      if (addedItem && addedItem.id) {
        setShoppingList((prevList) => [...prevList, addedItem]);
        setNewItemName('');
        setNewItemQuantity(1);
      }
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteShoppingListItem(id);
      setShoppingList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleQuantityChange = async (id: number, quantity: number) => {
    if (typeof quantity !== 'number') return;

    setShoppingList((prevList) =>
        prevList.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const renderRightActions = (id: number) => (
      <RectButton
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </RectButton>
  );

  const renderShoppingListItem = ({ item }: { item: ShoppingListItem }) => {
    // Ensure item has all required properties before rendering
    if (!item?.id || !item?.name) {
      console.warn('Invalid item data:', item);
      return null;
    }

    return (
        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
          <View style={styles.row}>
            <Text style={styles.itemColumn}>{item.name}</Text>
            <RNPickerSelect
                onValueChange={(value) => handleQuantityChange(item.id, value)}
                items={[...Array(10).keys()].map((i) => ({
                  label: `${i + 1}`,
                  value: i + 1,
                }))}
                value={item.quantity}
                placeholder={{ label: `${item.quantity || 1}`, value: item.quantity || 1 }}
                style={{
                  inputIOS: styles.picker,
                  inputAndroid: styles.picker,
                }}
            />
          </View>
        </Swipeable>
    );
  };

  const keyExtractor = (item: ShoppingListItem) => {
    return item?.id ? item.id.toString() : Math.random().toString();
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Shopping List</Text>
        {loading ? (
            <Text>Loading...</Text>
        ) : (
            <FlatList
                ListHeaderComponent={(
                    <View style={styles.headerRow}>
                      <Text style={styles.headerColumn}>Item</Text>
                      <Text style={styles.headerColumn}>Quantity</Text>
                    </View>
                )}
                data={shoppingList}
                keyExtractor={keyExtractor}
                renderItem={renderShoppingListItem}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No items in shopping list</Text>
                }
            />
        )}
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
          />
          <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="number-pad"
              value={newItemQuantity.toString()}
              onChangeText={(text) => {
                const num = parseInt(text, 10);
                if (!isNaN(num)) {
                  setNewItemQuantity(Math.max(1, Math.min(10, num)));
                }
              }}
          />
          <RectButton
              style={[styles.addButton, !newItemName.trim() && styles.addButtonDisabled]}
              onPress={handleAddItem}
          >
            <Text style={styles.addButtonText}>Add Item</Text>
          </RectButton>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
  },
  headerColumn: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemColumn: {
    fontSize: 18,
    flex: 1,
  },
  picker: {
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // New styles
  addButtonDisabled: {
    backgroundColor: '#9E9E9E', // Gray color when disabled
    opacity: 0.6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#666666',
    fontStyle: 'italic',
  },
});


export default ShoppingListScreen;