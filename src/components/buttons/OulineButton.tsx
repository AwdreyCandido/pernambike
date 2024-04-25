import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from "../../utils/custom-styles";

const OutlineButton: React.FC<{
  title: string;
  icon?: JSX.Element;
  onPress: () => void;
}> = ({ title, onPress, icon }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && { opacity: 0.65 }}
      onPress={onPress}
    >
      <View style={styles.button}>
        <Text style={styles.title}>{title}</Text>
        {icon && icon}
      </View>
    </Pressable>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 2,
    borderColor: colors.primary[1],
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    elevation: 2,
    overflow: "hidden",
  },
  title: {
    fontFamily: "sora semibold",
    fontSize: 20,
    color: colors.primary[1],
    textAlign: "center",
  },
});
