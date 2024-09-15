import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, texts } from "../../utils/custom-styles";
import LoginForm from "../../components/forms/LoginForm";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  function goToRegisterScreenHandler() {
    navigation.navigate("register");
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    if (token) {
      navigation.navigate("initial-page");
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ paddingHorizontal: 20, paddingBottom: 50 }}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("./../../../assets/imgs/logo-name-1.png")}
              />
            </View>
            <Text style={[texts.soraTitle.bold, styles.title]}>Login</Text>
            <LoginForm toRegisterScreen={goToRegisterScreenHandler} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
    height: 220,
  },
  title: {
    marginVertical: 40,
    color: colors.primary[1],
  },
  image: {
    transform: [{ scale: 0.7 }, { translateY: -30 }],
  },
});
