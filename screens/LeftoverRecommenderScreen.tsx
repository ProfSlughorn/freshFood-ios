import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, TouchableOpacity, Modal } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  ShoppingList: undefined;
  LeftoverRecommender: { recognizedIngredients?: string[] };
  Camera: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LeftoverRecommender'>;

type Ingredient = {
  id: number;
  name: string;
  quantity?: number; // Optional, for quantity management later
  selected?: boolean; // For tracking selections in the modal
};

const LeftoverRecommenderScreen: React.FC<Props> = ({ navigation, route }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recognizedIngredients, setRecognizedIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    if (route.params?.recognizedIngredients) {
      const newRecognizedIngredients = route.params.recognizedIngredients.map((name, index) => ({
        id: index,
        name,
        selected: false,
      }));
      setRecognizedIngredients(newRecognizedIngredients);
      setModalVisible(true);
    }
  }, [route.params?.recognizedIngredients]);

  const handleAddIngredient = (ingredientName: string) => {
    const newId = ingredients.length > 0 ? ingredients[ingredients.length - 1].id + 1 : 1;
    setIngredients([...ingredients, { id: newId, name: ingredientName }]);
  };

  const handleDeleteIngredient = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const toggleIngredientSelection = (id: number) => {
    setRecognizedIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, selected: !ingredient.selected } : ingredient
      )
    );
  };

  const handleAddSelectedIngredients = () => {
    const selectedIngredients = recognizedIngredients.filter((ingredient) => ingredient.selected);
    const newIngredients = selectedIngredients.map((ingredient) => ({
      id: ingredients.length + recognizedIngredients.indexOf(ingredient) + 1,
      name: ingredient.name,
    }));
    setIngredients([...ingredients, ...newIngredients]);
    setModalVisible(false);
  };

  const renderIngredientItem = ({ item }: { item: Ingredient }) => (
    <View style={styles.ingredientRow}>
      <Text style={styles.ingredientText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteIngredient(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecognizedIngredientItem = ({ item }: { item: Ingredient }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.modalItem,
        item.selected ? styles.modalItemSelected : null,
      ]}
      onPress={() => toggleIngredientSelection(item.id)}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leftover Recommender</Text>
      <Text style={styles.subHeader}>My Ingredients</Text>

      {/* Ingredient List */}
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderIngredientItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No ingredients added yet</Text>}
      />

      {/* Manual Add Ingredient Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Ingredient"
          value={newIngredient}
          onChangeText={setNewIngredient}
        />
        <Button title="Add" onPress={() => handleAddIngredient(newIngredient)} />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={() => navigation.navigate('Camera')} />
        <Button title="Generate Recipes" onPress={() => alert('Generate recipe functionality coming soon!')} />
      </View>

      {/* Modal for Recognized Ingredients */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Ingredients</Text>
          <FlatList
            data={recognizedIngredients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRecognizedIngredientItem}
          />
          <Button title="Add Selected Ingredients" onPress={handleAddSelectedIngredients} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  ingredientText: {
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  modalItemSelected: {
    backgroundColor: '#d3f8d3',
  },
  modalItemText: {
    fontSize: 18,
  },
});

export default LeftoverRecommenderScreen;
