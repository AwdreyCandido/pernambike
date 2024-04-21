import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors, texts } from "../../utils/custom-styles";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./../../../assets/imgs/sub-title-logo-2.png")} />
      <Ionicons name="person-circle-outline" size={45} color={colors.dark[5]} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderBottomColor: colors.dark[5],
  },
  image: {},
});
