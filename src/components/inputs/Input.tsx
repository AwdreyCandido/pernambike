import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInputProps,
  TextInput,
} from "react-native";
import React from "react";
import { colors, texts } from "../../utils/custom-styles";
import { Feather } from "@expo/vector-icons";

const Input: React.FC<{
  label: string;
  type?: string;
  errorMessage: string | undefined;
  inputConfig: TextInputProps;
}> = ({ label, inputConfig, type, errorMessage }) => {
  return (
    <View style={styles.inputContainer}>
      <Text
        style={[texts.soraText.regular, errorMessage ? styles.errorLabel : {}]}
      >
        {label}
      </Text>
      <TextInput
        style={[
          texts.soraText.regular,
          styles.input,
          errorMessage ? styles.errorInput : {},
        ]}
        {...inputConfig}
        secureTextEntry={type === "password"}
      />
      {errorMessage && (
        <View style={styles.errorMessage}>
          <Feather name="alert-triangle" size={18} color={colors.error[1]} />
          <Text style={styles.textError}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: colors.text,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    overflow: "hidden",
    fontSize: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: "sora semibold",
    color: colors.text,
    textAlign: "center",
  },
  errorLabel: {
    color: colors.error[1],
  },
  errorInput: {
    borderColor: colors.error[1],
    backgroundColor: colors.error[2],
    color: "white",
  },
  errorMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textError: {
    fontSize: 14,
    color: colors.error[1],
  },
});
