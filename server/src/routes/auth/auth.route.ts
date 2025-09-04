import { RegisterArgs, RouterRegister } from '../../lib/application/types';
import { Router } from 'express';
import { MAIN_ROUTE_NAME } from '../../commons/constants';

class AuthRouterRegister implements RouterRegister {
  public register({ server, endpoints }: RegisterArgs): void {
    const router = Router();
    
    endpoints.setEndPoints({
      path: __dirname,
      router,
    });

    server.use(`${MAIN_ROUTE_NAME}/auth`, router);
  }
}

export default AuthRouterRegister;
