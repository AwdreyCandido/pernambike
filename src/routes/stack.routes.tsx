import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import TabRoutes from "./tab.routes";
import BikeDetails from "../screens/bike/BikeDetails";
import BikeAvailability from "../screens/bike/BikeAvailability";
import BikeRentSummary from "../screens/bike/BikeRentSummary";
import PaymentScreen from "../screens/checkout/PaymentScreen";

const Stack = createStackNavigator();

const StackRoutes = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default StackRoutes;
