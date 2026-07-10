import { router, Stack } from 'expo-router';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CartItem from '@/components/CartItem';
import { useCartStore } from '@/store/cartStore';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import ClearCartButton from '@/components/ClearCartButton';
import CheckOutButton from '@/components/CheckOutButton';

export default function CartScreen() {
    const items = useCartStore((state) => state.items);

    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );

    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity
    );

    const total = useCartStore((state) =>
        state.getTotalPrice()
    );

    const clearCart = useCartStore((state) => state.clearCart)

    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsCheckingOut(false);

        Alert.alert(
            'Order Successful',
            'Your books have been purchased successfully.',
            [
                {
                    text: 'Continue Shopping',
                    onPress: () => {
                        clearCart();
                        router.dismissAll();
                        router.replace('/');
                    },
                },
            ],
        );
    };

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.firstHeaderRow} >
                        <Pressable
                            style={styles.actionButton}
                            onPress={() => { router.back() }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="#222"
                            />
                        </Pressable>
                        <Text style={styles.heading}>All Cart Items</Text>
                    </View>

                </View>

                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyEmoji}>🛒</Text>

                    <Text style={styles.emptyTitle}>
                        Your cart is empty
                    </Text>

                    <Text style={styles.emptySubtitle}>
                        Add some books to get started.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.firstHeaderRow} >
                    <Pressable
                        style={styles.actionButton}
                        onPress={() => { router.back() }}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#222"
                        />
                    </Pressable>
                    <Text style={styles.heading}>All Cart Items</Text>
                </View>
                <ClearCartButton onPress={() => {
                    Alert.alert(
                        'Clear Cart',
                        'Are you sure you want to clear your cart?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Clear',
                                style: 'destructive',
                                onPress: () => {
                                    clearCart();
                                },
                            },
                        ],
                        {
                            cancelable: true,
                        }
                    );
                }} />
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CartItem
                        item={item}
                        onIncrease={() =>
                            increaseQuantity(item.id)
                        }
                        onDecrease={() =>
                            decreaseQuantity(item.id)
                        }
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />

            <View style={styles.summary}>
                <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>
                        Total
                    </Text>

                    <Text style={styles.totalPrice}>
                        ${total.toFixed(2)}
                    </Text>
                </View>

                <CheckOutButton handleCheckout={handleCheckout} isCheckingOut={isCheckingOut} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({


    header: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        justifyContent: "space-between"
    },

    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111',
        paddingLeft: 10,
    },

    firstHeaderRow: {
        flexDirection: 'row',

    },

    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },

    list: {
        padding: 20,
        paddingBottom: 140,
    },

    summary: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,

        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: -4,
        },

        elevation: 10,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },

    totalLabel: {
        fontSize: 18,
        color: '#666',
    },

    clearCartButton: {
        fontSize: 18,
        color: '#000',
        fontWeight: "500",
    },

    totalPrice: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
    },


    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },

    emptyEmoji: {
        fontSize: 64,
    },

    emptyTitle: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: '700',
        color: '#222',
    },

    emptySubtitle: {
        marginTop: 8,
        textAlign: 'center',
        color: '#777',
        fontSize: 16,
    },

    actionButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
    },


});