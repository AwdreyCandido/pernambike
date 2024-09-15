import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../../utils/custom-styles";
import PrimaryButton from "../buttons/PrimaryButton";
import Input from "../inputs/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  updateProfileSchema,
  UpdateProfileSchema,
} from "../../utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfile } from "../../services/user";
import { AuthContext } from "../../store/AuthContext";
import Loading from "../layout/Loading";
import OutlineButton from "../buttons/OulineButton";
import { useNavigation } from "@react-navigation/native";

const UpdateProfileForm = () => {
  const { user, fetchUpdatedUser } = useContext(AuthContext); // Assuming user data and setter are available
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const methods = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileSchema> = async (userData) => {
    setIsLoading(true);
    const { error, data } = await updateUserProfile(user.id, userData);

    if (error) {
      Alert.alert(
        "Erro na Atualização",
        "Por favor, tente novamente mais tarde."
      );
      return setIsLoading(false);
    }

    fetchUpdatedUser(user.id);
    // setUser(updatedUser); // Update the user context with new profile data
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    setIsLoading(false);
  };

  return (
    <View className="flex-1">
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
          name="location"
          render={({
            field: { onBlur, onChange, value },
            fieldState: { error },
          }) => {
            return (
              <Input
                label="Seu Endereço"
                errorMessage={error?.message}
                inputConfig={{
                  placeholder: "Ex: Rua XYZ, Nº, Bairro, Cidade - Estado",
                  onBlur: onBlur,
                  value: value,
                  onChangeText: onChange,
                }}
              />
            );
          }}
        />
      </View>

      <View className="flex-1 justify-end">
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}>
            <OutlineButton
              onPress={() => navigation.navigate("profile")}
              title="Voltar"
            />
          </View>
          <View style={{ flex: 2 }}>
            <PrimaryButton
              title="Salvar Alterações"
              onPress={methods.handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfileForm;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    gap: 20,
  },
});
