import { Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { ValidatorTools, ServerRequest } from '../application/types';

export class ValidatorToolsImpl implements ValidatorTools {
  validateBody<T>(schema: z.ZodSchema<T>) {
    return (req: ServerRequest, res: Response, next: NextFunction) => {
      try {
        const validated = schema.parse(req.body);
        req.body = validated;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: error.issues.map((err: any) => ({
              field: err.path.join('.'),
              message: err.message
            }))
          });
        }
        next(error);
      }
    };
  }

  validateParams<T>(schema: z.ZodSchema<T>) {
    return (req: ServerRequest, res: Response, next: NextFunction) => {
      try {
        const validated = schema.parse(req.params);
        req.params = validated as any;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: error.issues.map((err: any) => ({
              field: err.path.join('.'),
              message: err.message
            }))
          });
        }
        next(error);
      }
    };
  }

  validateQuery<T>(schema: z.ZodSchema<T>) {
    return (req: ServerRequest, res: Response, next: NextFunction) => {
      try {
        const validated = schema.parse(req.query);
        req.query = validated as any;
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: error.issues.map((err: any) => ({
              field: err.path.join('.'),
              message: err.message
            }))
          });
        }
        next(error);
      }
    };
  }
}
