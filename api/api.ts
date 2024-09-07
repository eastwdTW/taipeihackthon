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

export function setUserName(name: string) {
  window.localStorage.setItem("_username", name);
}

export function removeToken() {
  delete axios.defaults.headers.common["Authorization"];
  window.localStorage.removeItem("_token");
  window.localStorage.removeItem("_username");
}

export function tryGetToken(): boolean {
  const token = window.localStorage.getItem("_token");
  if (token) {
    setToken(token);
    return true;
  }
  return false;
}

export function tryGetName(): string {
  const username = window.localStorage.getItem("_username");
  if (username) {
    return username;
  }
  return "";
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
  axios.post("/api/user/forget-password ", qs.stringify(forgetPasswordDto), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const getCustomerHistory = (customerId: string) =>
  axios.get("/api/user/history", { params: { customerId } });

export const getDriverTicket = (driverId: string) =>
  axios.get("/api/driver/ticket", { params: { driverId } });

export const getDriverHistory = (driverId: string) =>
  axios.get("/api/driver/history", { params: { driverId } });

export const getAnnouncement = () => axios.get("/api/announcement");

export const driverLogin = (loginDto: LoginDto) =>
  axios.post("/api/driver/login", qs.stringify(loginDto), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const driverRegist = (registDto: FormData) =>
  axios.post("/api/driver/regist ", qs.stringify(registDto), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const driverForgetPassword = (forgetPasswordDto: ForgetPasswordDto) =>
  axios.post("/api/driver/forget-password", qs.stringify(forgetPasswordDto), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const driverArriveDestination = (orderId: string, driverId: string) =>
  axios.post(
    "/api/driver/arrive-destination",
    qs.stringify({ orderId, driverId }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

export const getAllCar = (query: GetAllCar) =>
  axios.get("/api/available/car", { params: query });

export const reserveCar = (reserveCarDto: ReserveCarDto) =>
  axios.post("/api/reserve", qs.stringify(reserveCarDto), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
