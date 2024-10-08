import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from "../../utils/custom-styles";
import { color } from "react-native-elements/dist/helpers";

const PrimaryButton: React.FC<{
  title: string;
  type?: string;
  disabled?: boolean;
  style?: {};
  icon?: JSX.Element;
  onPress: () => void;
}> = ({ title, onPress, icon, type, style, disabled }) => {
  let typeStyles: {} = {};

  switch (type) {
    case "del":
      typeStyles = { backgroundColor: colors.error[1] };
      break;
    default:
      typeStyles;
  }

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => pressed && { opacity: 0.65 }}
      onPress={onPress}
    >
      <View style={[styles.button, typeStyles, style, disabled && {backgroundColor: colors.primary[4]}]}>
        <Text style={[styles.title, style]}>{title}</Text>
        {icon && icon}
      </View>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.primary[1],
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: "center",
    elevation: 2,
    overflow: "hidden",
  },
  title: {
    fontFamily: "sora semibold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
