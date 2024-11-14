import React, { useRef } from 'react';
import { Svg, Path, Circle, Rect } from 'react-native-svg';
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
    Platform,
    NativeScrollEvent,
    NativeSyntheticEvent
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type RootStackParamList = {
    Home: undefined;
    ShoppingList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
    // Create a ref for scrollView to handle animation properly
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [200, 100],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0.9],
        extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });

    const titleTranslateY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -10],
        extrapolate: 'clamp',
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark"/>

            {/* Animated Header */}
            <Animated.View
                style={[
                    styles.header,
                    {
                        height: headerHeight,
                        opacity: headerOpacity
                    }
                ]}
            >
                <Image
                    source={require('../assets/back-2.jpg')}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
                <View style={styles.headerOverlay} />
                <Animated.Text
                    style={[
                        styles.headerTitle,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslateY }
                            ]
                        }
                    ]}
                >
                    Save Food
                </Animated.Text>
                <Animated.Text
                    style={[
                        styles.headerSubtitle,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslateY }
                            ]
                        }
                    ]}
                >
                    Reduce Waste, Save Earth
                </Animated.Text>
            </Animated.View>

            <Animated.ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollViewContent}
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
                                onPress={() => {
                                    if (feature.title === 'Shopping List') {
                                        navigation.navigate('ShoppingList');
                                    }
                                }}
                            >
                                <View style={[styles.featureIcon, {backgroundColor: feature.color}]}>
                                    {feature.icon}
                                </View>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDescription}>{feature.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Tips Section */}
                <View style={styles.tipsSection}>
                    <View style={styles.tipsHeader}>
                        <Text style={styles.sectionTitle}>Daily Tips</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllButton}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tipsScroll}
                    >
                        {tips.map((tip, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.tipCard}
                                activeOpacity={0.9}
                            >
                                <View style={styles.tipImage}>
                                    <tip.icon/>
                                </View>
                                <View style={styles.tipContent}>
                                    <Text style={styles.tipTitle}>{tip.title}</Text>
                                    <Text style={styles.tipDescription}>{tip.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Animated.ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                {bottomNavItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.navItem}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (item.label === 'Lists') {
                                navigation.navigate('ShoppingList');
                            }
                        }}
                    >
                        {item.icon}
                        <Text style={styles.navText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

// Data arrays for UI elements
const quickActions = [
    {
        title: 'Scan Receipt',
        icon: <MaterialIcons name="receipt" size={24} color="#4CAF50"/>
    },
    {
        title: 'Add Items',
        icon: <MaterialIcons name="add-shopping-cart" size={24} color="#4CAF50"/>
    },
    {
        title: 'Quick Recipe',
        icon: <MaterialIcons name="timer" size={24} color="#4CAF50"/>
    },
];

const features = [
    {
        title: 'Shopping List',
        description: 'Smart list with expiry tracking',
        icon: <MaterialIcons name="shopping-cart" size={24} color="#fff"/>,
        color: '#4CAF50'
    },
    {
        title: 'Leftover Manager',
        description: 'Track and use leftovers',
        icon: <MaterialIcons name="kitchen" size={24} color="#fff"/>,
        color: '#FF9800'
    },
];

const tips = [
    {
        title: 'Store Vegetables',
        description: 'Learn the best way to store fresh vegetables',
        icon: (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Svg> & Pick<Readonly<SvgProps>, "removeClippedSubviews" | "style" | "children" | "hitSlop" | "id" | "onLayout" | "pointerEvents" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "aria-label" | "accessibilityRole" | "accessibilityState" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "aria-labelledby" | "accessibilityHint" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onAccessibilityAction" | "importantForAccessibility" | "aria-hidden" | "aria-live" | "aria-modal" | "role" | "accessibilityLiveRegion" | "accessibilityLabelledBy" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "accessibilityLanguage" | "fontSize" | "fontWeight" | "color" | "width" | "height" | "opacity" | "transform" | "rotation" | "scaleX" | "scaleY" | "translateX" | "translateY" | "fill" | "delayLongPress" | "delayPressIn" | "delayPressOut" | "disabled" | "onLongPress" | "onPress" | "onPressIn" | "onPressOut" | "viewBox" | "title" | "fillOpacity" | "fillRule" | "stroke" | "strokeWidth" | "strokeOpacity" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "vectorEffect" | "clipRule" | "clipPath" | "translate" | "origin" | "originX" | "originY" | "scale" | "skew" | "skewX" | "skewY" | "x" | "y" | "marker" | "markerStart" | "markerMid" | "markerEnd" | "mask" | "font" | "fontStyle" | "fontVariant" | "fontStretch" | "fontFamily" | "textAnchor" | "textDecoration" | "letterSpacing" | "wordSpacing" | "kerning" | "fontFeatureSettings" | "fontVariantLigatures" | "fontVariationSettings"> & { readonly preserveAspectRatio?: string | undefined; } & {}) => (
            <Svg width={280} height={140} viewBox="0 0 280 140" {...props}>
                <Rect width="280" height="140" fill="#E8F5E9" />
                <Path
                    d="M70 70 C70 40 210 40 210 70 L220 100 L60 100 Z"
                    fill="#8BC34A"
                />
                <Circle cx="100" cy="60" r="15" fill="#4CAF50" />
                <Circle cx="140" cy="55" r="18" fill="#689F38" />
                <Circle cx="180" cy="60" r="15" fill="#7CB342" />
                <Path
                    d="M120 50 Q140 30 160 50"
                    stroke="#33691E"
                    strokeWidth="4"
                    fill="none"
                />
            </Svg>
        )
    },
    // ... rest of your tips array
];

const bottomNavItems = [
    {
        label: 'Home',
        icon: <MaterialIcons name="home" size={24} color="#4CAF50" />
    },
    {
        label: 'Search',
        icon: <MaterialIcons name="search" size={24} color="#666" />
    },
    {
        label: 'Add',
        icon: <MaterialIcons name="add-circle" size={32} color="#4CAF50" />
    },
    {
        label: 'Lists',
        icon: <MaterialIcons name="list" size={24} color="#666" />
    },
    {
        label: 'Profile',
        icon: <MaterialIcons name="person" size={24} color="#666" />
    }
];


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 1,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headerTitle: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontSize: 16,
        color: '#fff',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 16,
        marginTop: 220,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    filterButton: {
        padding: 4,
    },
    quickActions: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    quickActionScroll: {
        paddingRight: 16,
    },
    quickActionButton: {
        alignItems: 'center',
        marginRight: 20,
    },
    quickActionIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    quickActionText: {
        marginTop: 8,
        fontSize: 12,
        color: '#666',
    },
    mainFeatures: {
        padding: 16,
    },
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    featureButton: {
        width: (width - 48) / 2,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    featureDescription: {
        fontSize: 12,
        color: '#666',
    },
    tipsSection: {
        padding: 16,
        paddingBottom: 100,
    },
    tipsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    seeAllButton: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '600',
    },
    tipsScroll: {
        paddingRight: 16,
    },
    tipCard: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginRight: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tipImage: {
        width: '100%',
        height: 140,
        backgroundColor: '#fff', // Or any color you prefer
    },
    tipContent: {
        padding: 16,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    tipDescription: {
        fontSize: 12,
        color: '#666',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },

});

export default HomeScreen;