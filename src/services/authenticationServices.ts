import { LoginDto } from '@/pages/api/auth/login';
import { RegisterDto } from '@/pages/api/auth/register';

export const authenticationServices = {
  register(registerDto: RegisterDto) {
    return fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDto),
    });
  },

  login(loginDto: LoginDto) {
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDto),
    });
  },

  verifyToken(token: string) {
    return fetch('/api/auth/verify-token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
