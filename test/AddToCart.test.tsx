import { render, fireEvent, act } from '@testing-library/react-native';
import { describe, it, expect, jest } from '@jest/globals';
import { AddToCartButton } from '../components/AddToCartButton';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: () => null,
}));

describe('AddToCartButton', () => {
    it('it renders correctly', () => {
        const { getByText } = render(
            <AddToCartButton onPress={() => jest.fn} />
        )
        expect(getByText('Add')).toBeTruthy;
    })

    it('it call onpress when tapped', () => {
        const onPress = jest.fn()
        const { getByTestId } = render(
            <AddToCartButton onPress={onPress} />
        );
        act(() => {
            fireEvent.press(getByTestId('add-to-cart-button'));
        });
        expect(onPress).toHaveBeenCalledTimes(1);
    })
})