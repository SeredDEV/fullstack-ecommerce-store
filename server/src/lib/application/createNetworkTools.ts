import { ResponseHttpImpl } from '../http/responseHttp';
import { JWTImpl } from '../auth/jwt';
import { ValidatorToolsImpl } from '../validator/validatorTools';
import { NetworkTools, AuthTools, ControllerRouteTools } from './types';

interface Config {
  jwt: {
    secretKey: string;
    expiresIn: string | number;
  };
}

interface CreateToolsResult {
  networkTools: NetworkTools;
  authTools: AuthTools;
}

export class CreateNetworkTools {
  public static createTools(config: Config): CreateToolsResult {
    const responseHttp = new ResponseHttpImpl();
    const validatorTools = new ValidatorToolsImpl();
    
    const controllerRouteTools: ControllerRouteTools = {
      responseHttp,
      validatorTools,
    };

    const networkTools: NetworkTools = {
      controllerRouteTools,
    };

    const jwt = new JWTImpl(config.jwt);

    const authTools: AuthTools = {
      jwt,
    };

    return {
      networkTools,
      authTools,
    };
  }
}
