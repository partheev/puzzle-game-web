import { describe, it, expect } from 'vitest';
import { generateScore } from '../utils/generateScore';

describe('Generating score', () => {
    it('Should return same output for every same input', () => {
        const inputTest1 = {
            currentLevelIndex: 0,
            hintsUsed: 2,
            time: 10,
        };

        const output1Test1 = generateScore(inputTest1);
        const output2Test1 = generateScore(inputTest1);

        expect(output1Test1).toBe(output2Test1);
        const inputTest2 = {
            currentLevelIndex: 1,
            hintsUsed: 2,
            time: 50,
        };

        const output1Test2 = generateScore(inputTest2);
        const output2Test2 = generateScore(inputTest2);

        expect(output1Test2).toBe(output2Test2);
    });
});
