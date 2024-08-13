import { api } from '../../config/axios';

export class OutMessagesService {
  static async sendLoginMessage(data: { email: string; password: string }): Promise<any> {
    try {
      console.log('Wysyłanie danych logowania:', data);
      const response = await api.post('/auth/login', data);
      console.log('Odpowiedź z serwera:', response);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Błąd logowania:', error);
      console.error('Szczegóły błędu:', error.response?.data || error.message);
      throw error;
    }
  }
}
