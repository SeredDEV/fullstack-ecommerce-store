export enum MainPrivileges {
  MAuthLogin = 'auth-login',
  MAuthRegister = 'auth-register',
  MAuthLogout = 'auth-logout',
  MUserProfile = 'user-profile',
  AdminAccess = 'admin-access'
}

export enum MainRateLimiters {
  MAuthLogin = 'rate-limit-auth-login',
  MAuthRegister = 'rate-limit-auth-register',
  MAuthLogout = 'rate-limit-auth-logout',
  MUserProfile = 'rate-limit-user-profile',
  AdminAccess = 'rate-limit-admin-access'
}
