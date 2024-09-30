export interface IAuthorization {
  login: string;
  password: string;
  failed: string | null;
}

export interface IUser {
  uid: string;
  email: string;
  password: string;
  name: string;
}
