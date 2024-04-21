import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import TabRoutes from "./tab.routes";

const Stack = createStackNavigator();

const StackRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="initial-page"
        component={TabRoutes}
      />
    </Stack.Navigator>
  );
};

export default StackRoutes;
