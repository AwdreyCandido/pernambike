import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./stack-auth.routes";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import HomeScreen from "../screens/home/HomeScreen";

export default function AppRoutes() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!token && <AuthRoutes />}
      {token && <HomeScreen />}
    </NavigationContainer>
  );
}
