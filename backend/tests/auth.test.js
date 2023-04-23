import request from 'supertest';

import { describe, it, expect } from 'vitest';
import { HTTP_CODES } from '../constants/httpCodes';
import app from '../server';

describe('Authentication apis testing', () => {
    it('Should show already registered and status code 400', async () => {
        const res = await request(app).post('/api/auth/register').send({
            username: 'Partheev',
            email: 'partheev8@gmail.com',
            password: 'some-random-password',
        });

        expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
        expect(res.body.message).toBe('User already exist');
    });

    it('Should show invalid credentials for login', async () => {
        const res = await request(app).post('/api/auth/login').send({
            username: 'Partheev',
            email: 'partheev8@gmail.com',
            password: 'siudfsfenweinjlkl',
        });

        expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
        expect(res.body.message).toBe('Invalid credentials');
    });
});
