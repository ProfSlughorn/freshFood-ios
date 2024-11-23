import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageSourcePropType,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {apiClient} from "../config/api.config";

const CameraScreen: React.FC = ({ navigation }: any) => {
  const [capturedImage, setCapturedImage] = useState<ImageSourcePropType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = () => {
    const placeholderImages: ImageSourcePropType[] = [
      require('../assets/Trial_Image_2.png'),
      require('../assets/Trial_Image_3.png'),
    ];
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    setCapturedImage(placeholderImages[randomIndex]);
  };

  const handleUsePhoto = async () => {
  if (capturedImage) {
    try {
      setLoading(true);

      // Prepare form data for upload
      const formData = new FormData();
      formData.append('image', {
        uri: Image.resolveAssetSource(capturedImage).uri, // Resolve URI from the placeholder image
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);

      // Call the backend API
      const response = await apiClient.uploadImage(formData);

      if (!response.ok) {
        throw new Error('Failed to analyze the image');
      }

      const data = await response.json();

      // Navigate back and pass recognized ingredients
      navigation.navigate('LeftoverRecommender', { recognizedIngredients: data.ingredients || [] });

      Alert.alert('Ingredients Recognized', data.ingredients.join(', '));
    } catch (error) {
      // Handle the error safely
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong while processing the image. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  }
};


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : capturedImage ? (
        <View style={styles.imageContainer}>
          <Image source={capturedImage} style={styles.image} />
          <Button title="Use Photo" onPress={handleUsePhoto} />
          <Button title="Retake Photo" onPress={() => setCapturedImage(null)} />
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <Text style={styles.instructions}>Simulated Camera</Text>
          <Button title="Capture" onPress={handleCapture} />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});

export default CameraScreen;
