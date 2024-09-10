import { Microcycle } from '../src/types/Microcycle';
import { api } from '../config/axios';


export class MicrocycleService {
  static async createMicrocycle(microcycle: Microcycle) {
    const token = localStorage.getItem('token');
    const response = await api.post('/microcycles', microcycle, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  static async getCurrentDayWorkout() {
    const token = localStorage.getItem('token');
    const response = await api.get('/microcycles/current-workout', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  static async updateWorkoutProgress(exerciseId: string, completed?: boolean, goalMet?: boolean) {
    const token = localStorage.getItem('token');
    const response = await api.put('/microcycles/update-progress',
      { exerciseId, completed, goalMet },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  }

  static async getPersonalRecords() {
    const token = localStorage.getItem('token');
    const response = await api.get('/microcycles/personal-records', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
}
