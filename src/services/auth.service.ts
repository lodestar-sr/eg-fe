import { HttpService } from './http.service';
import { LoginFormData } from '../pages/Auth/Login';
import { RegisterFormData } from '../pages/Auth/Register';
import { IUser } from '../resources/interfaces';

export class AuthService {
  static login(data: LoginFormData): Promise<string> {
    return HttpService.post('/auth/login', data);
  }

  static register(data: RegisterFormData): Promise<string> {
    const { confirmPassword, ...formData } = data;

    return HttpService.post('/auth/register', formData);
  }

  static getProfile(): Promise<IUser> {
    return HttpService.get('/auth/me');
  }
}
