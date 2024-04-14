import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  function logoutHandler() {
    logout();
  }

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={logoutHandler} title="Logout" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
