import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  async function logoutHandler() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return Alert.alert("Erro ao fazer logout, Tente novamente mais tarde.");
    }
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
