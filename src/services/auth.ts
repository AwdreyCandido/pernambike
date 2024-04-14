import axios from "axios";

import { loginEndpoint, signUpEndpoint } from "./api-constants";

type RegisterUser = {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

type LoginUser = { email: string; password: string };

export async function registerUser(user: RegisterUser) {
  const response = await axios.post(signUpEndpoint, {
    ...user,
    returnSecureToken: true,
  });
  return {
    data: response.data,
    status: response.status,
  };
}

export async function loginUser(user: LoginUser) {
  const response = await axios.post(loginEndpoint, {
    ...user,
    returnSecureToken: true,
  });
  return {
    data: response.data,
    status: response.status,
  };
}
