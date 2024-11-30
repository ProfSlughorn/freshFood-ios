import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RecipeDetail } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

const { width } = Dimensions.get('window');

const RecipeDetailScreen: React.FC<Props> = ({ route }) => {
    const { recipe } = route.params;
    const [activeTab, setActiveTab] = useState<'ingredients' | 'directions' | 'nutrition'>('ingredients');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'ingredients':
                return (
                    <View style={styles.tabContent}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <Text style={styles.ingredientName}>{ingredient.food_name}</Text>
                                <Text style={styles.ingredientDescription}>
                                    {ingredient.ingredient_description}
                                </Text>
                            </View>
                        ))}
                    </View>
                );
            case 'directions':
                return (
                    <View style={styles.tabContent}>
                        {recipe.directions.map((direction, index) => (
                            <View key={index} style={styles.directionItem}>
                                <View style={styles.directionNumber}>
                                    <Text style={styles.directionNumberText}>{direction.direction_number}</Text>
                                </View>
                                <Text style={styles.directionDescription}>
                                    {direction.direction_description}
                                </Text>
                            </View>
                        ))}
                    </View>
                );
            case 'nutrition':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.nutritionGrid}>
                            <NutritionItem label="Calories" value={recipe.nutritional_info.calories} unit="kcal" />
                            <NutritionItem label="Protein" value={recipe.nutritional_info.protein} unit="g" />
                            <NutritionItem label="Carbs" value={recipe.nutritional_info.carbohydrate} unit="g" />
                            <NutritionItem label="Fat" value={recipe.nutritional_info.fat} unit="g" />
                            <NutritionItem label="Fiber" value={recipe.nutritional_info.fiber} unit="g" />
                            <NutritionItem label="Sugar" value={recipe.nutritional_info.sugar} unit="g" />
                        </View>
                        <Text style={styles.servingSize}>Per {recipe.nutritional_info.serving_size}</Text>
                    </View>
                );
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: recipe.recipe_image }} style={styles.recipeImage} />

            <View style={styles.contentContainer}>
                <Text style={styles.recipeName}>{recipe.recipe_name}</Text>
                <Text style={styles.recipeDescription}>{recipe.recipe_description}</Text>

                <View style={styles.timeContainer}>
                    <View style={styles.timeItem}>
                        <Text style={styles.timeLabel}>Prep Time</Text>
                        <Text style={styles.timeValue}>{recipe.preparation_time} mins</Text>
                    </View>
                    <View style={styles.timeSeparator} />
                    <View style={styles.timeItem}>
                        <Text style={styles.timeLabel}>Cook Time</Text>
                        <Text style={styles.timeValue}>{recipe.cooking_time} mins</Text>
                    </View>
                    <View style={styles.timeSeparator} />
                    <View style={styles.timeItem}>
                        <Text style={styles.timeLabel}>Serving</Text>
                        <Text style={styles.timeValue}>{recipe.serving_size}</Text>
                    </View>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
                        onPress={() => setActiveTab('ingredients')}
                    >
                        <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>
                            Ingredients
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'directions' && styles.activeTab]}
                        onPress={() => setActiveTab('directions')}
                    >
                        <Text style={[styles.tabText, activeTab === 'directions' && styles.activeTabText]}>
                            Directions
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'nutrition' && styles.activeTab]}
                        onPress={() => setActiveTab('nutrition')}
                    >
                        <Text style={[styles.tabText, activeTab === 'nutrition' && styles.activeTabText]}>
                            Nutrition
                        </Text>
                    </TouchableOpacity>
                </View>

                {renderTabContent()}
            </View>
        </ScrollView>
    );
};

const NutritionItem: React.FC<{ label: string; value: string; unit: string }> = ({
    label, value, unit
}) => (
    <View style={styles.nutritionItem}>
        <Text style={styles.nutritionValue}>{parseFloat(value).toFixed(1)}{unit}</Text>
        <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    recipeImage: {
        width: width,
        height: width * 0.75,
    },
    contentContainer: {
        padding: 16,
    },
    recipeName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    recipeDescription: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 16,
        lineHeight: 24,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    timeItem: {
        flex: 1,
        alignItems: 'center',
    },
    timeSeparator: {
        width: 1,
        backgroundColor: '#ddd',
    },
    timeLabel: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 4,
    },
    timeValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#3498db',
    },
    tabText: {
        fontSize: 16,
        color: '#7f8c8d',
    },
    activeTabText: {
        color: '#3498db',
        fontWeight: '600',
    },
    tabContent: {
        paddingTop: 16,
    },
    ingredientItem: {
        marginBottom: 16,
    },
    ingredientName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    ingredientDescription: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    directionItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    directionNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    directionNumberText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    directionDescription: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        lineHeight: 24,
    },
    nutritionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    nutritionItem: {
        width: '30%',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    nutritionValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    nutritionLabel: {
        fontSize: 14,
        color: '#7f8c8d',
    },
    servingSize: {
        textAlign: 'center',
        color: '#7f8c8d',
        marginTop: 8,
        fontSize: 14,
    },
});

export default RecipeDetailScreen;
