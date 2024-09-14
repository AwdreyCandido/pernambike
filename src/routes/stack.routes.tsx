import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import TabRoutes from "./tab.routes";
import BikeDetails from "../screens/bike/BikeDetails";
import BikeAvailability from "../screens/bike/BikeAvailability";
import BikeRentSummary from "../screens/bike/BikeRentSummary";
import PaymentScreen from "../screens/checkout/PaymentScreen";
import OnBoarding from "../components/on-boarding/OnBoarding";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import AuthRoutes from "./stack-auth.routes";
import Personalization from "../screens/personalize/Personalization";
import RentObjective from "../screens/personalize/RentObjective";
import RentPrice from "../screens/personalize/RentPrice";
import RentTime from "../screens/personalize/RentTime";

const Stack = createStackNavigator();

const StackRoutes = () => {
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
      <Stack.Screen
        options={{ headerShown: false }}
        name="initial-page"
        component={TabRoutes}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="bike-details"
        component={BikeDetails}
      />
      <Stack.Screen
        options={{ presentation: "modal", title: "Escolher Datas" }}
        name="bike-availability"
        component={BikeAvailability}
      />
      <Stack.Screen
        options={{ presentation: "card", title: "Revisão" }}
        name="bike-rent-summary"
        component={BikeRentSummary}
      />
      <Stack.Screen
        options={{ presentation: "card", title: "Pagamento" }}
        name="bike-rent-payment"
        component={PaymentScreen}
      /> 
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="rent-objective"
        component={RentObjective}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="rent-price"
        component={RentPrice}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="rent-time"
        component={RentTime}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
