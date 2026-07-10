import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ClearCartButtonProps {
    onPress: () => void;
}

const ClearCartButton = ({ onPress }: ClearCartButtonProps) => {
    return (
        <View>
            <Pressable
                onPress={onPress}
            >
                <Text style={styles.clearCartButton}>
                    Clear Cart
                </Text>
            </Pressable>
        </View>
    )
}

export default ClearCartButton

const styles = StyleSheet.create({
    clearCartButton: {
        fontSize: 18,
        color: '#000',
        fontWeight: "500",
    },

})