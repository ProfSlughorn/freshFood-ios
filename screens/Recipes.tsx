import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {API_ENDPOINTS} from "../config/api.config";

// Define the Recipe type to match the data structure
type Recipe = {
  recipe_name: string;
  matched_ingredients: string[];
  missing_ingredients: string[];
  match_percentage: number;
  preparation_time: string;
  cooking_time: string;
  recipe_image: string;
};

type RootStackParamList = {
  RecipeList: { recipes: Recipe[] };
  RecipeDetail: { recipe: any }; // Using 'any' for now as the detailed recipe type is different
};

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeList'>;

const { width } = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = width - (CARD_MARGIN * 2);

const RecipeListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { recipes } = route.params;
  const [loading, setLoading] = useState<string | null>(null); // Store loading recipe name

  const handleRecipePress = async (recipeName: string) => {
    setLoading(recipeName); // Show loading for this specific recipe
    try {
      console.log("to fetch URL:",API_ENDPOINTS.RECIPE_DETAIL +'/123');
      // console.log("to fetch URL:",API_ENDPOINTS.RECIPE_DETAIL + encodeURIComponent(recipeName));
      const response = await fetch(`${API_ENDPOINTS.RECIPE_DETAIL}/123}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("get data back:",response);

      if (response.ok) {
        const detailedRecipe = await response.json();
        console.log("Retrieved recipe details:", detailedRecipe);
        setLoading(null); // Hide loading indicator
        navigation.navigate('RecipeDetail', { recipe: detailedRecipe });
      } else {
        const error = await response.json();
        console.error("Error fetching recipe details:", error);
        setLoading(null); // Hide loading indicator
        alert(`Failed to fetch recipe details: ${error.error}`);
      }
    } catch (err) {
      setLoading(null); // Hide loading indicator
      alert(`Error: ${(err as Error).message}`);
    }
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity 
      style={styles.recipeItem}
      onPress={() => handleRecipePress(item.recipe_name)}
      activeOpacity={0.7}
      disabled={loading !== null} // Disable all cards while loading
    >
      <Image
        source={{ uri: item.recipe_image }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      {loading === item.recipe_name && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      )}
      <View style={styles.recipeContent}>
        <Text style={styles.recipeName}>{item.recipe_name}</Text>
        <View style={styles.matchScoreContainer}>
          <Text style={[
            styles.recipeMatchScore,
            { color: item.match_percentage >= 90 ? '#2ecc71' : 
                     item.match_percentage >= 70 ? '#f1c40f' : '#e74c3c' }
          ]}>
            Match: {Math.round(item.match_percentage)}%
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.timeItem}>
            <Text style={styles.timeLabel}>Prep Time</Text>
            <Text style={styles.timeValue}>{item.preparation_time} mins</Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeLabel}>Cook Time</Text>
            <Text style={styles.timeValue}>{item.cooking_time} mins</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommended Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecipeItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No recipes found.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  recipeItem: {
    width: CARD_WIDTH,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  recipeContent: {
    padding: 16,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  matchScoreContainer: {
    marginBottom: 12,
  },
  recipeMatchScore: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeItem: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495e',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#95a5a6',
    marginTop: 16,
  },
});

export default RecipeListScreen;