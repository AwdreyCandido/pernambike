import { StyleSheet, Text, View } from "react-native";
import { colors, texts } from "../../utils/custom-styles";
import React from "react";
import OutlineButton from "../buttons/OulineButton";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "../inputs/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LoginFormSchema, loginFormSchema } from "../../utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = ({ toRegisterScreen }) => {
  const methods = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = (data) => {
    console.log(JSON.stringify(data));
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
        {/* <Input
          label="E-mail"
          inputConfig={{ placeholder: "Ex: email@email.com" }}
        /> */}
        {/* <Input
          label="Senha"
          inputConfig={{
            placeholder: "••••••",
            cursorColor: colors.primary[1],
          }}
          type="password"
        /> */}
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
