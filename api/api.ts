import Axios from "axios";
import { ForgetPasswordDto, LoginDto, RegistDto } from "../interface/member";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
});

export const regist = (registDto: RegistDto) =>
  axios.post("", registDto); /* /api/regist */

export const login = (loginDto: LoginDto) =>
  axios.post("", loginDto); /* /api/login */

export const forgetPassword = (forgetPasswordDto: ForgetPasswordDto) =>
  axios.post("", forgetPasswordDto); /* /api/forget-password */
