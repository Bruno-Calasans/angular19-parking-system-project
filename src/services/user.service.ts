import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { USER_API_ENDPOINT } from '../constants/API_URL';
import type { User } from '../types/User.type';
import type { Response, ResponseError } from '../types/Response.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  async getUserByEmail(email: string) {
    try {
      const response = await firstValueFrom(
        this.http.get<Response<User> | ResponseError>(
          `${USER_API_ENDPOINT}?email=${email}`,
        ),
      );
      if (response.status === 'failure') throw new Error('Request failed');

      return response;
    } catch (error) {
      throw new Error(
        'Failed to fetch user by email: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  }

  async createUser(input: Omit<User, 'id'>) {
    try {
      const response = await firstValueFrom(
        this.http.post<Response<User> | ResponseError>(
          USER_API_ENDPOINT,
          input,
        ),
      );
      if (response.status === 'failure') throw new Error('Request failed');
      return response;
    } catch (error) {
      throw new Error(
        'Failed to create user: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  }
}
