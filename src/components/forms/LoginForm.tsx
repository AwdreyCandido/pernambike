import { Alert, StyleSheet, Text, View } from "react-native";
import { colors, texts } from "../../utils/custom-styles";
import React, { useContext } from "react";
import OutlineButton from "../buttons/OulineButton";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "../inputs/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginFormSchema, loginFormSchema } from "../../utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/auth";
import { AuthContext } from "../../store/AuthContext";

const LoginForm = ({ toRegisterScreen }) => {
  const methods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const { authenticate } = useContext(AuthContext);

  const onSubmit: SubmitHandler<LoginFormSchema> = async (userData) => {
    const { session, error } = await loginUser(userData);

    if (!session || error) {
      return Alert.alert(
        "Erro no Login",
        "Por favor, cheque suas credenciais."
      );
    }
    authenticate(session.access_token);
  };

  return (
    <View>
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
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
