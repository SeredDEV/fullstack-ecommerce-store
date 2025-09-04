import { z } from 'zod';
import { RouteValidator, ValidatorTools } from '../../../lib/application';

const loginSchema = z.object({
  email: z
    .string()
    .email('Formato de email inválido')
    .min(1, 'El email es requerido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  userType: z
    .enum(['admin', 'user'])
    .refine((val) => val === 'admin' || val === 'user', {
      message: 'El tipo de usuario debe ser admin o user'
    })
});

export class AuthLoginValidator implements RouteValidator {
  public validate(validatorTools: ValidatorTools) {
    return validatorTools.validateBody(loginSchema);
  }
}
