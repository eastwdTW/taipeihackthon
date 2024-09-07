import Axios from "axios";
import { Regist } from "../interface/regist";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
});

export const regist = (regist: Regist) => axios.post("" /* replace */, regist);
