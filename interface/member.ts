export interface LoginDto {
  account: string;
  password: string;
}

export interface ForgetPasswordDto {
  account: string;
  email: string;
}
