export interface RegistDto {
  account: string;
  password: string;
  checkPassword: string;
  email: string;
  phone: string;
}

export interface LoginDto {
  account: string;
  password: string;
}

export interface ForgetPasswordDto {
  account: string;
  email: string;
}
