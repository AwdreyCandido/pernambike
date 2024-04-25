import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/home/HomeScreen";
import { colors } from "../utils/custom-styles";
import Notifications from "../screens/home/Notifications";
import RentedBicycles from "../screens/home/RentedBicycles";
import Profile from "../screens/home/Profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import CustomHeader from "../components/layout/Header";

const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary[1],
          tabBarInactiveTintColor: colors.primary[4],
          tabBarStyle: {
            position: "absolute",
            height: 65,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderWidth: 1,
            borderColor: colors.primary[4],
            marginTop: 50,
          },
          tabBarShowLabel: false,
          header: ({}) => <CustomHeader />,
        }}
        initialRouteName="homescreen"
      >
        <Tab.Screen
          options={{
            // headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="notifications" size={30} color={color} />;
            },
          }}
          name="notifications"
          component={Notifications}
        />
        <Tab.Screen
          options={{
            // headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="home" size={30} color={color} />;
            },
          }}
          name="homescreen"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            // headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="bicycle" size={38} color={color} />;
            },
          }}
          name="bicycles"
          component={RentedBicycles}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="person" size={30} color={color} />;
            },
          }}
          name="profile"
          component={Profile}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default TabRoutes;
