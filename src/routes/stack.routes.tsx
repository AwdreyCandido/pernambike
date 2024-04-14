import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "../components/on-boarding/OnBoarding";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="onboarding"
        component={OnBoarding}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "card" }}
        name="register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}
