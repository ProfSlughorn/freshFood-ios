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
import { apiClient } from '../config/api.config';

const CameraScreen: React.FC = ({ navigation }: any) => {
  const [capturedImage, setCapturedImage] = useState<ImageSourcePropType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = () => {
    const placeholderImages: ImageSourcePropType[] = [
      require('../assets/capsicum.jpg'),
      require('../assets/cucumber.jpg'),
      require('../assets/carrot.jpg'),
      require('../assets/potato.jpg'),
      require('../assets/spinach.jpg'),
      require('../assets/tomato2.jpg'),
    ];
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    setCapturedImage(placeholderImages[randomIndex]);
    console.log('Captured Image Set: ', placeholderImages[randomIndex]); // Debug log to check captured image
  };

  const handleUsePhoto = async () => {
  if (capturedImage) {
    try {
      setLoading(true);

      // Prepare form data for upload
      const imageUri = Image.resolveAssetSource(capturedImage).uri;
      console.log('Image URI: ', imageUri); // Debug log to check image URI

      if (!imageUri) {
        throw new Error('Image URI could not be resolved. Please try again.');
      }

      const formData = new FormData();
      formData.append('image', {
        uri: imageUri, // URI from the placeholder image
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);

      console.log('FormData prepared: ', formData); // Debug log to verify form data

      // Call the backend API
      const response = await apiClient.uploadImage(formData);
      console.log('API Response Status: ', response.status); // Debug log to check response status
      console.log('API Response: ', response); // Debug log to check the entire response

      // Check response status explicitly
      if (response.status !== 200) {
        throw new Error('Failed to analyze the image. Status code: ' + response.status);
      }

      // Access the data directly without calling response.json()
      const data = response.data;
      console.log('API Response Data: ', data); // Debug log to check response data

      // If ingredients are recognized, proceed
      if (data && data.ingredients) {
        // Navigate back and pass recognized ingredients
        navigation.navigate('LeftoverRecommender', { recognizedIngredients: data.ingredients || [] });

        Alert.alert('Ingredients Recognized', data.ingredients.join(', '));
      } else {
        throw new Error('No ingredients recognized. Please try again.');
      }
    } catch (error) {
      // Handle the error safely
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong while processing the image. Please try again.';
      console.error('Error during image analysis: ', message); // Debug log to check error details
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  } else {
    Alert.alert('Error', 'No image has been captured. Please capture an image first.');
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
