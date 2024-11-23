
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import RNPickerSelect from 'react-native-picker-select';
import { ShoppingListItem } from '../api/shopping-list';

interface RenderItemProps {
    item: ShoppingListItem;
    onDelete: (id: number) => void;
    onQuantityChange: (id: number, quantity: number) => void;
}

const ShoppingListItemRow: React.FC<RenderItemProps> = ({
                                                            item,
                                                            onDelete,
                                                            onQuantityChange
                                                        }) => {
    const renderRightActions = (progress: Animated.AnimatedInterpolation<any>) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
        });

        return (
            <Animated.View style={{
            transform: [{ translateX: trans }],
                width: 70,
        }}>
        <TouchableOpacity
            style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
    >
        <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            </Animated.View>
    );
    };

    return (
        <Swipeable
            renderRightActions={(progress) => renderRightActions(progress)}
    rightThreshold={40}
    >
    <View style={styles.row}>
    <Text style={styles.itemColumn}>{item.name}</Text>
        <RNPickerSelect
    onValueChange={(value) => {
        if (value) onQuantityChange(item.id, value);
    }}
    items={[...Array(10).keys()].map((i) => ({
        label: `${i + 1}`,
        value: i + 1,
    }))}
    value={item.quantity}
    placeholder={{ label: `${item.quantity}`, value: item.quantity }}
    style={{
        inputIOS: styles.picker,
            inputAndroid: styles.picker,
            iconContainer: {
            top: 10,
                right: 12,
        },
    }}
    useNativeAndroidPickerStyle={false}
    />
    </View>
    </Swipeable>
);
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemColumn: {
        flex: 1,
        fontSize: 16,
    },
    picker: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        color: 'black',
        backgroundColor: '#f9f9f9',
        width: 100,
    },
    deleteButton: {
        flex: 1,
        backgroundColor: '#ff4444',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default ShoppingListItemRow;