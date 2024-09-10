import { api } from '../../config/axios';

export interface UserProgressData {
  level: number;
  experience: number;
  nextLevelExperience: number;
}

export class UserService {
  static async getUserProgress(): Promise<UserProgressData> {
    const response = await api.get('/user/progress');
    return response.data;
  }

  static async updateUserProgress(experience: number): Promise<UserProgressData> {
    const response = await api.put('/user/progress', { experience });
    return response.data;
  }
}
