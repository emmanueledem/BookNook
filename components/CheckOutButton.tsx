import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native'

interface CheckOutButtonProps {
    handleCheckout: () => void
    isCheckingOut: boolean;
}
const CheckOutButton = (params: CheckOutButtonProps) => {
    return (
        <Pressable
            testID='check-out-button'
            style={styles.checkoutButton}
            onPress={params.handleCheckout}
            disabled={params.isCheckingOut}
        >
            {params.isCheckingOut ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.checkoutText}>
                    Checkout
                </Text>
            )}
        </Pressable>
    )
}

export default CheckOutButton

const styles = StyleSheet.create({
    checkoutButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: Platform.OS == 'ios' ? 0 : 20,
    },

    checkoutText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
    },


})