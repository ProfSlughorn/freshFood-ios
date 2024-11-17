import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  RecipeList: { recipes: Array<{ name: string; steps: string; match_score: number }> };
};

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeList'>;

const RecipeListScreen: React.FC<Props> = ({ route }) => {
  const { recipes } = route.params;

  const renderRecipeItem = ({ item }: { item: { name: string; steps: string; match_score: number } }) => (
    <View style={styles.recipeItem}>
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text style={styles.recipeMatchScore}>Match Score: {Math.round(item.match_score * 100)}%</Text>
      <Text style={styles.recipeSteps}>{item.steps}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommended Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecipeItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No recipes found.</Text>}
      />
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
  recipeItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recipeMatchScore: {
    fontSize: 16,
    color: 'green',
    marginVertical: 8,
  },
  recipeSteps: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});

export default RecipeListScreen;
