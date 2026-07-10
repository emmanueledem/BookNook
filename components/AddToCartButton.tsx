// components/AddToCartButton.tsx

import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddToCartButtonProps {
    onPress: () => void;
}

export function AddToCartButton({
    onPress,
}: AddToCartButtonProps) {
    return (
        <Pressable
            testID="add-to-cart-button"
            accessibilityRole="button"
            onPress={onPress}
            style={styles.button}
        >
            <Ionicons
                name="cart"
                size={18}
                color="#fff"
            />

            <Text style={styles.text}>
                Add
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10,
    },
    text: {
        color: '#fff',
        marginLeft: 6,
        fontWeight: '600',
    },
});