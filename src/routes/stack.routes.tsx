import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import TabRoutes from "./tab.routes";
import BikeDetails from "../screens/bike/BikeDetails";

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
    </Stack.Navigator>
  );
};

export default StackRoutes;
