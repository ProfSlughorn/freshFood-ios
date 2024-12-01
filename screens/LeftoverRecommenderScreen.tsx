import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API_ENDPOINTS } from "../config/api.config";

type RootStackParamList = {
  Home: undefined;
  ShoppingList: undefined;
  LeftoverRecommender: { recognizedIngredients?: string[] };
  Camera: undefined;
  RecipeList: { recipes: Array<{ name: string; steps: string; match_score: number }> };
};

type Props = NativeStackScreenProps<RootStackParamList, 'LeftoverRecommender'>;

type Ingredient = {
  id: number;
  name: string;
  quantity?: number;
  selected?: boolean;
};

const LeftoverRecommenderScreen: React.FC<Props> = ({ navigation, route }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recognizedIngredients, setRecognizedIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  // Load ingredients from AsyncStorage when the component mounts
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const storedIngredients = await AsyncStorage.getItem('@ingredients_list');
        if (storedIngredients) {
          setIngredients(JSON.parse(storedIngredients));
        }
      } catch (error) {
        console.error('Failed to load ingredients from storage', error);
      }
    };
    loadIngredients();
  }, []);

  // Update AsyncStorage whenever ingredients change
  useEffect(() => {
    const saveIngredients = async () => {
      try {
        await AsyncStorage.setItem('@ingredients_list', JSON.stringify(ingredients));
      } catch (error) {
        console.error('Failed to save ingredients to storage', error);
      }
    };
    if (ingredients.length > 0) {
      saveIngredients();
    }
  }, [ingredients]);

  useEffect(() => {
    if (route.params?.recognizedIngredients) {
      const newRecognizedIngredients = route.params.recognizedIngredients.map((name, index) => ({
        id: ingredients.length + index + 1,
        name,
        selected: false,
      }));

      // Merge new recognized ingredients without replacing existing ones
      setRecognizedIngredients((prevRecognizedIngredients) => {
        // Only add ingredients that are not already recognized
        const uniqueNewIngredients = newRecognizedIngredients.filter(
          (newIngredient) =>
            !prevRecognizedIngredients.some((ingredient) => ingredient.name === newIngredient.name)
        );
        return [...prevRecognizedIngredients, ...uniqueNewIngredients];
      });

      setModalVisible(true);
    }
  }, [route.params?.recognizedIngredients]);

  const handleAddIngredient = (ingredientName: string) => {
    const newId = ingredients.length > 0 ? ingredients[ingredients.length - 1].id + 1 : 1;
    setIngredients([...ingredients, { id: newId, name: ingredientName }]);
    setNewIngredient(''); // Clear input after adding
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
    // Filter out the selected ingredients from recognized ingredients
    const selectedIngredients = recognizedIngredients.filter((ingredient) => ingredient.selected);

    // Map to create new ingredient objects
    const newIngredients = selectedIngredients.map((ingredient, index) => ({
      id: ingredients.length + index + 1,
      name: ingredient.name,
    }));

    // Update the ingredients state with unique values, preventing duplicates
    setIngredients((prevIngredients) => {
      const uniqueIngredients = newIngredients.filter(
        (newIngredient) => !prevIngredients.some((ingredient) => ingredient.name === newIngredient.name)
      );
      const updatedIngredients = [...prevIngredients, ...uniqueIngredients];

      console.log("Updated Ingredients List: ", updatedIngredients); // Debugging log to verify changes
      return updatedIngredients;
    });

    // Reset the recognized ingredients' selected state and close the modal
    setRecognizedIngredients((prevRecognized) =>
      prevRecognized.map((ingredient) => ({ ...ingredient, selected: false }))
    );

    // Close the modal after adding
    setModalVisible(false);
  };

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      alert('Please add at least one ingredient to generate recipes.');
      return;
    }

    const ingredientNames = ingredients.map((ingredient) => ingredient.name);

    setLoading(true); // Show loading indicator
    try {
      const response = await fetch(API_ENDPOINTS.LEFTOVER_RECOMMENDATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientNames }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("retrieved data", data);
        setLoading(false); // Hide loading indicator

        // Clear ingredients after generating recipes
        await AsyncStorage.removeItem('@ingredients_list');
        setIngredients([]);

        navigation.navigate('RecipeList', { recipes: data.recipes });
      } else {
        const error = await response.json();
        console.error("get error:", error);
        setLoading(false); // Hide loading indicator
        alert(`Failed to generate recipes: ${error.error}`);
      }
    } catch (err) {
      setLoading(false); // Hide loading indicator
      alert(`Error: ${(err as Error).message}`);
    }
  };


  const renderIngredientItem = ({ item }: { item: Ingredient }) => (
    <View style={styles.ingredientRow}>
      <Text style={styles.ingredientText}>{item.name}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteIngredient(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecognizedIngredientItem = ({ item }: { item: Ingredient }) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.modalItem, item.selected ? styles.modalItemSelected : null]}
      onPress={() => toggleIngredientSelection(item.id)}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leftover Recommender</Text>
      <Text style={styles.subHeader}>My Ingredients</Text>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Generating recipes...</Text>
        </View>
      )}

      {!loading && (
        <>
          <FlatList
            data={ingredients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderIngredientItem}
            ListEmptyComponent={<Text style={styles.emptyText}>No ingredients added yet</Text>}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Ingredient"
              value={newIngredient}
              onChangeText={setNewIngredient}
            />
            <Button title="Add" onPress={() => handleAddIngredient(newIngredient)} />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Take Photo" onPress={() => navigation.navigate('Camera')} />
            <Button title="Generate Recipes" onPress={handleGenerateRecipes} />
          </View>
        </>
      )}

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
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
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subHeader: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  ingredientRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  ingredientText: { fontSize: 18, flex: 1 },
  deleteButton: { backgroundColor: 'red', padding: 8, borderRadius: 4 },
  deleteButtonText: { color: 'white', fontWeight: 'bold' },
  inputContainer: { flexDirection: 'row', marginVertical: 16, alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginRight: 8 },
  buttonContainer: { marginTop: 16 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: 16 },
  modalContainer: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  modalItem: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc', width: '100%' },
  modalItemSelected: { backgroundColor: '#d3f8d3' },
  modalItemText: { fontSize: 18 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 8, fontSize: 16, color: '#000' },
});

export default LeftoverRecommenderScreen;
