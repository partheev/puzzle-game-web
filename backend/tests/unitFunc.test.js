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
// describe('Username availability checking', () => {
//     it('Should respond with 404 (NOT_FOUND) for invalid github username', async () => {
//         const res = await request(app).get('/api/github/check-username').query({
//             username: 'partheevdddd',
//         });
//         expect(res.statusCode).toBe(HTTP_CODES.NOT_FOUND);
//     });

//     it('Should response with 400 (BAD_REQUEST) if query params not sent', async () => {
//         const res = await request(app).get('/api/github/check-username');
//         expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
//     });

//     it('Should response with 200 (SUCCESS) for correct username', async () => {
//         const res = await request(app)
//             .get('/api/github/check-username')
//             .query({ username: 'partheev' });
//         expect(res.statusCode).toBe(HTTP_CODES.SUCCESS);
//     });
// });

// describe('Github user repos', () => {
//     it('Should respond with 404 (NOT_FOUND) for invalid github username', async () => {
//         const res = await request(app).get('/api/github/repos').query({
//             username: 'partheevdddd',
//         });
//         expect(res.statusCode).toBe(HTTP_CODES.NOT_FOUND);
//     });

//     it('Should response with 400 (BAD_REQUEST) if query params not sent', async () => {
//         const res = await request(app).get('/api/github/repos');
//         expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
//     });

//     it(
//         'Should response with 200 (SUCCESS) for correct username',
//         async () => {
//             const res = await request(app)
//                 .get('/api/github/repos')
//                 .query({ username: 'partheev' });
//             expect(res.statusCode).toBe(HTTP_CODES.SUCCESS);
//         },
//         { timeout: 20000 }
//     );
// });
