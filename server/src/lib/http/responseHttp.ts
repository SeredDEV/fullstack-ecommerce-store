import { Response } from 'express';
import { ResponseHttp } from '../application/types';

export class ResponseHttpImpl implements ResponseHttp {
  success(res: Response, data: any, message = 'Éxito'): void {
    res.status(200).json({
      success: true,
      message,
      data
    });
  }

  error(res: Response, error: any, statusCode = 500): void {
    const message = error?.message || 'Error interno del servidor';
    res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }

  notFound(res: Response, message = 'Recurso no encontrado'): void {
    res.status(404).json({
      success: false,
      message
    });
  }

  unauthorized(res: Response, message = 'No autorizado'): void {
    res.status(401).json({
      success: false,
      message
    });
  }
}
