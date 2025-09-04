import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { JWT, ServerRequest } from '../application/types';

interface JWTConfig {
  secretKey: string;
  expiresIn: string | number;
}

export class JWTImpl implements JWT {
  private config: JWTConfig;

  constructor(config: JWTConfig) {
    this.config = config;
  }

  sign(payload: any): string {
    return jwt.sign(payload, this.config.secretKey, {
      expiresIn: this.config.expiresIn
    } as any);
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, this.config.secretKey);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  middleware() {
    return (req: ServerRequest, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader?.startsWith('Bearer ')) {
          return res.status(401).json({
            success: false,
            message: 'No token provided'
          });
        }

        const token = authHeader.substring(7);
        const decoded = this.verify(token);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }
    };
  }
}
