import { z } from 'zod';
import { RouteValidator, ValidatorTools } from '../../../lib/application';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
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

export class AuthRegisterValidator implements RouteValidator {
  public validate(validatorTools: ValidatorTools) {
    return validatorTools.validateBody(registerSchema);
  }
}
