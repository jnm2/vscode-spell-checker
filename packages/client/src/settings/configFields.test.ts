import { ConfigKeysByField } from './configFields';

describe('Validate configFields', () => {
    test('ConfigKeysByField', () => {
        const entries = Object.entries(ConfigKeysByField);
        expect(entries.length).toBeGreaterThan(0);
        for (const [key, value] of entries) {
            expect(value).toBe(key);
        }
    });
});