import { Request, Response, NextFunction, IRouter, Express } from 'express';
import { z } from 'zod';

// Tipos base para el framework simplificado
export interface ServerRequest extends Request {
  user?: any;
  session?: any;
}

export interface ResponseHttp {
  success: (res: Response, data: any, message?: string) => void;
  error: (res: Response, error: any, statusCode?: number) => void;
  notFound: (res: Response, message?: string) => void;
  unauthorized: (res: Response, message?: string) => void;
}

export interface JWT {
  sign: (payload: any) => string;
  verify: (token: string) => any;
  middleware: () => (req: ServerRequest, res: Response, next: NextFunction) => void;
}

export interface ValidatorTools {
  validateBody: <T>(schema: z.ZodSchema<T>) => (req: ServerRequest, res: Response, next: NextFunction) => void;
  validateParams: <T>(schema: z.ZodSchema<T>) => (req: ServerRequest, res: Response, next: NextFunction) => void;
  validateQuery: <T>(schema: z.ZodSchema<T>) => (req: ServerRequest, res: Response, next: NextFunction) => void;
}

export interface ControllerRouteTools {
  responseHttp: ResponseHttp;
  validatorTools: ValidatorTools;
}

export interface NetworkTools {
  controllerRouteTools: ControllerRouteTools;
}

export interface AuthTools {
  jwt: JWT;
}

export interface SetEndPointArgs {
  router: IRouter;
  networkTools: NetworkTools;
  authTools: AuthTools;
}

export interface Endpoint {
  setEndPoint: (args: SetEndPointArgs) => void;
}

export interface ControllerRouteArgs {
  controllerRouteTools: ControllerRouteTools;
}

export interface AuthControllerRouteArgs extends ControllerRouteArgs {
  authTools: AuthTools;
}

export interface Controller {
  route: (args: ControllerRouteArgs) => any;
}

export interface AuthController {
  route: (args: AuthControllerRouteArgs) => any;
}

export interface RouteValidator {
  validate: (validatorTools: ValidatorTools) => any;
}

// Tipos adicionales para RouterRegister
export interface EndpointsInterface {
  setEndPoints: (args: { path: string; router: IRouter; extension?: string }) => void;
}

export interface RegisterArgs {
  server: Express;
  endpoints: EndpointsInterface;
}

export interface RouterRegister {
  register: (args: RegisterArgs) => void;
}
