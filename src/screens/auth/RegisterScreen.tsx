import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import OutlineButton from "../../components/buttons/OulineButton";
import Input from "../../components/inputs/Input";
import { colors, texts } from "../../utils/custom-styles";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

const RegisterScreen = ({ navigation }) => {
  function goBackToLogin() {
    navigation.goBack();
  }

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
            <Text style={[texts.soraTitle.bold, styles.title]}>
              Cadastre-se
            </Text>
            <View style={{ gap: 10, marginBottom: 100 }}>
              <Input
                label="Nome"
                inputConfig={{ placeholder: "Seu nome completo" }}
              />
              <Input
                label="E-mail"
                inputConfig={{
                  placeholder: "Ex: email@email.com",
                  keyboardType: "email-address",
                }}
              />
              <Input
                label="Telefone"
                inputConfig={{
                  placeholder: "Ex: (88) 99999-9999",
                  keyboardType: "phone-pad",
                }}
              />
              <Input
                label="Senha"
                inputConfig={{
                  placeholder: "••••••",
                  cursorColor: colors.primary[1],
                }}
                type="password"
              />
              <Input
                label="Confirme sua senha"
                inputConfig={{
                  placeholder: "••••••",
                  cursorColor: colors.primary[1],
                }}
                type="password"
              />
            </View>
            <View style={{ gap: 10 }}>
              <PrimaryButton title="Confirmar" onPress={() => {}} />
            </View>
            <Pressable
              onPress={goBackToLogin}
              style={({ pressed }) => pressed && { opacity: 0.75 }}
            >
              <View style={styles.underButton}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colors.primary[1]}
                />
                <Text
                  style={[texts.dmText.regular, { color: colors.primary[1] }]}
                >
                  Voltar para o Login
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;

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
  underButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    gap: 10,
  },
});
