import { AuthController, ControllerRouteArgs } from '../../../lib/application';
import { AuthRegisterBuilder } from '../../../services/shared/auth/register';

export class AuthRegisterController implements AuthController {
  private rateLimiterId: string;
  private authRegisterService = AuthRegisterBuilder.build();

  constructor(rateLimiterId: string) {
    this.rateLimiterId = rateLimiterId;
  }

  public route({ controllerRouteTools, authTools }: any) {
    return async (req: any, res: any) => {
      try {
        const { responseHttp } = controllerRouteTools;
        const { email, password, userType, name } = req.body;
        
        // Usar el servicio de registro
        const result = await this.authRegisterService.register({
          username: name || email.split('@')[0],
          email,
          password
        });
        
        responseHttp.success(res, {
          user: {
            id: result.userId,
            email: result.email,
            username: result.username,
            userType
          },
          created: result.created
        }, 'Registro exitoso');
        
      } catch (error) {
        const { responseHttp } = controllerRouteTools;
        responseHttp.error(res, error, 400);
      }
    };
  }
}
