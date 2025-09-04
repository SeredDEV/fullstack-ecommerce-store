import { AuthRegisterModel } from '../authModel';

interface AuthRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthRegister {
  register: (userData: AuthRegisterData) => Promise<AuthRegisterModel>;
  validateNewUser: (userData: AuthRegisterData) => Promise<boolean>;
}

export class AuthRegisterService implements AuthRegister {
  constructor() {}

  async register(userData: AuthRegisterData): Promise<AuthRegisterModel> {
    // Validar que el usuario no existe
    const canRegister = await this.validateNewUser(userData);
    
    if (!canRegister) {
      throw new Error('El usuario ya existe');
    }

    // Simulación de creación de usuario
    const authRegisterModel: AuthRegisterModel = {
      userId: `user_${Date.now()}`,
      username: userData.username,
      email: userData.email,
      created: true
    };

    return authRegisterModel;
  }

  async validateNewUser(userData: AuthRegisterData): Promise<boolean> {
    // Simulación de validación
    // En un caso real, esto consultaría la base de datos para verificar que no existe
    return userData.username !== 'existinguser';
  }
}
