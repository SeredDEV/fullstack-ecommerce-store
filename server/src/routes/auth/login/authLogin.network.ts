import { AuthController, Endpoint, RouteValidator, SetEndPointArgs } from '../../../lib/application/types';

export class AuthLoginEndpoint implements Endpoint {
  private rateLimiterId: string;

  constructor(
    private controller: AuthController, 
    private routeValidator: RouteValidator, 
    rateLimiterId: string
  ) {
    this.rateLimiterId = rateLimiterId;
  }

  public setEndPoint = ({ router, networkTools, authTools }: SetEndPointArgs): void => {
    const { controllerRouteTools } = networkTools;
    
    const route = this.controller.route({
      controllerRouteTools,
      authTools,
    });

    const routeWithMainDb = this.mainDatabaseDecorator({
      route,
    });
    
    const routeWithNoSqlDB = this.dynamoDBDecorator({
      route: routeWithMainDb,
    });

    const validator = this.routeValidator.validate(controllerRouteTools.validatorTools);

    router.post(
      '/login',
      validator,
      routeWithNoSqlDB
    );
  };

  private mainDatabaseDecorator({ route }: { route: any }) {
    // Simulación del decorador de base de datos principal
    return route;
  }

  private dynamoDBDecorator({ route }: { route: any }) {
    // Simulación del decorador de DynamoDB
    return route;
  }
}
