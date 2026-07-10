import { describe, expect, it } from '@jest/globals';
import { BookPrice } from '../components/bookPrice';
import { render } from '@testing-library/react-native';

describe('BookPrice', () => {
    it('renders a price with two decimal places', () => {
        const { getByText } = render(
            <BookPrice price={19.99} />
        );

        expect(getByText('$19.99')).toBeTruthy();
    });

    it('formats whole numbers correctly', () => {
        const { getByText } = render(
            <BookPrice price={20} />
        );

        expect(getByText('$20.00')).toBeTruthy();
    });

    it('formats zero correctly', () => {
        const { getByText } = render(
            <BookPrice price={0} />
        );

        expect(getByText('$0.00')).toBeTruthy();
    });

    it('rounds decimal values correctly', () => {
        const { getByText } = render(
            <BookPrice price={19.995} />
        );

        expect(getByText('$20.00')).toBeTruthy();
    });
});