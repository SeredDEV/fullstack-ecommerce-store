import { AuthRegister, AuthRegisterService } from './authRegister.service';

interface BuildArgs {
  // Aquí irían las dependencias como base de datos, redis, etc.
  // dbMain?: any;
  // redisClient?: any;
}

export class AuthRegisterBuilder {
  public static build(args: BuildArgs = {}): AuthRegister {
    return new AuthRegisterService();
  }
}
