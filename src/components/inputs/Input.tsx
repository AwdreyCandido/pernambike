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

const Input: React.FC<{
  label: string;
  type?: string;
  inputConfig: TextInputProps;
}> = ({ label, inputConfig, type }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[texts.soraText.regular]}>{label}</Text>
      <TextInput
        style={[texts.soraText.regular, styles.input]}
        {...inputConfig}
        secureTextEntry={type === "password"}
      />
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
});
