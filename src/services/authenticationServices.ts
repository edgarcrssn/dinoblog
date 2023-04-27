import { LoginDto } from '@/pages/api/auth/login';
import { RegisterDto } from '@/pages/api/auth/register';

export const authenticationServices = {
  register(registerDto: RegisterDto) {
    return fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDto),
    });
  },

  login(loginDto: LoginDto) {
    return fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDto),
    });
  },

  verifyToken(token: string) {
    return fetch('http://localhost:3000/api/auth/verify-token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
