
import { Text, StyleSheet } from 'react-native';

interface BookPriceProps {
  price: number;
}

export function BookPrice({ price }: BookPriceProps) {
  return (
    <Text
      testID="book-price"
      style={styles.price}
    >
      ${price.toFixed(2)}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4CAF50',
  },
});