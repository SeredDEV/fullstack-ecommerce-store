import { glob } from 'glob';
import { IRouter } from 'express';
import { NetworkTools, AuthTools, SetEndPointArgs, Endpoint, EndpointsInterface } from './types';

interface SetEndPointsArgs {
  path: string;
  router: IRouter;
  extension?: string;
}

interface Constructor {
  networkTools: NetworkTools;
  authTools: AuthTools;
}

export class Endpoints implements EndpointsInterface {
  private networkTools: NetworkTools;
  private authTools: AuthTools;

  constructor({ networkTools, authTools }: Constructor) {
    this.networkTools = networkTools;
    this.authTools = authTools;
  }

  public setEndPoints({ path, router, extension = 'endpoint' }: SetEndPointsArgs): void {
    this.getDirectories(path, extension).forEach((endpointPath: string) => {
      console.log(`Loading endpoint: ${endpointPath}`);
      
      try {
        const endpoint: Endpoint = require(endpointPath).default;
        
        endpoint.setEndPoint({
          router,
          networkTools: this.networkTools,
          authTools: this.authTools,
        });
      } catch (error) {
        console.error(`Error loading endpoint ${endpointPath}:`, error);
      }
    });
  }

  private getDirectories(dir: string, extension: string): string[] {
    const pattern = `${dir}/**/*.${extension}.*`;
    const routesDirectories = glob.sync(pattern);
    return routesDirectories;
  }
}
