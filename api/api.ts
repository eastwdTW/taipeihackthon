import Axios from "axios";
import { ForgetPasswordDto, LoginDto, RegistDto } from "../interface/member";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
});

export function setToken(token: string) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  window.localStorage.setItem("_token", token);
}

export function removeToken() {
  delete axios.defaults.headers.common["Authorization"];
  window.localStorage.removeItem("_token");
}

export function tryGetToken(): boolean {
  const token = window.localStorage.getItem("_token");
  if (token) {
    setToken(token);
    return true;
  }
  return false;
}

export const regist = (registDto: RegistDto) =>
  axios.post("", registDto); /* /api/regist */

export const login = (loginDto: LoginDto) =>
  axios.post("", loginDto); /* /api/login */

export const forgetPassword = (forgetPasswordDto: ForgetPasswordDto) =>
  axios.post("", forgetPasswordDto); /* /api/forget-password */
