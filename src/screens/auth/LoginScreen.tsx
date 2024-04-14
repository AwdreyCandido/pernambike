import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import OutlineButton from "../../components/buttons/OulineButton";
import Input from "../../components/inputs/Input";
import { colors, texts } from "../../utils/custom-styles";

const LoginScreen = ({ navigation }) => {
  function goToRegisterScreenHandler() {
    navigation.navigate("register");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("./../../../assets/imgs/logo-name-1.png")}
            />
          </View>
          <Text style={[texts.soraTitle.bold, styles.title]}>Login</Text>
          <View style={{ gap: 10, marginBottom: 100 }}>
            <Input
              label="E-mail"
              inputConfig={{ placeholder: "Ex: email@email.com" }}
            />
            <Input
              label="Senha"
              inputConfig={{
                placeholder: "••••••",
                cursorColor: colors.primary[1],
              }}
              type="password"
            />
          </View>
          <View style={{ gap: 10 }}>
            <PrimaryButton title="Entrar" onPress={() => {}} />
            <Text style={[texts.dmText.medium, { textAlign: "center" }]}>
              ou
            </Text>
            <OutlineButton
              title="Fazer Cadastro"
              onPress={goToRegisterScreenHandler}
            />
          </View>
        </View>
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
  loginForm: {},
});
