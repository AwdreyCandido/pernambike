import axios from "axios";
import { supabase } from "../lib/supabase";

import { loginEndpoint, signUpEndpoint } from "./api-constants";

type RegisterUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type LoginUser = { email: string; password: string };

export async function registerUser(user: RegisterUser) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
        phone: user.phone,
      },
    },
  });

  return {
    session,
    error,
  };
}

export async function loginUser(user: LoginUser) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

  return {
    session,
    error,
  };
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return error;
  }
}
