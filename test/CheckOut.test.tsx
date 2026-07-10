import { render, fireEvent, act } from '@testing-library/react-native';
import { describe, it, expect, jest } from '@jest/globals';
import CheckOutButton from '@/components/CheckOutButton';



describe('CheckOutButton', () => {

    it('it call onpress to checkout when tapped', () => {
        const onPress = jest.fn()
        const { getByTestId } = render(
            <CheckOutButton handleCheckout={onPress} isCheckingOut={false} />
        );
        act(() => {
            fireEvent.press(getByTestId('check-out-button'));
        });
        expect(onPress).toHaveBeenCalledTimes(1);
    })
})