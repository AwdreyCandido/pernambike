import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}
