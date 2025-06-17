import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import type { User } from '../types/User.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userService = inject(UserService);
  http = inject(HttpClient);

  async login({ email, password }: Omit<User, 'id' | 'name'>) {
    try {
      const response = await this.userService.getUserByEmail(email);

      const user = response.result[0];
      if (!user) throw new Error('User not found');

      if (user.password != password) {
        throw new Error('Invalid password');
      }

      return user;
    } catch (error) {
      throw new Error(
        'Login failed: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  }

  async register(input: Omit<User, 'id'>) {
    try {
      const existingUser = await this.userService.getUserByEmail(input.email);
      if (existingUser.result.length > 0) {
        throw new Error('Email already registered');
      }
      const response = await this.userService.createUser(input);
      return response.result[0];
    } catch (error) {
      throw new Error(
        'Register failed: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  }
}
