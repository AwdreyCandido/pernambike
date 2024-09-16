import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../utils/custom-styles";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "../inputs/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { SignUpFormSchema, signUpFormSchema } from "../../utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../services/auth";
import { AuthContext } from "../../store/AuthContext";
import Loading from "../layout/Loading";
import { useNavigation } from "@react-navigation/native";

const RegisterForm = () => {
  const { authenticate } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onBlur",
  });

  const navigation = useNavigation();

  const onSubmit: SubmitHandler<SignUpFormSchema> = async (userData) => {
    setIsLoading(true);
    const { error, session } = await registerUser(userData);

    if (!session || error) {
      Alert.alert("Erro no Cadastro", "Por favor, tente novamente mais tarde.");
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
          name="name"
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <Input
                label="Nome"
                errorMessage={error?.message}
                inputConfig={{
                  placeholder: "Seu nome completo",
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
          name="email"
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <Input
                label="E-mail"
                errorMessage={error?.message}
                inputConfig={{
                  placeholder: "Ex: email@email.com",
                  keyboardType: "email-address",
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
          name="phone"
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <Input
                label="Telefone"
                errorMessage={error?.message}
                inputConfig={{
                  placeholder: "Ex: (88) 99999-9999",
                  keyboardType: "phone-pad",
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
                  cursorColor: colors.primary[1],
                  onBlur: onBlur,
                  value: value,
                  onChangeText: onChange,
                }}
                type="password"
              />
            );
          }}
        />
        <Controller
          control={methods.control}
          name="confirmPassword"
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <Input
                label="Confirme sua senha"
                errorMessage={error?.message}
                inputConfig={{
                  placeholder: "••••••",
                  cursorColor: colors.primary[1],
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
          title="Confirmar"
          onPress={methods.handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({});
