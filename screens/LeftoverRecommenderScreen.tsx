import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';

type Ingredient = {
  id: number;
  name: string;
  quantity?: number; // Optional, for quantity management later
};

const LeftoverRecommenderScreen: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      const newId = ingredients.length > 0 ? ingredients[ingredients.length - 1].id + 1 : 1;
      setIngredients([...ingredients, { id: newId, name: newIngredient }]);
      setNewIngredient('');
    }
  };

  const handleDeleteIngredient = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leftover Recommender</Text>

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
        <Button title="Add" onPress={handleAddIngredient} />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={() => alert('Take photo functionality coming soon!')} />
        <Button title="Generate Recipes" onPress={() => alert('Generate recipe functionality coming soon!')} />
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
});

export default LeftoverRecommenderScreen;
