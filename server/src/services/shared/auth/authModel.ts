export interface AuthLoginModel {
  userId: string;
  username: string;
  email: string;
  token: string;
  privileges: string[];
  sessionId: string;
}

export interface AuthRegisterModel {
  userId: string;
  username: string;
  email: string;
  created: boolean;
}

export interface AuthUserData {
  username: string;
  email: string;
  privileges: string[];
}
