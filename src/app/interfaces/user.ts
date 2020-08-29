export interface IUser {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  is_active: boolean;
  last_login?: Date;
  is_superuser?: boolean;
}
