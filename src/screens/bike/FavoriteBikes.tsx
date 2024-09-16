import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, texts } from "../../utils/custom-styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/AuthContext";

const FavoriteBikes = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  function nextPage() {
    navigation.navigate("rent-price");
  }

  function goBack() {
    navigation.navigate("initial-page");
  }

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1  p-[5]">
        <Text
          style={[texts.soraTitle.bold, { fontSize: 20, textAlign: "center" }]}
        >
          Você não tem nenhum favorito.
        </Text>

        <View className="h-max mt-4"></View>
      </SafeAreaView>
    </View>
  );
};

export default FavoriteBikes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },

  buttonContainer: {
    flex: 1,
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 20,
    gap: 20,
  },

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
