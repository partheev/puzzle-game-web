import { describe, it, expect } from 'vitest';
import { compareHashedPassword, hashPassword } from '../utils';

describe('Password hashing checking', () => {
    it('Should be true for same passwords', async () => {
        const input = '123456789';
        const hashedPassword = await hashPassword(input);
        const result = await compareHashedPassword(input, hashedPassword);

        expect(result).toBe(true);
    });
    it('Should be false for different passwords', async () => {
        const input = '123456789';
        const differentInput = '123456780';
        const hashedPassword = await hashPassword(input);
        const result = await compareHashedPassword(
            differentInput,
            hashedPassword
        );

        expect(result).toBe(false);
    });
});
