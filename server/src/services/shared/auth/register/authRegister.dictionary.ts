export type AuthRegisterValidationNames =
  'userAlreadyExists' |
  'emailAlreadyExists' |
  'weakPassword' |
  'invalidEmail';

export const authRegisterDictionary = {
  resourceId: 'AuthRegister',
  serviceId: 'Register',
  validations: {
    'userAlreadyExists': {
      dictionaryId: 17002401,
      statusCode: 409,
      defaultMessage: 'El nombre de usuario ya existe',
    },
    'emailAlreadyExists': {
      dictionaryId: 17002402,
      statusCode: 409,
      defaultMessage: 'El email ya existe',
    },
    'weakPassword': {
      dictionaryId: 17002403,
      statusCode: 400,
      defaultMessage: 'La contraseña es muy débil',
    },
    'invalidEmail': {
      dictionaryId: 17002404,
      statusCode: 400,
      defaultMessage: 'Formato de email inválido',
    }
  }
};
