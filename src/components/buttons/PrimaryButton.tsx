import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const PrimaryButton: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && { opacity: 0.65 }}
      onPress={onPress}
    >
      <View style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#5464FF",
    padding: 12,
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
