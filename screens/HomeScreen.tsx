import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Animated,
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type RootStackParamList = {
    Home: undefined;
    ShoppingList: undefined;
    LeftoverRecommender: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [200, 100],
        extrapolate: 'clamp',
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    const features = [
        {
            title: 'Shopping List',
            description: 'Smart list with expiry tracking',
            icon: <MaterialIcons name="shopping-cart" size={24} color="#fff" />,
            color: '#4CAF50',
            onPress: () => navigation.navigate('ShoppingList'),
        },
        {
            title: 'Leftover Manager',
            description: 'Track and use leftovers',
            icon: <MaterialIcons name="kitchen" size={24} color="#fff" />,
            color: '#FF9800',
            onPress: () => navigation.navigate('LeftoverRecommender'),
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />

            {/* Animated Header */}
            <Animated.View
                style={[
                    styles.header,
                    { height: headerHeight },
                ]}
            >
                <Image
                    source={require('../assets/back-2.jpg')}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
                <View style={styles.headerOverlay} />
                <Animated.Text style={styles.headerTitle}>Save Food</Animated.Text>
                <Animated.Text style={styles.headerSubtitle}>
                    Reduce Waste, Save Earth
                </Animated.Text>
            </Animated.View>

            <Animated.ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={22} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search recipes, ingredients..."
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <Feather name="sliders" size={22} color="#4CAF50" />
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.quickActionScroll}
                    >
                        {quickActions.map((action, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.quickActionButton}
                                activeOpacity={0.7}
                            >
                                <View style={styles.quickActionIcon}>
                                    {action.icon}
                                </View>
                                <Text style={styles.quickActionText}>{action.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Main Features */}
                <View style={styles.mainFeatures}>
                    <Text style={styles.sectionTitle}>Features</Text>
                    <View style={styles.featureGrid}>
                        {features.map((feature, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.featureButton}
                                activeOpacity={0.8}
                                onPress={feature.onPress}
                            >
                                <View
                                    style={[styles.featureIcon, { backgroundColor: feature.color }]}
                                >
                                    {feature.icon}
                                </View>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDescription}>
                                    {feature.description}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
};

// Data arrays for quick actions
const quickActions = [
    {
        title: 'Scan Receipt',
        icon: <MaterialIcons name="receipt" size={24} color="#4CAF50" />,
    },
    {
        title: 'Add Items',
        icon: <MaterialIcons name="add-shopping-cart" size={24} color="#4CAF50" />,
    },
    {
        title: 'Quick Recipe',
        icon: <MaterialIcons name="timer" size={24} color="#4CAF50" />,
    },
];

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    header: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 },
    headerImage: { width: '100%', height: '100%' },
    headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
    headerTitle: { position: 'absolute', bottom: 40, left: 20, fontSize: 32, fontWeight: 'bold', color: '#fff' },
    headerSubtitle: { position: 'absolute', bottom: 20, left: 20, fontSize: 16, color: '#fff' },
    scrollView: { marginTop: 220, backgroundColor: '#f8f8f8' },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
        padding: 12,
    },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, fontSize: 16, color: '#333' },
    filterButton: { padding: 4 },
    quickActions: { padding: 16 },
    sectionTitle: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 16 },
    quickActionScroll: { paddingRight: 16 },
    quickActionButton: { alignItems: 'center', marginRight: 20 },
    quickActionIcon: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
    quickActionText: { marginTop: 8, fontSize: 12, color: '#666' },
    mainFeatures: { padding: 16 },
    featureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
    featureButton: {
        width: (width - 48) / 2,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
    },
    featureIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
    featureTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
    featureDescription: { fontSize: 12, color: '#666' },
});

export default HomeScreen;
