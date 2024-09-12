import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./stack-auth.routes";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import HomeScreen from "../screens/home/HomeScreen";
import StackRoutes from "./stack.routes";
import { SafeAreaView } from "react-native";
import React from "react";

export default function AppRoutes() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
        {!token && <AuthRoutes />}
        {token && <StackRoutes />}
    </NavigationContainer>
  );
}
