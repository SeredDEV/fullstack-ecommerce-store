import { AuthController, ControllerRouteArgs } from '../../../lib/application';
import { AuthLoginBuilder } from '../../../services/shared/auth/login';

export class AuthLoginController implements AuthController {
  private rateLimiterId: string;
  private authLoginService = AuthLoginBuilder.build();

  constructor(rateLimiterId: string) {
    this.rateLimiterId = rateLimiterId;
  }

  public route({ controllerRouteTools, authTools }: any) {
    return async (req: any, res: any) => {
      try {
        const { responseHttp } = controllerRouteTools;
        const { email, password, userType } = req.body;
        
        // Usar el servicio de autenticación
        const result = await this.authLoginService.login({ 
          username: email, 
          password 
        });
        
        responseHttp.success(res, {
          user: {
            id: result.userId,
            email: result.email,
            username: result.username,
            privileges: result.privileges
          },
          token: result.token,
          sessionId: result.sessionId
        }, 'Inicio de sesión exitoso');
        
      } catch (error) {
        const { responseHttp } = controllerRouteTools;
        responseHttp.error(res, error, 401);
      }
    };
  }
}
