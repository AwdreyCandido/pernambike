import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, texts } from "../../utils/custom-styles";
import React, { useContext, useState } from "react";
import OutlineButton from "../buttons/OulineButton";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "../inputs/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginFormSchema, loginFormSchema } from "../../utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/auth";
import { AuthContext } from "../../store/AuthContext";
import Loading from "../layout/Loading";
import { useNavigation } from "@react-navigation/native";

const LoginForm = ({ toRegisterScreen }) => {
  const { authenticate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const methods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (userData) => {
    setIsLoading(true);
    const { session, error } = await loginUser(userData);

    if (!session || error) {
      Alert.alert("Erro no Login", "Por favor, cheque suas credenciais.");
      return setIsLoading(false);
    }

    authenticate(session.access_token, session.user.id);
    navigation.navigate("initial-page");
    setIsLoading(false);
  };

  return (
    <View>
      {isLoading && <Loading />}
      <View style={{ gap: 10, marginBottom: 100 }}>
        <Controller
          control={methods.control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => {
            return (
              <Input
                label="E-mail"
                errorMessage={error?.message}
                inputConfig={{
                  placeholder: "Ex: email@email.com",
                  onBlur: onBlur,
                  value: value,
                  onChangeText: onChange,
                }}
              />
            );
          }}
        />
        <Controller
          control={methods.control}
          name="password"
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <Input
                label="Senha"
                errorMessage={error?.message}
                inputConfig={{
                  placeholder: "••••••",
                  onBlur: onBlur,
                  value: value,
                  onChangeText: onChange,
                }}
                type="password"
              />
            );
          }}
        />
      </View>
      <View style={{ gap: 10 }}>
        <PrimaryButton
          title="Entrar"
          onPress={methods.handleSubmit(onSubmit)}
        />
        <Text style={[texts.dmText.medium, { textAlign: "center" }]}>ou</Text>
        <OutlineButton title="Fazer Cadastro" onPress={toRegisterScreen} />
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("initial-page")}>
            <Text
              style={[
                texts.dmText.medium,
                { textAlign: "center", color: colors.primary[1] },
              ]}
            >
              Entrar sem Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
