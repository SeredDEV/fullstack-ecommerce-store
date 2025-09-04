import { AuthLogin, AuthLoginService } from './authLogin.service';

interface BuildArgs {
  // Aquí irían las dependencias como base de datos, redis, etc.
  // dbMain?: any;
  // redisClient?: any;
}

export class AuthLoginBuilder {
  public static build(args: BuildArgs = {}): AuthLogin {
    return new AuthLoginService();
  }
}
