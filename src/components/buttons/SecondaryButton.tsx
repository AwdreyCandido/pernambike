import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from "../../utils/custom-styles";

const SecondaryButton: React.FC<{
  title: string;
  type?: string;
  icon?: JSX.Element;
  onPress: () => void;
}> = ({ title, onPress, icon, type }) => {
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
      style={({ pressed }) => pressed && { opacity: 0.55 }}
      onPress={onPress}
    >
      {/* <View style={[styles.button, typeStyles]}> */}
        <Text style={styles.title}>{title}</Text>
        {icon && icon}
      {/* </View> */}
    </Pressable>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    // backgroundColor: colors.primary[1],
    flexDirection: "row",
    alignItems: "center",
    // gap: 10,
    // padding: 5,
    // borderRadius: 10,
    justifyContent: "center",
    elevation: 2,
    overflow: "hidden",
  },
  title: {
    fontFamily: "sora semibold",
    fontSize: 14,
    color: colors.primary[1],
    textAlign: "center",
  },
});
