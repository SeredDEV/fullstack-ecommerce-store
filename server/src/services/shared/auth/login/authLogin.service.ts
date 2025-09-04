import { AuthLoginModel } from '../authModel';

interface AuthLoginData {
  username: string;
  password: string;
}

export interface AuthLogin {
  login: (userData: AuthLoginData) => Promise<AuthLoginModel>;
  validateUser: (userData: AuthLoginData) => Promise<boolean>;
}

export class AuthLoginService implements AuthLogin {
  constructor() {}

  async login(userData: AuthLoginData): Promise<AuthLoginModel> {
    // Simulación de validación de usuario
    const isValid = await this.validateUser(userData);
    
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    // Simulación de datos del usuario
    const authLoginModel: AuthLoginModel = {
      userId: 'user_123',
      username: userData.username,
      email: `${userData.username}@example.com`,
      token: `jwt_token_${Date.now()}`,
      privileges: ['user'],
      sessionId: `session_${Date.now()}`
    };

    return authLoginModel;
  }

  async validateUser(userData: AuthLoginData): Promise<boolean> {
    // Simulación de validación
    // En un caso real, esto consultaría la base de datos
    // Aceptamos tanto username "test" como email "test@example.com"
    return (userData.username === 'test' || userData.username === 'test@example.com') && userData.password === '123456';
  }
}
