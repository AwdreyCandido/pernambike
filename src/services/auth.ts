import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

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
    data: { user: authUser, session },
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

  if (error) {
    return {
      session,
      error,
    };
  }

  const { data: newUser, error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: authUser?.id,  // Use the id from auth.users
        name: user.name,
        phone: user.phone,
        email: user.email,
        // any other fields you want to insert
      },
    ]);

  return {
    session,
    error: insertError,
    newUser,
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

  return error;
}
