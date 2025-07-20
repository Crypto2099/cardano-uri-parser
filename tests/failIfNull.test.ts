import { failIfNull } from './failIfNull';

describe('failIfNull helper', () => {
    test('throws when passed null', () => {
        expect(() => failIfNull(null, 'Should throw')).toThrow('Should throw');
    });

    test('returns value when not null', () => {
        const result = failIfNull('ok', 'Should not throw');
        expect(result).toBe('ok');
    });
});
