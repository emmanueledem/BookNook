import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface Props {
    item: CartItemType;
    onIncrease: () => void;
    onDecrease: () => void;
}

export default function CartItem({
    item,
    onIncrease,
    onDecrease,
}: Props) {
    const removeItemFromCart = useCartStore((state) => state.removeFromCart);
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                transition={300}
                cachePolicy="memory-disk"
            />
            <View style={styles.content}>
                <View style={styles.bookTitleRow} >
                    <Text style={styles.title}>{item.title}</Text>
                    <Pressable
                        onPress={() => { removeItemFromCart(item.id) }}
                    >
                        <Ionicons
                            style={{ marginLeft: -16 }}

                            name="trash"
                            size={24}
                            color="red"
                        />
                    </Pressable>
                </View>

                <Text style={styles.author}>{item.author}</Text>
                <Text style={styles.price}>
                    ${item.price.toFixed(2)}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.quantityContainer}>
                        <Pressable
                            style={styles.actionButton}
                            onPress={onDecrease}
                        >
                            <Ionicons
                                name="remove"
                                size={18}
                                color="#222"
                            />
                        </Pressable>

                        <Text style={styles.quantity}>
                            {item.quantity}
                        </Text>

                        <Pressable
                            style={styles.actionButton}
                            onPress={onIncrease}
                        >
                            <Ionicons
                                name="add"
                                size={18}
                                color="#222"
                            />
                        </Pressable>
                    </View>

                    <Text style={styles.subtotal}>
                        ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 2,
    },

    image: {
        width: 90,
        height: 120,
        borderRadius: 12,
    },

    content: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
    },

    author: {
        color: '#666',
        marginTop: 4,
    },

    price: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '700',
        color: '#2E7D32',
    },

    footer: {
        marginTop: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    actionButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
    },

    quantity: {
        marginHorizontal: 16,
        fontSize: 18,
        fontWeight: '700',
    },

    subtotal: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },

    bookTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});