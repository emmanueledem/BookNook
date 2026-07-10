import ClearCartButton from "@/components/ClearCartButton";
import { describe, expect, it, jest } from "@jest/globals";
import { render } from '@testing-library/react-native';


describe('ClearCartButton', () => {

    it('it renders correctly', () => {

        const { getByText } = render(
            <ClearCartButton onPress={jest.fn()} />
        )
        expect(getByText('Clear Cart')).toBeTruthy
    })
});