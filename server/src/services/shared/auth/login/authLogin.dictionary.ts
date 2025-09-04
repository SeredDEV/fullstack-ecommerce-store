export type AuthLoginValidationNames =
  'userNotExist' |
  'userPasswordWrong' |
  'userIsInactive' |
  'invalidCredentials';

export const authLoginDictionary = {
  resourceId: 'AuthLogin',
  serviceId: 'Login',
  validations: {
    'userNotExist': {
      dictionaryId: 17001402,
      statusCode: 404,
      defaultMessage: 'El usuario no existe o contraseña incorrecta',
    },
    'userPasswordWrong': {
      dictionaryId: 17001403,
      statusCode: 401,
      defaultMessage: 'Contraseña inválida',
    },
    'userIsInactive': {
      dictionaryId: 17001404,
      statusCode: 403,
      defaultMessage: 'La cuenta de usuario está inactiva',
    },
    'invalidCredentials': {
      dictionaryId: 17001405,
      statusCode: 401,
      defaultMessage: 'Credenciales inválidas proporcionadas',
    }
  }
};
