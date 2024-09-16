import React from "react";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getUser } from "../services/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthContext {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string, id: string) => void;
  logout: () => void;
  user: any;
  isLoading: boolean;
  authLoading: () => void;
  fetchUpdatedUser: (id: string) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>("");
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getAuthValues() {
      const userId = await AsyncStorage.getItem("userId");
      const userToken = await AsyncStorage.getItem("token");

      if (userId && userToken) {
        authenticate(userToken, userId);
        getUserHandler(userId);
      }
    }
    getAuthValues();
  }, []);

  function authLoading() {}

  async function getUserHandler(id: string) {
    const { data, error } = await getUser(id);
    if (error) {
      console.log("Deu ruim galera");
      return;
    }
    setUser(data);
    AsyncStorage.setItem("userId", id);
  }

  async function fetchUpdatedUser(id: string) {
    await getUserHandler(id);
  }

  function authenticate(token: string, userId: string) {
    setToken(token);
    AsyncStorage.setItem("token", token);
    getUserHandler(userId);
  }

  function logout() {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("rent-objetive");
    AsyncStorage.removeItem("rent-time");
    AsyncStorage.removeItem("rent-price");
    setToken(null);
  }

  const value = {
    token,
    isAuthenticated: !!token,
    authenticate,
    logout,
    user,
    isLoading,
    authLoading,
    fetchUpdatedUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
