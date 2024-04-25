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
}

export const AuthContext = createContext<IAuthContext>({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  user: {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);

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

  async function getUserHandler(id: string) {
    const { data, error } = await getUser(id);
    if (error) {
      console.log("Deu ruim galera");
      return;
    }
    setUser(data);
    AsyncStorage.setItem("userId", id);
  }

  function authenticate(token: string, userId: string) {
    setToken(token);
    AsyncStorage.setItem("token", token);
    getUserHandler(userId);
  }

  function logout() {
    setToken(null);
  }

  const value = {
    token,
    isAuthenticated: !!token,
    authenticate,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
