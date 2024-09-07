import Axios from "axios";
import { ForgetPasswordDto, LoginDto } from "../interface/member";
import { GetAllCar, ReserveCarDto } from "../interface/reserve";
import qs from "qs";

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

export const regist = (registDto: FormData) =>
  axios.post("/api/user/regist", registDto);

export const login = (loginDto: LoginDto) =>
  axios.post("/api/user/login", qs.stringify(loginDto), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const forgetPassword = (forgetPasswordDto: ForgetPasswordDto) =>
  axios.post("", forgetPasswordDto); /* /api/forget-password */

export const driverLogin = (loginDto: LoginDto) =>
  axios.post("", loginDto); /* /api/driver/login */

export const driverRegist = (registDto: FormData) =>
  axios.post("", registDto); /* /api/driver/regist */

export const driverForgetPassword = (forgetPasswordDto: ForgetPasswordDto) =>
  axios.post("", forgetPasswordDto); /* /api/driver/forget-password */

export const getAllCar = (query: GetAllCar) =>
  axios.get("" /* /api/available/car  */, { params: query });

export const reserveCar = (reserveCarDto: ReserveCarDto) =>
  axios.post("" /* /api/select/car  */, reserveCarDto);
